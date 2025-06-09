import React from "react";
import { toast, Toaster } from "react-hot-toast";

export function ToastContainer() {
  return React.createElement(Toaster, {
    position: "top-center",
    reverseOrder: false,
  });
}

export function showSuccessToast(message, options = {}) {
  toast.success(message, options);
  return;
}

export function showErrorToast(message, options = {}) {
  toast.error(message || "Something went wrong", options);
  return;
}
