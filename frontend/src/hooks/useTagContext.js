import { useContext } from "react";
import { TagContext } from "../context/TagContext";

export default function useTagContext() {
  const context = useContext(TagContext);

  if (!context)
    throw new Error("useTagContext must be used inside TagContext!");
  return context;
}
