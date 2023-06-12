import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import styles from "./CreateProfilePage.module.css";
import { ErrorHintList } from "../../../components/error-hint";
import { Button } from "../../../components/button/Button";
import { getPictureSrc, uploadImage } from "../../../app/api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectToken, selectUserId } from "../../auth/authSlice";
import { useEffect, useState } from "react";
import { createProfile } from "../profileApi";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../profileSlice";
import { Modal } from "../../../components/modal/Modal";

interface HookFormValues {
  name: string;
  description?: string;
  pictureId?: string;
}

export const CreateProfilePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<HookFormValues>();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectUserId);

  const [_, setRerenderHelper] = useState(0);
  const values = getValues();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  const openImageDialog = () => {
    const dialog = document.createElement("input");
    dialog.type = "file";
    dialog.click();

    dialog.onchange = async (e: any) => {
      const file = e.target.files[0];

      const result = await uploadImage([file], token!);
      setRerenderHelper((r) => r + 1);

      setValue("pictureId", result[0].id, { shouldTouch: true });
    };
  };

  const onSubmit = async (data: HookFormValues) => {
    await createProfile(data, token!).catch(() => {
      setShowErrorModal(true);
    });

    dispatch(fetchProfile(userId!));
    setShowSuccessModal(true);
  };

  const closeSuccessModal: React.Dispatch<React.SetStateAction<boolean>> = (
    state,
  ) => {
    const result = setShowSuccessModal(state);
    navigate("/");

    return result;
  };

  const errorMessages = Object.values(errors).map((error) => error.message);

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Create a profile</h1>
      <input
        type="text"
        className={styles.input}
        placeholder="Profile name"
        {...register("name", {
          required: { value: true, message: "The profile name is required" },
        })}
      />

      <textarea
        placeholder="Description"
        className={styles.textarea}
        {...register("description")}
      />

      <div
        role="button"
        className={styles.imagePreview}
        onClick={openImageDialog}
      >
        {values.pictureId ? (
          <img src={getPictureSrc(values.pictureId)} />
        ) : (
          <span className="text">Upload an image</span>
        )}
      </div>

      <input
        type="text"
        className={styles.input}
        placeholder="Profile picture Reference"
        hidden
        {...register("pictureId")}
      />

      <ErrorHintList messages={errorMessages} />
      <Button type="submit">Create</Button>

      <Modal
        isOpen={showErrorModal}
        setIsOpen={setShowErrorModal}
        title="Profile creation error"
        message="There was an unexpected error creating the profile!"
      ></Modal>

      <Modal
        isOpen={showSuccessModal}
        setIsOpen={closeSuccessModal}
        title="Profile created!"
        message={`Your profile '${values.name}' was successfully created. Have fun creating!`}
      ></Modal>
    </motion.form>
  );
};
