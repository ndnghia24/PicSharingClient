// src/components/PostCard.jsx
import { Card } from "antd";

const PostCard = ({ post, onClick }) => {
  return (
    <Card
      key={post.id}
      title={post.description}
      onClick={onClick}
      hoverable
      style={{ marginBottom: "16px", width: "25vh" }}
      bodyStyle={{ padding: 2 }}
    >
      {post.imageUrls && post.imageUrls.length > 0 ? (
        <img
          alt={post.description}
          src={post.imageUrls[0]}
          style={{ height: "100%", width: "100%", borderRadius: "5px", }}
        />
      ) : null}
      
    </Card>
  );
};

export default PostCard;
