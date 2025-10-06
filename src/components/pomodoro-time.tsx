import React, { JSX } from "react";
import { useInterval } from "../hooks/use-interval";

interface Props{
    defaultPomodoroTime?: number;
}

export function PomodoroTime(props: Props): JSX.Element {

    const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime ?? 1500);

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, 1000);

    return <div>Ola mundo { mainTime}</div>

}