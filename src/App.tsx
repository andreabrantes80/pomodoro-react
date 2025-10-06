import React, { JSX } from 'react';
import { PomodoroTime } from './components/pomodoro-time';

function App(): JSX.Element {
  return <div className="App">

    <PomodoroTime defaultPomodoroTime={1500} />

    </div>;
}

export default App;
