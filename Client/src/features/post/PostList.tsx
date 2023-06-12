import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts, selectPosts, selectPostStatus } from "./postSlice";
import styles from "./PostList.module.css";
import Post from "./Post";
import { Oval } from "react-loader-spinner";

const PostList: React.FC = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectPostStatus);

  useEffect(() => {
    if (status !== "loaded") {
      dispatch(fetchPosts());
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className={styles.list}>
        <Oval
          wrapperClass={styles.spinner}
          color="grey"
          secondaryColor="#00000000"
        />
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {posts.length <= 0 ? (
        <p>There are currently no posts!</p>
      ) : (
        posts.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
