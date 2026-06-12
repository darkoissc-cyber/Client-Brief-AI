"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );

    const observedElement = ref.current;
    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      if (observedElement) observer.unobserve(observedElement);
    };
  }, []);

  const delayClass = `reveal-delay-${delay}`;

  return (
    <div
      ref={ref}
      className={`reveal reveal-wrapper ${isRevealed ? "visible is-revealed" : ""} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
