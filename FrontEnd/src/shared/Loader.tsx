import React from "react";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  loading: boolean;
  size?: number;
  marginTop?: string;
  marginLeft?: string;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  loading,
  size = 30,
  marginTop = "0",
  color = "green",
  marginLeft = "0",
}) => {
  return (
    <div
      style={{
        display: loading ? "block" : "none",
        textAlign: "center",
        marginTop: marginTop,
        marginLeft: marginLeft,
      }}
    >
      <ClipLoader loading={loading} size={size} color={color} />
    </div>
  );
};

export default Loader;
