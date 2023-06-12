import React from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
  additionalButtons?: React.ReactNode[];
  closeOnOverlayClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  message,
  additionalButtons,
  closeOnOverlayClick = true,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={setIsOpen}
          as="div"
          className={styles.dialog}
          key="dialog"
        >
          <Dialog.Overlay>
            <motion.div
              className={styles.overlayDiv}
              key="overlayDiv"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeOnOverlayClick ? () => setIsOpen(false) : undefined}
            ></motion.div>
          </Dialog.Overlay>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              type: "tween",
              ease: "backInOut",
            }}
            className={styles.dialogContentDiv}
          >
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{message}</Dialog.Description>
            <div className={styles.buttonBar}>
              <button
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              {additionalButtons}
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
