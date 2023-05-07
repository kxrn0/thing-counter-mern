import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

export default function useCounterContext() {
  const context = useContext(CounterContext);

  if (!context)
    throw new Error(
      "useCounterContext can only be used inside of CounterContext!"
    );
  return context;
}
