import { createContext, useReducer } from "react";

export const TagContext = createContext();

export function tag_reducer(state, action) {
  switch (action.type) {
    case "SET_TAGS":
      return { tags: action.payload };
    default:
      return state;
  }
}

export function TagContextProvider({ children }) {
  const [state, dispatch] = useReducer(tag_reducer, { tags: [] });

  return (
    <TagContext.Provider value={{ tags: state.tags, dispatch }}>
      {children}
    </TagContext.Provider>
  );
}
