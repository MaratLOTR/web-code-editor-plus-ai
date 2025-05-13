import React from 'react';
import styles from './styles.module.css';

interface LanguageInfoProps {
  language: 'python' | 'javascript';
}

const PythonInfo = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <img 
        src="/images/python-logo.png" 
        alt="Python Logo" 
        className={styles.logo}
      />
      <h2>Python</h2>
      <div className={styles.content}>
        <p>Основные особенности:</p>
        <ul>
          <li>Простой и читаемый синтаксис</li>
          <li>Динамическая типизация</li>
          <li>Большое сообщество разработчиков</li>
          <li>Широкий спектр применений: веб, наука, AI/ML</li>
        </ul>
      </div>
    </div>
  </section>
);

const JavaScriptInfo = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <img 
        src="/images/js-logo.png" 
        alt="JavaScript Logo" 
        className={styles.logo}
      />
      <h2>JavaScript</h2>
      <div className={styles.content}>
        <p>Ключевые характеристики:</p>
        <ul>
          <li>Основной язык веб-разработки</li>
          <li>Асинхронное выполнение кода</li>
          <li>Поддержка как ООП, так и функционального стиля</li>
          <li>Большая экосистема (npm, фреймворки)</li>
        </ul>
      </div>
    </div>
  </section>
);

const LanguageInfo: React.FC<LanguageInfoProps> = ({ language }) => {
  return language === 'python' ? <PythonInfo /> : <JavaScriptInfo />;
};

export default LanguageInfo;