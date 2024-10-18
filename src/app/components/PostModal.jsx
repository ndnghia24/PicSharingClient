import { Modal, Input, Button, Upload, List, Avatar, Divider, Typography } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../ultis/axios';
import { uploadImageToFirebase } from '../../ultis/firebase';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';
import PostImageSlider from './PostImageSlider';

const { Title } = Typography;

const PostModal = ({ open, onClose, postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const postResponse = await axios.get(`/posts/${postId}`);
          setPost(postResponse.data);

          const commentsResponse = await axios.get(`/posts/${postId}/comments`);
          setComments(commentsResponse.data);
        } catch (error) {
          console.error('Error fetching post or comments:', error);
        }
      }
    };

    fetchPost();
  }, [postId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleUploadChange = (info) => {
    const { status } = info.file;
    console.log('Upload status:', status);
    if (status === 'done') {
      // File uploaded successfully
      const uploadedFile = info.file.originFileObj;
      uploadImageToFirebase(uploadedFile).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      }).catch((error) => {
        console.error('Error uploading image:', error);
      });
    }
    setFileList(info.fileList);
  };

  const handleSendComment = async () => {
    if (comment.trim()) {
      const newComment = {
        userId: null,
        description: comment,
        imageUrls: imageUrls
      };

      try {
        const response = await axios.post(`/posts/${postId}/comments`, newComment);
        setComments([...comments, response.data]);
        
        resetFields();
      } catch (error) {
        console.error('Error sending comment:', error);
      }
    }
  };

  // Handle close modal
  const handleCancel = () => {
    resetFields();
    onClose();
  };

  const resetFields = () => {
    setComment('');
    setImageUrls([]);
    setFileList([]);
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={1200}
      style={{ display: 'flex', flexDirection: 'column', height: '80vh', borderRadius: '20px 20px', overflow: 'hidden'
      }}
    >
      {post ? (
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'row', overflowY: 'hidden' }}>
            {/* Left Content */}
            <div style={{ flex: '5', display: 'flex', justifyContent: 'center', alignItems: 'center',  width: '60vh', overflowY: 'hidden' }}>
              {/* Images Slider */}
              <PostImageSlider images={post.imageUrls} />
            </div>

            {/* Right Panel */}
            <div style={{ flex: '3', display: 'flex', flexDirection: 'column', padding: "0px 0px 0px 25px"}}>
              {/* Combined Description and Comments */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Title level={5}>Description:</Title>

                <p>{post.description}</p>
              
                <Divider type="horizontal" style={{ margin: '15px 0 10px 0' }} />
                
                <Title level={5}>Comments</Title>
                <div style={{ flex: 1, overflowY: 'auto', maxHeight: '350px' }}>
                  <List
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar>{item.userId[0].toUpperCase()}</Avatar>}
                          title={<span>{item.userId}</span>}
                          description={item.description}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>

              {/* Input and Buttons Container */}
              <div style={{ marginTop: 'auto' }}>
                <Input.TextArea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Share your thoughts..."
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  style={{ marginTop: '0' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <Upload 
                    fileList={fileList}
                    onChange={handleUploadChange}
                    multiple={true}
                    accept="image/*"
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>

                  <Button 
                    type="primary" 
                    icon={<SendOutlined />} 
                    onClick={handleSendComment}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading Data...</p>
      )}
    </Modal>
  );
};

export default PostModal;
