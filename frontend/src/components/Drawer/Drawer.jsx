import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faClose } from "@fortawesome/free-solid-svg-icons";
import SCDrawer from "./Drawer.styled";

export default function Drawer({ top, duration = 0.33, children }) {
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
      <div className={`top ${open ? "open" : ""}`}>
        <div className="container">{top}</div>
        <button
          className="button-of-disclosure"
          type="button"
          onClick={handle_click}
        >
          <FontAwesomeIcon icon={open ? faClose : faHashtag} />
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
