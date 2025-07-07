import React from "react";

interface SectionProps {
  title: string;
  content: string;
  primaryColor?: string;
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  content, 
  primaryColor = "var(--primary-color)" }
) => {
  const formattedContent = content.split('\n').map((paragraph, index) => (
    <p key={index} className="text-black indent-8 mb-4">
      {paragraph.trim()}
    </p>
  ));

  return (
    <div className="p-6 text-left">
      <div className="mb-6">
        <h2 
          className="text-2xl font-bold"
          style={{ color: primaryColor }}
        >
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-lg">
        {formattedContent}
      </div>
    </div>
  );
};

export default Section;