import React from "react";
import PostList from "../../features/post/PostList";
import ProfileList from "../../features/profile/ProfileList";
import styles from "./LandingPage.module.css";
import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  return (
    <motion.div
      className={styles.landingPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.1 }}
    >
      <header className={styles.header}>
        <h1>Explore, Connect and Create</h1>
        <h2>
          Skriptum is a blogging platform where you can share and read amazing
          stories. It is fully extensible with components, which let you add
          interactivity to your entries.
        </h2>
      </header>
      <section className={styles.postSection}>
        <h1>Explore recent articles</h1>
        <PostList />
      </section>
      <section className={styles.profileSection}>
        <h1>Connect with community members</h1>
        <ProfileList />
      </section>
    </motion.div>
  );
};

export default LandingPage;
