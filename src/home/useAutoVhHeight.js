import { useEffect, useRef } from "react";

export function useAutoVhHeight(delay = 400) {
  const ref = useRef(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (!ref.current) return;

      const vh = window.innerHeight;
      const contentHeight = ref.current.scrollHeight;
      const requiredVh = Math.ceil(contentHeight / vh);

      ref.current.style.height = `${requiredVh * 100}vh`;
    };

    const timer = setTimeout(adjustHeight, delay); // Wait for content to mount
    window.addEventListener("resize", adjustHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", adjustHeight);
    };
  }, [delay]);

  return ref;
}
