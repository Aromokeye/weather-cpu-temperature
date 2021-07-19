import React, { useState } from 'react';
import './App.global.css';

export default function App() {
  const [theme, setTheme] = useState<string>('dark-theme');
  return <div className={`app ${theme}`}>Hello</div>;
}
