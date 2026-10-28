import { type ReactNode } from "react";

export function highlightText(text: string): ReactNode[] {
  if (!text) return [];
  
  const parts = text.split("**");
  const result: ReactNode[] = [];
  
  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      // Odd parts are highlighted (between **)
      result.push(
        <mark key={index} className="bg-yellow-200 text-gray-900">
          {part}
        </mark>
      );
    } else if (part) {
      result.push(<span key={index}>{part}</span>);
    }
  });
  
  return result;
}
