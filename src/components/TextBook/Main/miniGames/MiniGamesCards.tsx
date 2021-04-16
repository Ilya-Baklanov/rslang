import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { MiniGamesCardsProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import styles from './style.scss';

const MiniGamesCards = ({ isAuth }: MiniGamesCardsProps): JSX.Element => {
  const currentLocation = isAuth ? '/home' : '/rs-lang/guest';

  return (
    <Route exact path={`${currentLocation}/mini-games`}>
      <div className={styles['mini-games-cards-wrapper']}>
        <Card>
          <Card.Img variant="top" src="../../../../assets/image/sprint.jpg" />
          <Card.Body>
            <Card.Title>Спринт</Card.Title>
            <Card.Text>
              Рекомендуется начать именно с неё. Задача проста: совпадает предложенный перевод с
              английским словом или нет? Однако поспешите – время в игре ограничено
            </Card.Text>
            <Link to={`${currentLocation}/mini-games/sprint`}>Играть</Link>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src="../../../../assets/image/savannah.jpg" />
          <Card.Body>
            <Card.Title>Саванна</Card.Title>
            <Card.Text>
              Представьте себя на &quot;сафари&quot;, однако охотитесь не на животных, а на новые
              слова, и меткий выстрел – это правильно подобранный перевод. Следите за количеством
              жизней. Игра завершится досрочно, если Вы израсходуете все свои &quot;права на
              ошибку&quot;. Советуем оставить неизвестное слово без ответа, чтобы вернуться к нему
              позднее
            </Card.Text>
            <Link to={`${currentLocation}/mini-games/savannah`}>Играть</Link>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src="../../../../assets/image/audio_call.jpg" />
          <Card.Body>
            <Card.Title>Аудио Вызов</Card.Title>
            <Card.Text>
              Знание языка – это не только умение читать и писать, но и понимание устной речи.
              Попробуйте подобрать наиболее подходящий русский эквивалент услышанному английскому
              слову. Правила схожи с игрой &quot;Саванна&quot;. Лайфхак: если сомневаетесь, что
              расслышали слово правильно – прослушайте его еще раз при помощи клика по иконке
              динамика
            </Card.Text>
            <Link to={`${currentLocation}/mini-games/audio-call`}>Играть</Link>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src="../../../../assets/image/audio_reply.jpg" />
          <Card.Body>
            <Card.Title>Аудио Ответ</Card.Title>
            <Card.Text>
              &quot;Вишенка на торте&quot;. Тренируйте своё произношение до тех пор, пока не
              приблизитесь к совершенству. Работает только в браузере Chrome
            </Card.Text>
            <Link to={`${currentLocation}/mini-games/audio-reply`}>Играть</Link>
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
