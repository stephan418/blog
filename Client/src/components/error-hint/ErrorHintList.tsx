import React from "react";
import { ErrorHint } from ".";
import styles from "./ErrorHintList.module.css";
import { AnimatePresence } from "framer-motion";

interface ErrorHintListProps {
  messages: Array<string | undefined>;
}

const ErrorHintList: React.FC<ErrorHintListProps> = ({ messages }) => {
  return (
    <ul className={styles.ErrorHintList}>
      <AnimatePresence>
        {messages
          .filter((message) => message && message.length > 0)
          .map((message) => (
            <li className={styles.ErrorHintListItem}>
              <ErrorHint>{message}</ErrorHint>
            </li>
          ))}
      </AnimatePresence>
    </ul>
  );
};

export default ErrorHintList;
