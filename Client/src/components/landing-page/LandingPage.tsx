import React from "react";
import PostList from "../../features/post/PostList";
import ProfileList from "../../features/profile/ProfileList";
import styles from "./LandingPage.module.css";

const LandingPage: React.FC = () => {
  return (
    <div className={styles.landingPage}>
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
    </div>
  );
};

export default LandingPage;
