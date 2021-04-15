import React from 'react';

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
            особенности
          </div>
          <div className={styles['demonstration-app']} id="demonstration-app">
            демонстрация работы приложения
          </div>
          <div className={styles['about-the-team']} id="about-the-team">
            о команде
          </div>
          <div className={styles['mini-games']} id="mini-games">
            мини игры
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
