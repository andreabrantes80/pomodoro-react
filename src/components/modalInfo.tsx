import React, { JSX } from "react";
import "./ModalInfo.css";

interface ModalInfoProps {
  onClose: () => void;
}

export function ModalInfo({ onClose }: ModalInfoProps): JSX.Element {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="pomodoro-description">
          <p>
            🕒 <strong>PomodoroTime</strong> é um aplicativo de produtividade
            baseado na técnica Pomodoro, já configurado para:
          </p>
          <ul>
            <li>25 minutos de trabalho focado</li>
            <li>5 minutos de descanso curto entre ciclos</li>
            <li>15 minutos de descanso longo após 4 ciclos completos</li>
          </ul>
        </div>
        <button className="modal-close" onClick={onClose}>
          Entendi
        </button>
      </div>
    </div>
  );
}
