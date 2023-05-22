import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Profile from "./Profile";
import {
  fetchProfiles,
  selectProfiles,
  selectProfileStatus,
} from "./profileSlice";
import styles from "./ProfileList.module.css";

const ProfileList: React.FC = () => {
  const dispatch = useAppDispatch();

  const profiles = useAppSelector(selectProfiles);
  const state = useAppSelector(selectProfileStatus);

  useEffect(() => {
    if (state === "unloaded") {
      dispatch(fetchProfiles());
    }
  }, [state]);

  return (
    <div className={styles.list}>
      {profiles.map((profile) => (
        <Profile profile={profile} />
      ))}
    </div>
  );
};

export default ProfileList;
