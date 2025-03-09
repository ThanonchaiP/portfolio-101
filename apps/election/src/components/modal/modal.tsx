"use client";

import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { PropsWithChildren, ReactNode } from "react";

interface ModalProps extends PropsWithChildren {
  title?: string | ReactNode;
  open?: boolean;
  onClose?: () => void;
}

export function Modal({ title, children, open, onClose }: ModalProps) {
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
          {title && (
            <div className="mb-3 flex items-center justify-between">
              {typeof title === "string" ? (
                <h2 className="text-xl">{title}</h2>
              ) : (
                title
              )}
              <Icon
                icon="ic:round-close"
                className="cursor-pointer text-gray-500"
                onClick={onClose}
              />
            </div>
          )}

          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
