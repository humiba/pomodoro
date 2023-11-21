import "./App.css";
import { Timer, Settings } from "./components";
import { useSettingsContext } from "./context/settings/SettingsContext";

const App = () => {
  const { showSettings } = useSettingsContext();

  console.log(showSettings);

  return (
    <main className="appContainer">
      {showSettings ? <Settings /> : <Timer />}
    </main>
  );
};

export default App;
