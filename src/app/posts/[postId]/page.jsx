"use client";
import PostModal from '../../components/PostModal';
import { useEffect, useState } from 'react';
import axios from '../../../ultis/axios';

const PostDetailPage = ({ params }) => {
  const { postId } = params;
  const [post, setPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/posts/${postId}`);
      setPost(response.data);
    };

    fetchPost();
  }, [postId]);

  return (
    <PostModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      postId={postId}
    />
  );
};

export default PostDetailPage;
