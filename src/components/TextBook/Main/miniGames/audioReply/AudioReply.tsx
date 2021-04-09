import React, { useState } from 'react';

// import { Button } from 'react-bootstrap';
import GameContainer from '../gamesTools/gameContainer/GameContainer';
import GameCounter from '../gamesTools/gameCounter/GameCounter';
import HealthIndicator from '../gamesTools/healthIndicator/HealthIndicator';
import MicIcon from '../gamesTools/micIcon/MicIcon';
import WordPlate from '../gamesTools/wordPlate/WordPlate';

import aReplyStyles from './AudioReply.scss';

const invitePressAndSpeak = 'Нажмите кнопку микрофона и произнесите слово';
const inviteSpeak = 'Произнесите слово';
const resultDisplayDelay = 1000;

function AudioReply(): JSX.Element {
  const [recording, setRecording] = useState<boolean>(false);
  const [invitation, setInvitation] = useState<string>(invitePressAndSpeak);

  function onRecordingClick() {
    if (!recording) {
      if ('webkitSpeechRecognition' in window) {
        setInvitation(inviteSpeak);
        setRecording(true);
        // eslint-disable-next-line
        const recognition: SpeechRecognition = new window['webkitSpeechRecognition']();
        recognition.lang = 'en-GB';
        recognition.start();

        recognition.onend = () => {
          setTimeout(() => {
            setInvitation(invitePressAndSpeak);
            setRecording(false);
          }, resultDisplayDelay);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          if (event.results.length > 0) {
            setInvitation(event.results[0][0].transcript);
          }
        };
      }
    }
  }

  function AudioReplyGame(): JSX.Element {
    return (
      <div>
        <GameCounter label="СЛОВА:" count={3} />
        <HealthIndicator count={3} />
        <WordPlate label="Слово" isBig />
      </div>
    );
  }

  function AudioReplyControls(): JSX.Element {
    return (
      <div className={aReplyStyles['audio-reply-controls']}>
        <WordPlate label={invitation} isShadowed />
        <MicIcon isRecording={recording} onClick={onRecordingClick} />
      </div>
    );
  }

  return <GameContainer gameScreen={AudioReplyGame()} controlsScreen={AudioReplyControls()} />;
}

export default AudioReply;
