import React, { useEffect, useState } from "react";
import styles from "./PostForm.module.css";
import { Editor } from "@bytemd/react";
import "bytemd/dist/index.css";
import { selectToken } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../../components/button/Button";
import { getPictureSrc, uploadImage } from "../../../app/api";
import { useAppSelector } from "../../../app/hooks";

interface PostFormProps {
  formTitle: string;
  title: string;
  text: string;
  modals: React.ReactNode[];
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => unknown;
}

export const PostForm: React.FC<PostFormProps> = ({
  formTitle,
  onSubmit,
  text,
  title,
  setText,
  setTitle,
  modals,
}) => {
  const token = useAppSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  const uploadMdImage = async (files: File[]) => {
    const pictures = await uploadImage(files, token!);

    return pictures.map((p) => ({
      url: getPictureSrc(p.id),
      title: p.description,
    }));
  };

  return (
    <motion.div
      className={styles.outerContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.1 }}
    >
      <div className={styles.container}>
        <h1>{formTitle}</h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Post title"
        />
        <Editor
          value={text}
          onChange={(v) => setText(v)}
          uploadImages={uploadMdImage}
        />
      </div>

      <Button onClick={onSubmit} className={styles.button}>
        Save
      </Button>

      {modals}
    </motion.div>
  );
};
