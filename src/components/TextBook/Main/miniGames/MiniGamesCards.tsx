import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

import { MiniGamesCardsProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import styles from './style.scss';

const MiniGamesCards = ({ isAuth }: MiniGamesCardsProps): JSX.Element => {
  const currentLocation = isAuth ? '/home' : '/rs-lang/guest';
  const history = useHistory();

  const gameRedirectionHandler = (gameName: string) => {
    history.push(`${currentLocation}/mini-games/${gameName}`);
  };

  const redirectToLogin = () => {
    history.push('/login');
  };

  return (
    <Route exact path={`${currentLocation}/mini-games`}>
      <div className={styles['mini-games-cards-wrapper']}>
        <Card>
          <Card.Img variant="top" src="../../../../assets/image/sprint.jpg" />
          <Card.Body className={styles['card-body']}>
            <Card.Title>Спринт</Card.Title>
            <Card.Text>
              Рекомендуется начать именно с неё. Задача проста: совпадает предложенный перевод с
              английским словом или нет? Однако поспешите – время в игре ограничено
            </Card.Text>
            <Button
              onClick={() => (isAuth ? gameRedirectionHandler('sprint') : redirectToLogin())}
              className={styles['play-game-btn']}
            >
              Играть
            </Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src="../../../../assets/image/savannah.jpg" />
          <Card.Body className={styles['card-body']}>
            <Card.Title>Саванна</Card.Title>
            <Card.Text>
              Представьте себя на &quot;сафари&quot;, однако охотитесь не на животных, а на новые
              слова, и меткий выстрел – это правильно подобранный перевод. Следите за количеством
              жизней. Игра завершится досрочно, если Вы израсходуете все свои &quot;права на
              ошибку&quot;. Советуем оставить неизвестное слово без ответа, чтобы вернуться к нему
              позднее
            </Card.Text>
            <Button
              onClick={() => (isAuth ? gameRedirectionHandler('savannah') : redirectToLogin())}
              className={styles['play-game-btn']}
            >
              Играть
            </Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src="../../../../assets/image/audio_call.jpg" />
          <Card.Body className={styles['card-body']}>
            <Card.Title>Аудио Вызов</Card.Title>
            <Card.Text>
              Знание языка – это не только умение читать и писать, но и понимание устной речи.
              Попробуйте подобрать наиболее подходящий русский эквивалент услышанному английскому
              слову. Правила схожи с игрой &quot;Саванна&quot;. Лайфхак: если сомневаетесь, что
              расслышали слово правильно – прослушайте его еще раз при помощи клика по иконке
              динамика
            </Card.Text>
            <Button
              onClick={() => (isAuth ? gameRedirectionHandler('audio-call') : redirectToLogin())}
              className={styles['play-game-btn']}
            >
              Играть
            </Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src="../../../../assets/image/audio_reply.jpg" />
          <Card.Body className={styles['card-body']}>
            <Card.Title>Аудио Ответ</Card.Title>
            <Card.Text>
              &quot;Вишенка на торте&quot;. Тренируйте своё произношение до тех пор, пока не
              приблизитесь к совершенству. Работает только в браузере Chrome
            </Card.Text>
            <Button
              onClick={() => (isAuth ? gameRedirectionHandler('audio-reply') : redirectToLogin())}
              className={styles['play-game-btn']}
            >
              Играть
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Route>
  );
};

const mapStateToProps = (state: State): MiniGamesCardsProps => ({
  isAuth: state.authReducer!.auth,
});

export default connect(mapStateToProps, null)(MiniGamesCards);
