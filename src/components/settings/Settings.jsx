import ReactSlider from "react-slider";

import "./Settings.css";
import "../../slider.css";
import { useSettingsContext } from "../../context/settings/SettingsContext";
import { BackButton } from "../";

const Settings = () => {
  const { workMinutes, setWorkMinutes, breakMinutes, setBreakMinutes, setShowSettings } =
    useSettingsContext();
  // console.log(workMinutes, setWorkMinutes, breakMinutes, setBreakMinutes);

  return (
    <div className="settingContainer">
      <label>Work minutes: {workMinutes}:00</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={workMinutes}
        min={1}
        max={120}
        onChange={(val) => setWorkMinutes(val)}
      />
      <label>Break Minutes: {breakMinutes}:00</label>
      <ReactSlider
        className={"slider green"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={breakMinutes}
        min={1}
        max={120}
        onChange={(val) => setBreakMinutes(val)}
      />
      <div className="buttonContainer" style={{ textAlign: "center" }}>
        <BackButton onClick={() => setShowSettings(false)} />
      </div>
    </div>
  );
};

export default Settings;
