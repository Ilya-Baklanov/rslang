import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';

import StartLearning from '../UI/buttons/StartLearning';

import Footer from './Footer/Footer';
import Header from './Header/Header';
import styles from './style.scss';

const MainPage = (): JSX.Element => (
  <React.Fragment>
    <div className={styles['main-container-wrapper']}>
      <div className={styles['main-page-wrapper']}>
        <header className={styles['header-container']}>
          <Header />
        </header>
        <main className={styles['main']}>
          <div className={styles['preview']} id="preview">
            <StartLearning />
          </div>
          <div className={styles['description']} id="description">
            <div className={styles['description-inner']}>
              <h2>RSLang</h2>
              <p>
                Классические курсы английского Вам представляются скучными или отнимают много
                времени и сил? Изучайте английский язык легко и весело при помощи нашей
                интерактивной платформы RSLang.
              </p>
              <p>
                RSLang – это уникальная возможность улучшить свой английский язык, не покидая дома и
                тратя на обучение ровно столько времени, сколько можете себе позволить.
              </p>
              <p>
                Изучать новую лексику, знакомиться с примерами ее употребления, закреплять знания
                при помощи увлекательных игр – всё это RSLang!
              </p>
            </div>
          </div>
          <div className={styles['demonstration-app']} id="demonstration-app">
            демонстрация работы приложения
          </div>
          <div className={styles['about-the-team']} id="about-the-team">
            <div className={styles['about-the-team-title']}>о команде</div>
            <div className={styles['developers-cards']}>
              <Card className={styles['developer1-card']}>
                <Card.Img variant="top" src="../assets/developers/ilya.jpeg" />
                <Card.Body>
                  <Card.Title>Илья Бакланов</Card.Title>
                  <Card.Text className={styles['about-dev-info']}>
                    Team Lead. Реализовал структуру приложения, словарь, учебник, статистика,
                    настройки, запросы на back end.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className={styles['developer2-card']}>
                <Card.Img variant="top" src="../assets/developers/vitaly.jpeg" />
                <Card.Body>
                  <Card.Title>Виталий Князев</Card.Title>
                  <Card.Text className={styles['about-dev-info']}>
                    Реализовал игры &apos;Саванна&apos;, &apos;Аудиовызов&apos;, &apos;Спринт&apos;,
                    &apos;Аудиответ&apos;, css.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className={styles['developer3-card']}>
                <Card.Img variant="top" src="../assets/developers/dmitry.jpg" />
                <Card.Body>
                  <Card.Title>Дмитрий Ананьев</Card.Title>
                  <Card.Text className={styles['about-dev-info']}>
                    Реализовал back end: mongo DB + herokou, авторизацию и регистрацию UI и back
                    end, раздел Разработчики, css.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className={styles['mini-games']} id="mini-games">
            <h3>Мини-игры</h3>
            <p>Мини-игры платформы RSLang позволят Вам закрепить свои знания английской лексики</p>
            <CardDeck className={styles['mini-games-cards']}>
              <Card>
                <Card.Img variant="top" src="../../../assets/image/sprint.jpg" />
                <Card.Body>
                  <Card.Title>Спринт</Card.Title>
                  <Card.Text>
                    Рекомендуется начать именно с неё. Задача проста: совпадает предложенный перевод
                    с английским словом или нет?
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="../../../assets/image/savannah.jpg" />
                <Card.Body>
                  <Card.Title>Саванна</Card.Title>
                  <Card.Text>
                    Представьте себя на &quot;сафари&quot;, однако охотитесь не на животных, а на
                    новые слова, и меткий выстрел – это правильно подобранный перевод
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="../../../assets/image/audio_call.jpg" />
                <Card.Body>
                  <Card.Title>Аудио Вызов</Card.Title>
                  <Card.Text>
                    Знание языка – это не только умение читать и писать, но и понимание устной речи.
                    Попробуйте подобрать наиболее подходящий русский эквивалент услышанному
                    английскому слову
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="../../../assets/image/audio_reply.jpg" />
                <Card.Body>
                  <Card.Title>Аудио Ответ</Card.Title>
                  <Card.Text>
                    &quot;Вишенка на торте&quot;. Тренируйте своё произношение до тех пор, пока не
                    приблизитесь к совершенству
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </div>
        </main>
        <footer className={styles['footer-container']}>
          <Footer />
        </footer>
      </div>
    </div>
  </React.Fragment>
);

export default MainPage;
