import { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { PlayButton, PauseButton, SettingButton } from "../";
import { useSettingsContext } from "../../context/settings/SettingsContext";
import "./Timer.css";

const BREAK_TIME_CLR = "#4AEC8C"; // Green
const WORK_TIME_CLR = "#F54E4E"; // Red
const WORK_MODES = ["work", "break"];

const Timer = () => {
  const settingsInfo = useSettingsContext();
  const { setShowSettings, workMinutes, breakMinutes } = settingsInfo;

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState(WORK_MODES[0]);
  const [secondsLeft, setSecondLeft] = useState(0);

  // useRef helps changing props in `settingsInfo` without re-rendering component
  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(mode);
  const isPausedRef = useRef(isPaused);

  const initTimer = () => {
    secondsLeftRef.current = workMinutes * 60;
    setSecondLeft(secondsLeftRef.current);
  };

  const switchMode = () => {
    const nextMode =
      modeRef.current === WORK_MODES[0] ? WORK_MODES[1] : WORK_MODES[0];
    const nextSeconds =
      (nextMode === WORK_MODES[0] ? workMinutes : breakMinutes) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  };

  const tick = () => {
    secondsLeftRef.current--;
    setSecondLeft(secondsLeftRef.current);
  };

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsInfo]);

  const totalSeconds =
    mode === WORK_MODES[0] ? workMinutes * 60 : breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <>
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: "#FFF",
          pathColor: mode === WORK_MODES[0] ? WORK_TIME_CLR : BREAK_TIME_CLR,
          trailColor: "rgba(255, 255, 255, 0.2)",
        })}
      />
      <div className="buttonContainer">
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div className="buttonContainer">
        <SettingButton onClick={() => setShowSettings(true)} />
      </div>
    </>
  );
};

export default Timer;
