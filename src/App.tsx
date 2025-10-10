import React, { JSX } from "react";
import { PomodoroTime } from "./components/pomodoro-time";

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTime
        pomodoroTime={10}
        shortRestTime={3}
        longRestTime={9}
        cycles={4}
      />
    </div>
  );
}

export default App;
