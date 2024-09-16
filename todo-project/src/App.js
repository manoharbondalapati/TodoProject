import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoDetails from "./components/TodoDetails";
import Todos from "./components/Todos";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/todo/:id" element={<TodoDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
