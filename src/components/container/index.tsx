import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

interface IProps {
  children: ReactNode;
}

export default function Container({ children }: IProps) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
