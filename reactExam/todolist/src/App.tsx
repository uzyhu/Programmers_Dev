import React from "react";
import "./App.css";
import TodoList from "./Todolist";
import Clock from "./Timer";
import MyWeather from "./MyWeather";

function App() {
  let name = "리액트";

  return (
    <div className="container">
      <TodoList></TodoList>
      <Clock></Clock>
      <MyWeather weather="맑음">일기예보</MyWeather>
    </div>
  );
}

export default App;
