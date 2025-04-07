import { CodeBlock } from "@/components/code-block";

export default function About() {
  return (
    <div className="my-4">
      <CodeBlock code={aboutCode} language="typescript" />
    </div>
  );
}

const aboutCode = `//about.tsx
const TITLE = "About Me"

const FULL_NAME = "Thanonchai Paliwong"
const POSITION = "Frontend Developer"
const YEARS_OF_EXPERIENCE = "2.8"
const LOCATION = "Bangkok, Thailand"

// Top Skills
const skills = {
  languages: ["HTML", "CSS", "JavaScript", "TypeScript"],
  frameworks: [
    "Next.js",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
  ],
  tools: ["Docker", "Version Control", "Rest API", "Postman"],
  others: [
    "Ant Design",
    "MUI", //Material UI
    "TanStack Query",
  ]
}
`;
