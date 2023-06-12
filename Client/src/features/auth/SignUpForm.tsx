import { useForm } from "react-hook-form";
import ErrorHintList from "../../components/error-hint/ErrorHintList";
import { createAccount } from "./authApi";
import styles from "./Form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectStatus } from "./authSlice";
import { motion } from "framer-motion";
import { Modal } from "../../components/modal/Modal";
import { Button } from "../../components/button/Button";

interface FieldValues {
  username: string;
  password: string;
}

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const navigate = useNavigate();
  const state = useAppSelector(selectStatus);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (state === "authenticated") {
      navigate("/");
    }
  }, [state]);

  const onSubmit = async (data: FieldValues) => {
    const res = await createAccount(data.username, data.password);

    if (!res.ok) {
      if (res.status === 409) {
        setShowErrorModal(true);
      } else {
        console.error(res);
      }
    } else {
      setShowSuccessModal(true);
    }
  };

  const errorMessages = Object.values(errors).map((error) => error.message);

  return (
    <motion.form
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Sign up now!</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Username"
        {...register("username", {
          required: { value: true, message: "The username is required" },
          minLength: {
            value: 4,
            message: "The username must be between 4 and 16 characters long",
          },
          maxLength: {
            value: 16,
            message: "The username must be between 4 and 16 characters long",
          },
        })}
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.input}
        {...register("password", {
          required: { value: true, message: "The password is required" },
          minLength: {
            value: 8,
            message: "The password has to be at least 8 characters long",
          },
        })}
      />

      <ErrorHintList messages={errorMessages} />
      <Button type="submit">Sign up</Button>
      <p>
        <Link to="/signin">Sign in</Link> instead?
      </p>
      <Modal
        isOpen={showErrorModal}
        setIsOpen={setShowErrorModal}
        title="Account creation error"
        message="An account with this username does already exist. Please try another one!"
      ></Modal>

      <Modal
        isOpen={showSuccessModal}
        setIsOpen={setShowSuccessModal}
        title="Account created"
        message="Your account was successfully created! You can now sign in!"
        type="success"
      ></Modal>
    </motion.form>
  );
}
