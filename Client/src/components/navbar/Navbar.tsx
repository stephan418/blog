import React from "react";
import logo from "../../logo.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { motion } from "framer-motion";
import { useAppSelector } from "../../app/hooks";
import { selectUsername } from "../../features/auth/authSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUsername);

  return (
    <nav className={styles.navbar}>
      <motion.img
        initial={{ transform: "translate(-50%, -50%)", scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        src={logo}
        alt="Blog logo"
        onClick={() => navigate("/")}
      />
      <Link className={styles.link} to="/signin">
        {user ? user : "Sign in"}
      </Link>
    </nav>
  );
};

export default Navbar;
