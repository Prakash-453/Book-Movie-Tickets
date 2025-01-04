import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Components/HomeComponent/HomePage';
import MovieDetailsPage from './Components/MoviesComponents/MovieDetailsPage';
import MovieShowtimes from "./Components/ThreatresComponent/TheatresDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:title" element={<MovieDetailsPage />} />
        <Route path="/theatre-details" element={<MovieShowtimes />} />
      </Routes>
    </Router>
  );
}

export default App;
