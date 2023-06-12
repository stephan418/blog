import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "../postApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectToken, selectUserId } from "../../auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../../components/modal/Modal";
import { fetchPosts, selectPost } from "../postSlice";
import { PostForm } from "./PostForm";

export const EditPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [showUpdateErrorModal, setShowUpdateErrorModal] = useState(false);
  const [showPermissionErrorModal, setShowPermissionErrorModal] =
    useState(false);

  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectUserId);
  const post = useAppSelector(selectPost(postId!));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!postId) {
      navigate("/");
    }
  }, [postId]);

  useEffect(() => {
    if (!post) {
      navigate("/");
    } else if (post.author !== userId) {
      setShowPermissionErrorModal(true);
    } else {
      setTitle(post.title);
      setContent(post.text);
    }
  }, [post, userId]);

  const submit = () => {
    updatePost(postId!, { title, text: content }, token!)
      .then(() => {
        dispatch(fetchPosts());
        navigate("/");
      })
      .catch(() => setShowUpdateErrorModal(true));
  };

  const closePermissionErrorModal: React.Dispatch<
    React.SetStateAction<boolean>
  > = (state) => {
    const result = setShowPermissionErrorModal(state);
    navigate("/");

    return result;
  };

  const errorModal = (
    <Modal
      title="Error updating post"
      message="There was an unexpected error while updating the post"
      isOpen={showUpdateErrorModal}
      setIsOpen={setShowUpdateErrorModal}
    />
  );

  const permissionErrorModal = (
    <Modal
      title="Insufficient permission"
      message="You do not have the permissions required to update this post"
      isOpen={showPermissionErrorModal}
      setIsOpen={closePermissionErrorModal}
    />
  );

  if (!post) return <></>;

  return (
    <PostForm
      formTitle={`Edit '${post!.title}'`}
      onSubmit={submit}
      setText={setContent}
      text={content}
      setTitle={setTitle}
      title={title}
      modals={[errorModal, permissionErrorModal]}
    />
  );
};
