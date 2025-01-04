import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore"; // Removed 'select' import
import db from "../MoviesData/Firebase.js"; // Import Firestore instance
import MovieCard from "./MovieCard";
import "./HomePage.css";

function HomePage() {
  const [movies, setMovies] = useState([]); // State to hold movie data
  const [loading, setLoading] = useState(true); // Loading indicator
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch movies from Firestore
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, "movies");
        const moviesQuery = query(moviesCollection); // No need for 'select' in Firebase v9+
        const moviesSnapshot = await getDocs(moviesQuery);
        const moviesList = moviesSnapshot.docs.map((doc) => doc.data());
        setMovies(moviesList);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchMovies();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.title}`, { state: movie });
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <header className="header">
        <div className="logo">BookMovieTickets</div>
        <input
          type="text"
          placeholder="Search for Movies, theaters..etc"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
        <div className="city-select">
          <select>
            <option value="hyderabad">Hyderabad</option>
            <option value="bengaluru">Bangalore</option>
          </select>
        </div>
        <div
          className={`hamburger-menu ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Offcanvas Dropdown Menu */}
        <Offcanvas show={menuOpen} onHide={toggleMenu} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Hey User!</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <nav>
              <div>
                <div className="menu-item">Home</div>
                <div className="menu-item">Movies</div>
                <div className="menu-item">Events</div>
                <div className="menu-item">Plays</div>
                <div className="menu-item">Sports</div>
                <div className="menu-item">Activities</div>
              </div>
            </nav>
          </Offcanvas.Body>
        </Offcanvas>
      </header>

      <Carousel className="banner">
        <Carousel.Item>
          <img
            className="banimg"
            src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg"
            alt="Credit Card"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="banimg"
            src="https://assets-in.bmscdn.com/promotions/cms/creatives/1732797085304_asiancinemawebbanner.jpg"
            alt="Asian Cinema"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="banimg"
            src="https://assets-in.bmscdn.com/promotions/cms/creatives/1733491218245_prasadsmultiplexweb.jpg"
            alt="Prasads Multiplex"
          />
        </Carousel.Item>
      </Carousel>

      <section className="movies-section">
        <h2>Recommended Movies</h2>
        <div className="movies-grid">
          {loading ? (
            <p>Loading movies...</p> // Display a loader while data is being fetched
          ) : filteredMovies.length > 0 ? (
            filteredMovies.map((movie, index) => (
              <MovieCard
                key={index}
                title={movie.title}
                genre={movie.genre}
                rating={movie.rating}
                votes={movie.votes}
                poster={movie.poster}
                onClick={() => handleMovieClick(movie)}
              />
            ))
          ) : (
            <p>No Movies Found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
