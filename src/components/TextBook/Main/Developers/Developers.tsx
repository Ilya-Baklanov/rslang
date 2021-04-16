import React from 'react';
import { Card } from 'react-bootstrap';

import styles from './style.scss';

const Developers = (): JSX.Element => (
  <div className={styles['developers-wrapper']}>
    <h1 className={styles['developers-title']}>Разработчики</h1>
    <div className={styles['developers-cards']}>
      <Card style={{ width: '18rem' }} className={styles['developer1-card']}>
        <Card.Img variant="top" src="../assets/developers/ilya.jpeg" />
        <Card.Body>
          <Card.Title>Илья Бакланов</Card.Title>
          <Card.Text>
            Team Lead. Реализовал структуру приложения, словарь, учебник, статистика, настройки,
            запросы на back end.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }} className={styles['developer2-card']}>
        <Card.Img variant="top" src="../assets/developers/vitaly.jpeg" />
        <Card.Body>
          <Card.Title>Виталий Князев</Card.Title>
          <Card.Text>
            Реализовал игры &apos;Саванна&apos;, &apos;Аудиовызов&apos;, &apos;Спринт&apos;,
            &apos;Аудиответ&apos;, css.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="../assets/developers/dmitry.jpg" />
        <Card.Body>
          <Card.Title>Дмитрий Ананьев</Card.Title>
          <Card.Text>
            Реализовал back end: mongo DB + herokou, авторизацию и регистрацию UI и back end, раздел
            Разработчики, css.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  </div>
);

export default Developers;
