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

function AudioReply(): JSX.Element {
  const [recording, setRecording] = useState<boolean>(false);
  const [invitation, setInvitation] = useState<string>(invitePressAndSpeak);

  function onRecordingClick() {
    if (recording) {
      setInvitation(invitePressAndSpeak);
    } else {
      setInvitation(inviteSpeak);
    }
    setRecording(!recording);
  }

  function AudioReplyGame(): JSX.Element {
    return (
      <div>
        <GameCounter label="СЛОВА:" count={3} />
        <HealthIndicator count={3} />
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

  return (
    <div>
      <GameContainer gameScreen={AudioReplyGame()} controlsScreen={AudioReplyControls()} />
    </div>
  );
}

export default AudioReply;
