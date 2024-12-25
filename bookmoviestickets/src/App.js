import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Components/HomeComponent/HomePage';
import MovieDetailsPage from './Components/MoviesComponents/MovieDetailsPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:title" element={<MovieDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
