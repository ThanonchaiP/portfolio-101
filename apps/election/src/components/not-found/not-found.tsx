import Link from "next/link";

const NOT_FOUND_CONTENT = {
  title: "404",
  subtitle: "Not Found",
  primaryButton: {
    text: "กลับหน้าแรก",
    href: "/",
  },
  secondaryButton: {
    text: "ไปยังเว็บหลัก",
    href: "/",
  },
};

const Button = ({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) => {
  const variantStyles = {
    primary: "bg-[var(--primary)] text-white hover:bg-[#D460C]",
    secondary: "border border-[var(--primary)] text-[var(--primary)]",
  };

  return (
    <Link
      href={href}
      className={`rounded-lg px-4 py-2 transition-colors ${variantStyles[variant]} `}
    >
      {children}
    </Link>
  );
};

export function NotFound() {
  const { title, subtitle, primaryButton, secondaryButton } = NOT_FOUND_CONTENT;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <div className="text-center">
        <h1 className="text-[200px] font-bold leading-none text-[#EEC3AC]">
          {title}
        </h1>
        <h2 className="mt-6 text-7xl font-bold text-[#EEC3AC]">{subtitle}</h2>
        <div className="mt-12 flex justify-center space-x-4">
          <Button href={primaryButton.href}>{primaryButton.text}</Button>
          <Button href={secondaryButton.href} variant="secondary">
            {secondaryButton.text}
          </Button>
        </div>
      </div>
    </div>
  );
}
