import { createContext, useEffect, useReducer } from "react";

export const CounterContext = createContext();

export function counter_reducer(state, action) {
  if (
    state.counters.length &&
    action.type === "ADD_COUNTERS" &&
    action.payload.some((counter) =>
      state.counters.some((other) => other.index === counter.index)
    )
  )
    return state;

  switch (action.type) {
    case "SET_COUNTERS":
      return { ...state, counters: action.payload };
    case "ADD_COUNTER":
      return {
        ...state,
        counters: [
          action.payload,
          ...state.counters.map((counter) => ({
            ...counter,
            index: counter.index + 1,
          })),
        ],
      };
    case "ADD_COUNTERS":
      return { ...state, counters: [...state.counters, ...action.payload] };
    case "ADD_COUNTER_DETAIL":
      return {
        ...state,
        counters: state.counters.map((counter) =>
          counter._id === action.payload.counterId
            ? { ...counter, [action.payload.key]: action.payload.value }
            : counter
        ),
      };
    case "COUNT":
      return {
        ...state,
        counters: state.counters.map((counter) =>
          counter._id === action.payload.counterId
            ? { ...counter, count: action.payload.count }
            : counter
        ),
      };
    case "DELETE_COUNTER":
      return {
        ...state,
        counters: state.counters
          .filter((counter) => counter._id !== action.payload.counterId)
          .map((counter) => ({
            ...counter,
            index: counter.index - 1 * (counter.index > action.payload.index),
          })),
      };
    default:
      return state;
  }
}

export function CounterContextProvider({ children }) {
  const [state, dispatch] = useReducer(counter_reducer, {
    itemsPerPage: 3,
    counters: [],
  });

  return (
    <CounterContext.Provider
      value={{
        counters: state.counters,
        itemsPerPage: state.itemsPerPage,
        dispatch,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}
