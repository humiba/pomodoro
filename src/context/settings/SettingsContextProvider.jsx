import PropTypes from "prop-types";
import { SettingsContext } from "./SettingsContext";
import { useState } from "react";

export const SettingsContextProvider = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(55);
  const [breakMinutes, setBreakMinutes] = useState(5);

  return (
    <SettingsContext.Provider
      value={{
        showSettings,
        setShowSettings,
        workMinutes,
        setWorkMinutes,
        breakMinutes,
        setBreakMinutes,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Read docs from README.md: Disallow missing props validation in a React component definition (react/prop-types)
SettingsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
