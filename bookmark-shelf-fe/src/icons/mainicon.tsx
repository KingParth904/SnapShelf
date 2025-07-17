import { memo } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/wired-flat-400-bookmark-morph-checked.json";

const BookmarkAnimation = () => {
  return (
    <div style={{ width: 50, height: 50 }}>
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
};

export default memo(BookmarkAnimation);
