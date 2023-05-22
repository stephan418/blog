import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts, selectPosts, selectPostStatus } from "./postSlice";
import styles from "./PostList.module.css";
import Post from "./Post";

const PostList: React.FC = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectPostStatus);

  useEffect(() => {
    if (status === "unloaded") {
      dispatch(fetchPosts());
    }
  }, [status]);

  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
