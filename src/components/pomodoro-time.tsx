import React, { JSX, useEffect, useState } from "react";
import { useInterval } from "../hooks/use-interval";
import { Button } from "./button";
import { Time } from "./time";
import { secondsToTime } from "../utils/seconds-to-Time";
import { ModalInfo } from "./modalInfo";

const start = require("../sounds/start.mp3");
const stop = require("../sounds/stop.mp3");

const audioStartWorking = new Audio(start);
const audioStopWorking = new Audio(stop);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTime(props: Props): JSX.Element {

  const [mainTime, setMainTime] = useState(props.pomodoroTime);

  const [timeCounting, setTimeCountig] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true)
  );

  // ✅ Inicializa com dados do localStorage, se existirem
  const [completedCycles, setCompletedCycles] = useState(() => {
    const saved = localStorage.getItem("completedCycles");
    return saved ? JSON.parse(saved) : 0;
  });

  const [fullWorkingTime, setFullWorkingTime] = useState(() => {
    const saved = localStorage.getItem("fullWorkingTime");
    return saved ? JSON.parse(saved) : 0;
  });

  const [numberOfPomodoros, setNumberOfPomodoros] = useState(() => {
    const saved = localStorage.getItem("numberOfPomodoros");
    return saved ? JSON.parse(saved) : 0;
  });

  const [showModal, setShowModal] = useState(() => {
    const hasSeenModal = localStorage.getItem("hasSeenModal");
    return !hasSeenModal;
  });

  // const [completedCycles, setCompletedCycles] = useState(0);
  // const [fullWorkingTime, setFullWorkingTime] = useState(0);
  // const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useEffect(() => {
    const savedCycles = localStorage.getItem("completedCycles");
    const savedWorkingTime = localStorage.getItem("fullWorkingTime");
    const savedPomodoros = localStorage.getItem("numberOfPomodoros");

    if (savedCycles) setCompletedCycles(JSON.parse(savedCycles));
    if (savedWorkingTime) setFullWorkingTime(JSON.parse(savedWorkingTime));
    if (savedPomodoros) setNumberOfPomodoros(JSON.parse(savedPomodoros));
  }, []);

  // Salvar dados no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem("completedCycles", JSON.stringify(completedCycles));
    localStorage.setItem("fullWorkingTime", JSON.stringify(fullWorkingTime));
    localStorage.setItem(
      "numberOfPomodoros",
      JSON.stringify(numberOfPomodoros)
    );
  }, [completedCycles, fullWorkingTime, numberOfPomodoros]);

  useInterval(
    () => {
      setMainTime((prev)=> prev - 1);
      if (working) setFullWorkingTime((prev:number)=> prev + 1);
    },
    timeCounting ? 1000 : null
  );

  const configureWork = () => {
    setTimeCountig(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  };
  const configureRest = (long: boolean) => {
    setTimeCountig(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
    audioStopWorking.play();
  };

  const handleCloseModal = () => {
    localStorage.setItem("hasSeenModal", "true");
    setShowModal(false);
  };

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
     setCyclesQtdManager((prev) => {
      const newArray = [...prev];
      newArray.pop();
      return newArray;
      });
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles((prev: number) => prev + 1);
    }

    if (working) setNumberOfPomodoros((prev: number)=> prev + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    configureRest,
    cyclesQtdManager,
    completedCycles,
    numberOfPomodoros,
    props.cycles,
  ]);

  // ✅ Função para resetar tudo
  function configureReset(all: boolean) {
    localStorage.removeItem("completedCycles");
    localStorage.removeItem("fullWorkingTime");
    localStorage.removeItem("numberOfPomodoros");
    localStorage.removeItem("hasSeenModal");

    setCompletedCycles(0);
    setFullWorkingTime(0);
    setNumberOfPomodoros(0);
    setMainTime(props.pomodoroTime);
    setTimeCountig(false);
    setWorking(false);
    setResting(false);
    setCyclesQtdManager(new Array(props.cycles - 1).fill(true));

    setShowModal(true)
  }

  return (
    <>
      {showModal && <ModalInfo onClose={handleCloseModal} />}
      <div className="pomodoro">
        <h2>Você está: {working ? "Trabalhando" : "Descansando"}</h2>
        <Time mainTime={mainTime}></Time>

        <div className="controls">
          <Button text="Work" onClick={() => configureWork()}></Button>
          <Button text="Rest" onClick={() => configureRest(false)}></Button>
          <Button
            className={!working && !resting ? "hidden" : ""}
            text={timeCounting ? "Pause" : "Play"}
            onClick={() => setTimeCountig(!timeCounting)}
          ></Button>
        </div>

        <div className="details">
          <p>Ciclos concluídos: {completedCycles}</p>
          <p>Horas Trabalhadas: {secondsToTime(fullWorkingTime)}</p>
          <p>Pomodoros concluídos: {numberOfPomodoros}</p>
        </div>
        {completedCycles >= 4 && (
          <div className="reset">
            <Button text="Reset" onClick={() => configureReset(true)}></Button>
          </div>
        )}
      </div>
    </>
  );
}
