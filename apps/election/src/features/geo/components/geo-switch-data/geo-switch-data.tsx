"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const list = [
  { name: "member", label: "ส.ส. แบ่งเขต" },
  { name: "party", label: "คะแนนบัญชีรายชื่อ" },
];

export const GeoSwitchData = () => {
  const [type, setType] = useState("member");

  const onClick = (name: string) => {
    setType(name);
  };

  return (
    <div className="right-2 top-0 flex max-w-[221px] shrink-0 select-none rounded bg-white p-[6px] shadow-md xl:absolute">
      {list.map((item) => (
        <Button
          key={item.name}
          active={type === item.name}
          name={item.name}
          onClick={onClick}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

type ButtonProps = {
  active: boolean;
  name: string;
  children: React.ReactNode;
  onClick: (name: string) => void;
};

const Button = ({ children, active, name, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(
        "rounded px-2 py-1 text-sm",
        active && "bg-[var(--primary)] text-white",
      )}
      onClick={() => onClick(name)}
    >
      {children}
    </button>
  );
};
