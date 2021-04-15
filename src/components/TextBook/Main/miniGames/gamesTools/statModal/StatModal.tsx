/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/media-has-caption */
import React from 'react';
import {
  Alert, Modal, Button, Table,
} from 'react-bootstrap';

import GameResults from '@/types/gameresult.types';
import { AggregatedWord } from '@/types/response.types';

const server = 'https://reat-learnwords.herokuapp.com/';

interface StatModalProps {
  gameResults: GameResults;
  statShow: boolean;
  onHide: () => void;
}

function StatModal({ gameResults, statShow, onHide }: StatModalProps): JSX.Element {
  if (statShow) document.exitFullscreen().catch(() => {});

  function onSoundClick(event: React.MouseEvent<HTMLTableDataCellElement>) {
    const sound: HTMLAudioElement = event.currentTarget?.parentNode?.lastChild as HTMLAudioElement;
    sound.play().catch(() => {});
  }

  function renderSubTree(subtree: AggregatedWord[]): JSX.Element[] {
    return subtree.map((word: AggregatedWord, index: number) => (
      <tr key={word._id}>
        <td>{index + 1}</td>
        <td>{word.word}</td>
        <td>
          {word.transcription}
          <span onClick={onSoundClick} className="material-icons" style={{ cursor: 'pointer' }}>
            volume_down
          </span>
          <audio src={`${server}${word.audio}`} />
        </td>
        <td>{word.wordTranslate}</td>
      </tr>
    ));
  }

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
          Не изучено:&nbsp;
          {gameResults.badAnswers.length}
        </Alert>
        <Table size="sm">
          <tbody>{renderSubTree(gameResults.badAnswers)}</tbody>
        </Table>
        <Alert variant="success">
          Изучено:&nbsp;
          {gameResults.goodAnswers.length}
        </Alert>
        <Table size="sm">
          <tbody>{renderSubTree(gameResults.goodAnswers)}</tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Завершить</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StatModal;
