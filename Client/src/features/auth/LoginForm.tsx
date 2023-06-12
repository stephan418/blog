import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ErrorHintList from "../../components/error-hint/ErrorHintList";
import { authenticate, selectStatus } from "./authSlice";
import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Modal } from "../../components/modal/Modal";
import { Button } from "../../components/button/Button";

interface FieldValues {
  username: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [credentialsModalIsOpen, setCredentialsModalIsOpen] = useState(false);

  const authenticated = useAppSelector(selectStatus);

  useEffect(() => {
    if (authenticated === "authenticated") {
      navigate("/");
    } else if (authenticated === "failed") {
      setCredentialsModalIsOpen(true);
    }
  }, [authenticated]);

  useEffect(() => {
    setCredentialsModalIsOpen(false);
  }, []);

  const onSubmit = async (data: FieldValues) => {
    dispatch(authenticate(data));
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
      <h1>Sign in with your account!</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Username"
        {...register("username", {
          required: { value: true, message: "The username is required" },
        })}
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.input}
        {...register("password", {
          required: { value: true, message: "The password is required" },
        })}
      />

      <ErrorHintList messages={errorMessages} />
      <Button type="submit">Sign in</Button>
      <p>
        <Link to="/signup">Sign up</Link> instead?
      </p>
      <Modal
        isOpen={credentialsModalIsOpen}
        setIsOpen={setCredentialsModalIsOpen}
        title="Wrong credentials"
        message="The username and password combination you entered is not correct!"
      ></Modal>
    </motion.form>
  );
}
