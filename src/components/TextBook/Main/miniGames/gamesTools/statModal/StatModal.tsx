/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
import React from 'react';
import {
  Alert, Modal, Button, Table,
} from 'react-bootstrap';

import GameResults from '@/types/gameresult.types';
import { AggregatedWord } from '@/types/response.types';

interface StatModalProps {
  gameResults: GameResults;
  statShow: boolean;
  onHide: () => void;
}

function StatModal({ gameResults, statShow, onHide }: StatModalProps): JSX.Element {
  return (
    <Modal
      show={statShow}
      onHide={onHide}
      scrollable
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Игра окончена</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">
          Ошибок:
          {gameResults.badAnswers.length}
        </Alert>
        <Table size="sm">
          <tbody>
            {gameResults.badAnswers.map((word: AggregatedWord, index: number) => (
              <tr key={word._id}>
                <td>{index + 1}</td>
                <td>{word.word}</td>
                <td>{word.transcription}</td>
                <td>{word.wordTranslate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Alert variant="success">
          Правильных ответов:
          {gameResults.goodAnswers.length}
        </Alert>
        <Table size="sm">
          <tbody>
            {gameResults.goodAnswers.map((word: AggregatedWord, index: number) => (
              <tr key={word._id}>
                <td>{index + 1}</td>
                <td>{word.word}</td>
                <td>{word.transcription}</td>
                <td>{word.wordTranslate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Завершить</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StatModal;
