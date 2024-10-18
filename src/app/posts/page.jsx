// src/app/posts/page.jsx
import PostCard from '@/components/PostCard';
import PostModal from '@/components/PostModal';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    setModalVisible(true);
  };

  return (
    <div>
      <h1>Danh sách Bài viết</h1>
      {posts.map(post => (
        <PostCard key={post.id} post={post} onClick={() => handlePostClick(post.id)} />
      ))}
      <PostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        postId={selectedPostId}
      />
    </div>
  );
};

export default PostsPage;
