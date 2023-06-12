import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Viewer } from "@bytemd/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchPost,
  fetchPosts,
  selectPost,
  selectPostStatus,
} from "../postSlice";
import { Oval } from "react-loader-spinner";
import styles from "./ViewPostPage.module.css";
import { Button } from "../../../components/button/Button";
import { selectToken, selectUserId } from "../../auth/authSlice";
import { Modal } from "../../../components/modal/Modal";
import { deletePost } from "../postApi";

export const ViewPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const post = useAppSelector(selectPost(postId!));
  const status = useAppSelector(selectPostStatus);
  const userId = useAppSelector(selectUserId);
  const token = useAppSelector(selectToken);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const confirm = async () => {
    await deletePost(postId!, token!);

    dispatch(fetchPosts());
    navigate("/");
  };

  useEffect(() => {
    if (!postId) {
      navigate("/");
    } else if (!post) {
      dispatch(fetchPost(postId));
    }
  }, [postId]);

  if (status === "loading") {
    return (
      <div className={styles.container}>
        <Oval color="grey" secondaryColor="#00000000" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.container}>
        <p>Post not found!</p>
      </div>
    );
  }

  const buttons = (
    <div className={styles.buttons}>
      <Button onClick={() => navigate(`/post/${postId}/edit`)}>Edit</Button>
      <Button color="warn" onClick={() => setShowDeleteModal(true)}>
        Delete
      </Button>
    </div>
  );

  const modalButton = (
    <Button color="warn" onClick={confirm}>
      Yes, delete!
    </Button>
  );

  return (
    <div className={styles.container}>
      <h1>{post!.title}</h1>
      <Viewer value={post!.text} />
      {userId === post.author && buttons}
      <Modal
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        title="Are you sure?"
        message={`You are about to delete the post '${post.title}'. Are you sure you want to do that?`}
        additionalButtons={[modalButton]}
      />
    </div>
  );
};
