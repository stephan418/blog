import React from "react";
import { Profile as ProfileType } from "./profileSlice";
import styles from "./Profile.module.css";
import { motion } from "framer-motion";
import { getPictureSrc } from "../../app/api";

interface ProfileProps {
  profile: ProfileType;
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className={styles.profile}>
      <span className={styles.picture}>
        {profile.pictureId && (
          <img src={getPictureSrc(profile.pictureId)}></img>
        )}
      </span>
      <h2 className={styles.name}>{profile.name}</h2>
      <p className={styles.description}>{profile.description}</p>
    </motion.div>
  );
};

export default Profile;
