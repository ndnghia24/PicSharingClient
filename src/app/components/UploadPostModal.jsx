import { Modal, Upload, Button, Input, Alert } from 'antd';
import { useState } from 'react';
import { uploadImageToFirebase } from '../../ultis/firebase';
import { UploadOutlined } from '@ant-design/icons';
import { useAlert } from '../contexts/AlertContext';
import axios from '../../ultis/axios';

export default function UploadPostModal({ open, onClose }) {
  const { showAlert } = useAlert();
  const [fileList, setFileList] = useState([]);
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  // Handle upload change
  const handleUploadChange = (info) => {
    const { status } = info.file;
    if (status === 'done') {
      const uploadedFile = info.file.originFileObj;
      uploadImageToFirebase(uploadedFile)
        .then((url) => {
          setImageUrls((prev) => [...prev, url]);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
    setFileList(info.fileList);
  };

  // Handle post button
  const handlePost = async () => {
    if (imageUrls.length > 0) {
      const newPost = {
        description,
        imageUrls,
      };

      try {
        const response = await axios.post('/posts', newPost);
        resetFields();
        showAlert('Post created successfully', 'success');
        onClose();

        setTimeout(() => {
          window.location.reload();
        }
        , 2000);

      } catch (error) {
        console.error('Error creating post:', error);
        showAlert('Error creating post', 'error');
      }
    }
  };

  // Handle close modal
  const handleCancel = () => {
    resetFields();
    onClose();
  };

  // Reset input fields
  const resetFields = () => {
    setFileList([]);
    setDescription('');
    setImageUrls([]);
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}  // Call handleCancel on close
      footer={null}
      width={800}
      title="Upload Images"
      style={{ overflow: 'hidden' }}
    >
      <div style={{ maxHeight: '60vh', overflowY: 'auto' }}> {/* Scrollable container */}
        <div className="flex">
          {/* Upload Area */}
          <div className="flex-1">
            <Upload.Dragger
              fileList={fileList}
              onChange={handleUploadChange}
              multiple={false}
              accept="image/*"
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined style={{ fontSize: '32px' }} />
              </p>
              <p>Click or drag image file to this area to upload</p>
              <p className="ant-upload-hint">Only image files are allowed</p>
            </Upload.Dragger>
          </div>

          {/* Description */}
          <div className="flex-1 ml-4">
            <Input.TextArea
              rows={8}
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Post Button */}
        <div className="flex justify-end mt-4">
          <Button type="primary" onClick={handlePost}>
            Post
          </Button>
        </div>
      </div>
    </Modal>
  );
}
