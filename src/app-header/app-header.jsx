import React from 'react';
import styles from './app-header.module.css'

const AppHeader =()=> {
   return (
      <header className={styles.header}> {/* Используем стили из модуля */}
      <h1 className={styles.title}>My App</h1> {/* Пример использования стилей */}
    </header>
   )

}

export default AppHeader

