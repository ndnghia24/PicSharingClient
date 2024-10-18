"use client";

import { useEffect, useState } from "react";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "../ultis/axios";
import PostCard from "./components/PostCard";
import PostModal from "./components/PostModal";
import UploadPostModal from "./components/UploadPostModal";
import Masonry from "react-masonry-css";
import { AlertProvider } from "./contexts/AlertContext";
import FloatingAlert from "./components/FloatingAlert";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [triggerAlert, setTriggerAlert] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleTriggerAlert = () => {
    setTriggerAlert(true);
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    setModalVisible(true);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <AlertProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex flex-row gap-4 justify-between w-full">
            <h1 className="text-2xl font-bold">Gallery</h1>

            <Button
              icon={<UploadOutlined />}
              onClick={() => setUploadModalVisible(true)}
            >
              Upload Image
            </Button>
          </div>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => handlePostClick(post.id)}
              />
            ))}
          </Masonry>
          <PostModal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            postId={selectedPostId}
          />
          <UploadPostModal
            open={uploadModalVisible}
            onClose={() => setUploadModalVisible(false)}
          />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>

        <FloatingAlert />
      </div>
    </AlertProvider>
  );
}
