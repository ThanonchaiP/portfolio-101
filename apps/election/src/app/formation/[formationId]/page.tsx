"use client";

import { FormationBoard, FormationWaitList } from "@/features/formation";

export default function FormationFormulaPage() {
  return (
    <div className="grid h-screen grid-cols-[1fr,max(923px,64%)] overflow-auto pl-6">
      <div className="flex items-center justify-between py-6">
        <h1>test</h1>
      </div>
      <div className="grid h-full grid-cols-[1fr,12%]">
        <FormationBoard />
        <FormationWaitList />
      </div>
    </div>
  );
}
