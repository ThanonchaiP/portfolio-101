import { CodeBlock } from "@/components/code-block";

export default function Contact() {
  return (
    <div className="my-4">
      <CodeBlock code={contactCode} language="json" />
    </div>
  );
}

const contactCode = `// Contact Me
{
  "contactInfo": {
    "email": "t.paliwong@gmail.com",
    "location": "Bangkok, Thailand",
    "phone": "+66-62-492-5424"
  },
  "socials": {
    "github": "https://github.com/ThanonchaiP",
    "portfolio": "https://portfolio.14again.life",
  }
}`;
