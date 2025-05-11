import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/SavePairModal.scss";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/HistoryModal.scss";

const HistoryModal = ({ show, onClose, userMessage, aiMessage, createdAt }) => {
  const { theme, toggleTheme } = useTheme();

  const token = localStorage.getItem("token");
  const threadId = localStorage.getItem("assistant_thread");

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header className={`modal-header ${theme}`} closeButton>
        {/* <Modal.Title>저장</Modal.Title> */}
      </Modal.Header>

      <Modal.Body>
        <div>
          <div
            className="pair-modal"
            style={{ backgroundColor: "transparent" }}
          >
            <div className="pair-section user">
              <strong className="history-strong">💬 질문</strong>
              <p
                className="history-modal-p"
                style={{ color: "black", transition: "null" }}
              >
                {userMessage.content}
              </p>
              <span className="timestamp">
                {new Date(userMessage.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="pair-section ai">
              <strong className="history-strong">🤖 답변</strong>
              <p className="history-modal-p" style={{ color: "black" }}>
                {aiMessage.content}
              </p>
              <span className="timestamp">
                {new Date(aiMessage.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="history-modal-footer">
              {new Date(createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </Modal.Body>

      {/* <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onClose();
            }}
          >
            Save
          </Button>
        </Modal.Footer> */}
    </Modal>
  );
};

export default HistoryModal;
