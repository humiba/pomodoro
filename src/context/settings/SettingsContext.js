import { createContext, useContext } from "react";

export const SettingsContext = createContext();

export const useSettingsContext = () => {
  return useContext(SettingsContext);
}