import { useState } from "react";


export default function HoveringItem({ origin, hoverItem, className }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`transition-all duration-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="inline-block transition-opacity duration-200">
        {isHovered ? hoverItem : origin}
      </span>
    </span>
  );
}
