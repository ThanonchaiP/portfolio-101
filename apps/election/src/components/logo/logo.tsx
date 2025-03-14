import Image from "next/image";

export const Logo = () => {
  return (
    <Image alt="logo" src="/img/logo.png" width={140} height={34} priority />
  );
};
