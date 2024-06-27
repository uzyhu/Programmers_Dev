import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let name = "리액트";

  return (
    <div className="App">
      <h1>hello</h1>
      {
        name === "리액트" ? (<h1>YES</h1>) : null
      }
    </div>
  );
}

export default App;
