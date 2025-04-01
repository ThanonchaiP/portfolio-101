import Link from "next/link";

export const Disclaimer = () => {
  return (
    <p className="fixed bottom-1 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-base text-red-600 xl:block">
      * เว็บไซต์นี้จัดทำขึ้นเพื่อการศึกษาและการสร้างผลงานส่วนตัวเท่านั้น
      ท่านสามารถเข้าไปดูเว็บไซต์ต้นฉบับได้ที่{" "}
      <Link
        href="https://election66.thaipbs.or.th/result"
        className="text-blue-700 underline"
        target="_blank"
      >
        Thai PBS
      </Link>
    </p>
  );
};
