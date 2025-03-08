"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
}

export function Modal({ children, open, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-10 flex items-center justify-center bg-black !bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-96 rounded-lg bg-white p-5 shadow-lg"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
