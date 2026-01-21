"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  format?: (n: number) => string;
  className?: string;
  duration?: number;
}

export function AnimatedNumber({
  value,
  format = (n) => n.toFixed(2),
  className = "",
  duration = 0.8,
}: AnimatedNumberProps) {
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => format(current));
  const [displayValue, setDisplayValue] = useState(format(0));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    return display.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [display]);

  return (
    <motion.span className={className}>
      {displayValue}
    </motion.span>
  );
}

// Pulse effect when value changes
interface PulsingValueProps {
  value: number;
  previousValue: number | null;
  format?: (n: number) => string;
  className?: string;
}

export function PulsingValue({
  value,
  previousValue,
  format = (n) => n.toFixed(2),
  className = "",
}: PulsingValueProps) {
  const [isPositiveChange, setIsPositiveChange] = useState<boolean | null>(null);

  useEffect(() => {
    if (previousValue !== null && previousValue !== value) {
      setIsPositiveChange(value > previousValue);
      const timer = setTimeout(() => setIsPositiveChange(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  return (
    <motion.span
      className={`${className} ${
        isPositiveChange === true
          ? "text-[var(--accent-success)]"
          : isPositiveChange === false
          ? "text-[var(--accent-error)]"
          : ""
      }`}
      animate={
        isPositiveChange !== null
          ? {
              scale: [1, 1.05, 1],
              transition: { duration: 0.3 },
            }
          : {}
      }
    >
      <AnimatedNumber value={value} format={format} />
    </motion.span>
  );
}
