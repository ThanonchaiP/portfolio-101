import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { PartyCount } from "@/types";

type CandidateCardProps = {
  party?: PartyCount;
  position?: "left" | "center" | "right";
};

export const CandidateCard = ({
  party,
  position = "left",
}: CandidateCardProps) => {
  const positionStyles = {
    left: "bottom-7 left-0",
    center: "bottom-9 left-6",
    right: "bottom-7 right-0",
  };

  const sizeStyles = {
    left: "size-[64px]",
    center: "size-[74px]",
    right: "size-[64px]",
  };

  const textStyles = {
    left: "h-[30px] text-3xl",
    center: "h-[36px] text-4xl",
    right: "h-[30px] text-3xl",
  };

  const delay = {
    left: 0.5,
    center: 0,
    right: 1,
  };

  return (
    <motion.div
      initial={{ y: -300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: delay[position] }}
      className="relative w-full border border-gray-300 pt-[177%]"
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(185.74deg, rgb(233, 177, 78) 4.57%, rgb(243, 225, 182) 95.43%)",
        }}
      >
        <div className="relative flex size-full items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: party ? `url(${party.candidate_img})` : "none",
            }}
          ></div>

          {!party && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              className="flex size-full items-center justify-center"
            >
              <Icon
                icon="material-symbols:question-mark-rounded"
                className="size-full"
                style={{ color: "rgb(193,136,33)" }}
              />
            </motion.div>
          )}

          <div
            className={cn(
              `absolute ${positionStyles[position]} flex ${sizeStyles[position]} flex-col justify-center bg-slate-50 text-center`,
              !party && "hidden",
            )}
            style={{ color: party ? party.color : "var(--primary)" }}
          >
            <h3 className={`${textStyles[position]} font-bold`}>
              {party?.count}
            </h3>
            <p className="">ที่นั่ง</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
