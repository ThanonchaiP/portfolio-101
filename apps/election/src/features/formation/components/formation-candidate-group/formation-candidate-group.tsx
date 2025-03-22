import { useFormationStore } from "../../store";

import { CandidateCard } from "./candidate-card";

export const FormationCandidateGroup = () => {
  const dataSource = useFormationStore((state) => state.dataSource);

  const [first, second, third] = dataSource.government;

  return (
    <div className="relative z-0 w-full pt-[85%]">
      <div className="absolute inset-0 grid grid-cols-[1fr,1.25fr,1fr] items-center">
        <CandidateCard position="left" party={second} />
        <CandidateCard position="center" party={first} />
        <CandidateCard position="right" party={third} />
      </div>
    </div>
  );
};
