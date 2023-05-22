import React, { useState } from "react";
import styles from "./ErrorHint.module.css";
import { motion } from "framer-motion";
import uniqueId from "lodash.uniqueid";

interface ErrorHintProps {
  children: React.ReactNode;
}

const ErrorHint: React.FC<ErrorHintProps> = ({ children }) => {
  const [id] = useState(uniqueId());

  return (
    <motion.span
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.ErrorHint}
    >
      {children}
    </motion.span>
  );
};

export default ErrorHint;
