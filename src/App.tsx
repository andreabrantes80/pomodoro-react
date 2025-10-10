import React, { JSX } from "react";
import { PomodoroTime } from "./components/pomodoro-time";

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTime
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </div>
  );
}

export default App;
