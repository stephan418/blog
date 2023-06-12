import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Profile from "./Profile";
import {
  fetchProfiles,
  selectProfiles,
  selectProfileStatus,
} from "./profileSlice";
import styles from "./ProfileList.module.css";
import { Oval } from "react-loader-spinner";

const ProfileList: React.FC = () => {
  const dispatch = useAppDispatch();

  const profiles = useAppSelector(selectProfiles);
  const state = useAppSelector(selectProfileStatus);

  useEffect(() => {
    if (state === "unloaded") {
      dispatch(fetchProfiles());
    }
  }, [state]);

  if (state === "loading") {
    return (
      <div className={styles.list}>
        <Oval color="grey" secondaryColor="#00000000" />
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {profiles.length <= 0 ? (
        <p>There are currently no profiles!</p>
      ) : (
        profiles.map((profile) => <Profile profile={profile} />)
      )}
    </div>
  );
};

export default ProfileList;
