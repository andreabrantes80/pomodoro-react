import React, { JSX } from "react";
import { useInterval } from "../hooks/use-interval";
import { secondsToTime } from "../utils/seconds-to-time";
import { Button } from "./button";
import { Time } from "./time";

interface Props{
    defaultPomodoroTime?: number;
}

export function PomodoroTime(props: Props): JSX.Element {

    const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime ?? 1500);

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, 1000);

    return( <div
        className="pomodoro"

    >
        <h2>You are: working</h2>
        <Time mainTime={mainTime}></Time>
        <Button text="teste" onClick={()=> console.log(1)}></Button>

    </div>
    );

}