import { useEffect, useRef, useState } from "react";
import SCDrawer from "./Drawer.styled";

export default function Drawer({ message, duration = 0.33, children }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const heightRef = useRef(null);

  function handle_click() {
    setOpen((prev) => !prev);
  }

  useEffect(() => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    heightRef.current = rect.height;
  }, [children]);

  return (
    <SCDrawer>
      <div className="top">
        <p>{message}</p>
        <button
          className="disclose-button"
          type="button"
          onClick={handle_click}
        >
          hi
        </button>
      </div>
      <div
        className={`bottom ${open ? "open" : ""}`}
        style={{
          "--max-height": `${heightRef.current}px`,
          "--duration": `${duration}s`,
        }}
      >
        <div className="container" ref={containerRef}>
          {children}
        </div>
      </div>
    </SCDrawer>
  );
}
