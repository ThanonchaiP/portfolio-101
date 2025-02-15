import { Logo } from "../logo";
import { Menu } from "../menu";

export const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between">
      <Logo />
      <Menu />
      <Logo />
    </div>
  );
};
