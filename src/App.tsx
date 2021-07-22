import React, { useState } from 'react';
import './App.global.css';
import HeaderItem from './components/Header/HeaderItem';
import Title from './components/Title/Title';

export default function App() {
  const [theme, setTheme] = useState<string>('light-theme');
  return (
    <div className={`app ${theme}`}>
      <Title />
      <HeaderItem />
    </div>
  );
}
