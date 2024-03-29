import React from "react";
import logo from "../../logo.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  logOut,
  selectStatus,
  selectUsername,
} from "../../features/auth/authSlice";
import { selectUserHasProfile } from "../../features/profile/profileSlice";
import Write from "@material-ui/icons/BorderColor";
import User from "@material-ui/icons/Person";
import Theme from "@material-ui/icons/Colorize";
import Logout from "@material-ui/icons/ExitToApp";
import {
  changeTheme,
  selectThemeMode,
} from "../../features/theming/themingSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUsername);
  const hasProfile = useAppSelector(selectUserHasProfile);
  const authenticated = useAppSelector(selectStatus);
  const themeMode = useAppSelector(selectThemeMode);

  return (
    <nav className={styles.navbar}>
      <span
        className={styles.switcher}
        role="button"
        onClick={() =>
          dispatch(changeTheme(themeMode === "dark" ? "light" : "dark"))
        }
      >
        <Theme />
      </span>
      <motion.img
        initial={{ transform: "translate(-50%, -50%)", scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        src={logo}
        alt="Blog logo"
        onClick={() => navigate("/")}
      />
      <div className={styles.links}>
        {authenticated === "authenticated" &&
          (hasProfile ? (
            <Link
              className={styles.link}
              to="/create"
              title="Create a new post"
            >
              <Write />
            </Link>
          ) : (
            <Link
              className={styles.link}
              to="/create-profile"
              title="Create a new profile"
            >
              <Write />
            </Link>
          ))}
        {authenticated === "authenticated" ? (
          <span className={styles.link} onClick={() => dispatch(logOut())}>
            <Logout />
          </span>
        ) : (
          <Link className={styles.link} to="/signin">
            {user ? user : <User />}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
