import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

interface IProps {
  children: ReactNode;
}

export default function Container({ children }: IProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {children}
      <ToastContainer />
    </div>
  );
}
