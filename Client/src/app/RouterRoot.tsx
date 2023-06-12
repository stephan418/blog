import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SignUpForm } from "../features/auth/SignUpForm";
import { LoginForm } from "../features/auth/LoginForm";
import LandingPage from "../components/landing-page/LandingPage";
import { CreatePostPage } from "../features/post/Edit/CreatePostPage";
import { CreateProfilePage } from "../features/profile/CreateProfilePage/CreateProfilePage";
import { EditPostPage } from "../features/post/Edit/EditPostPage";

const RouterRoot: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/post/:postId/edit" element={<EditPostPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default RouterRoot;
