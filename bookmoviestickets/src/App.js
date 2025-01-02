import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Components/HomeComponent/HomePage';
import MovieDetailsPage from './Components/MoviesComponents/MovieDetailsPage';
import BookingPage from "./Components/MoviesComponents/BookingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:title" element={<MovieDetailsPage />} />
        <Route path="/book/:id" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
