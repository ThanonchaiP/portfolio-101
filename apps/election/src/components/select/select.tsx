import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  defaultValue?: string | null;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  defaultValue = null,
  placeholder = "Select an option",
  className = "",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    defaultValue,
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option): void => {
    setSelectedOption(option.value);
    setIsOpen(false);

    if (onChange) onChange(option.value);
  };

  useEffect(() => {
    if (defaultValue) setSelectedOption(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative min-w-[200px] ${className}`} ref={selectRef}>
      {/* Selected option or placeholder */}
      <div
        className="flex cursor-pointer items-center justify-between gap-2 rounded-t border-b border-[var(--primary)] px-4 py-2 text-[var(--primary)]"
        onClick={toggleDropdown}
      >
        <span className="min-h-7 flex-1 text-center text-xl font-medium">
          {selectedOption
            ? (options?.find((option) => option.value === selectedOption)
                ?.label ?? selectedOption)
            : placeholder}
        </span>
        <svg
          className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute left-0 z-10 max-h-60 w-full overflow-y-auto rounded-b border border-gray-200 bg-white shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className={`cursor-pointer select-none px-4 py-2 ${
                selectedOption && selectedOption === option.value
                  ? "bg-[var(--primary)] text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
