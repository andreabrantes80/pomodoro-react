import React, { JSX } from "react";
import { secondsToMinutes } from "../utils/seconds-to-Minutes";

interface Props {
  mainTime: number;
}

export function Time(props: Props): JSX.Element {
  return <div className="time">{secondsToMinutes(props.mainTime)}</div>;
}
