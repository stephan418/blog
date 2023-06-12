import React, { useState } from "react";
import { createPost } from "../postApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectToken } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/modal/Modal";
import { fetchPosts } from "../postSlice";
import { PostForm } from "./PostForm";

export const CreatePostPage: React.FC = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [showCreationErrorModal, setShowCreationErrorModal] = useState(false);

  const token = useAppSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submit = () => {
    createPost({ title, text: content }, token!)
      .then(() => {
        dispatch(fetchPosts());
        navigate("/");
      })
      .catch(() => setShowCreationErrorModal(true));
  };

  const errorModal = (
    <Modal
      title="Error creating post"
      message="There was an unexpected error creating the post"
      isOpen={showCreationErrorModal}
      setIsOpen={setShowCreationErrorModal}
    />
  );

  return (
    <PostForm
      formTitle="Create a post"
      onSubmit={submit}
      setText={setContent}
      text={content}
      setTitle={setTitle}
      title={title}
      modals={[errorModal]}
    />
  );
};
