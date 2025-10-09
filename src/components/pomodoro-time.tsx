import React, { JSX, useEffect } from "react";
import { useInterval } from "../hooks/use-interval";
import { secondsToTime } from "../utils/seconds-to-time";
import { Button } from "./button";
import { Time } from "./time";

interface Props {
  pomodoroTime?: number;
  shortRestTime?: number;
  longRestTime?: number;
  cycles?: number;
}

export function PomodoroTime(props: Props): JSX.Element {
    const [mainTime, setMainTime] = React.useState(props.pomodoroTime ?? 1500);

    const [timeCounting, setTimeCountig] = React.useState(false);
    const [working, setWorking] = React.useState(false);

    useEffect(() => {
        if (working) document.body.classList.add('working');


    }, [working]);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, timeCounting ? 1000 : null);

    const configureWork = () => {
        setTimeCountig(true);
        setWorking(true);
    }

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Time mainTime={mainTime}></Time>

      <div className="controls">
        <Button text="Work" onClick={() => configureWork()}></Button>
        <Button text="teste" onClick={() => console.log(1)}></Button>
        <Button text={timeCounting ? 'Pause' : 'Play'} onClick={() => setTimeCountig(!timeCounting)}></Button>
          </div>

          <div className="details">
              <p>Testando</p>
          </div>
    </div>
  );
}
