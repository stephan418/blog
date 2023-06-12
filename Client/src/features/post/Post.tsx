import React from "react";
import styles from "./Post.module.css";
import { Post as PostType } from "./postSlice";
import { useNavigate } from "react-router-dom";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const navigate = useNavigate();

  let text = post.text.substring(0, 100);

  if (text.length < post.text.length) {
    text += "...";
  }

  return (
    <div className={styles.post} onClick={() => navigate(`/post/${post.id}`)}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.text}>{text}</p>
      <div className={styles.author}>
        <span className={styles.bold}>By </span>
        <span className={styles.authorName}>{post.authorName}</span>
      </div>
    </div>
  );
};

export default Post;
