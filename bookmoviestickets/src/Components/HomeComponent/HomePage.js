import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import db from "../MoviesData/MoviesFirebase.js"; // Firestore instance
import MovieCard from "./MovieCard";
import "./HomePage.css";

function HomePage() {
  const [movies, setMovies] = useState([]); // State to hold movie data
  const [loading, setLoading] = useState(true); // Loading indicator
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [menuOpen, setMenuOpen] = useState(false); // State for Offcanvas menu
  const navigate = useNavigate();

  // Fetch movies from Firestore on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, "Movies");
        const moviesSnapshot = await getDocs(moviesCollection);
        const moviesList = moviesSnapshot.docs.map((doc) => doc.data());
        console.log("Fetched movies:", moviesList);
        setMovies(moviesList);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle Offcanvas menu

  const handleSearchQuery = (e) => setSearchQuery(e.target.value); // Update search input state

  const handleMovieClick = (movie) =>
    navigate(`/movie/${movie.title}`, { state: movie }); // Navigate to movie details

  // Filter movies based on the search query
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

        <Offcanvas show={menuOpen} onHide={toggleMenu} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Hey User!</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <nav>
              <div className="menu-item">Home</div>
              <div className="menu-item">Movies</div>
              <div className="menu-item">Events</div>
              <div className="menu-item">Plays</div>
              <div className="menu-item">Sports</div>
              <div className="menu-item">Activities</div>
            </nav>
          </Offcanvas.Body>
        </Offcanvas>
      </header>

      <Carousel className="banner">
        {[
          {
            src: "https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg",
            alt: "Credit Card",
          },
          {
            src: "https://assets-in.bmscdn.com/promotions/cms/creatives/1732797085304_asiancinemawebbanner.jpg",
            alt: "Asian Cinema",
          },
          {
            src: "https://assets-in.bmscdn.com/promotions/cms/creatives/1733491218245_prasadsmultiplexweb.jpg",
            alt: "Prasads Multiplex",
          },
        ].map((slide, index) => (
          <Carousel.Item key={index}>
            <img className="banimg" src={slide.src} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel>

      <section className="movies-section">
        <h2>Recommended Movies</h2>
        <div className="movies-grid">
          {loading ? (
            <center>
              <Spinner animation="border" variant="danger" />
            </center>
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

      <footer className="footer">
        <div className="footer-container">
          <h3>Contact Us</h3>
          <p>
            Email:{" "}
            <a href="mailto:support@bookmovietickets.com">
              support@bookmovietickets.com
            </a>
          </p>
          <div className="social-links">
            {[
              {
                href: "https://www.facebook.com",
                src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
                alt: "Facebook",
              },
              {
                href: "https://www.instagram.com",
                src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
                alt: "Instagram",
              },
              {
                href: "https://www.youtube.com",
                src: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
                alt: "YouTube",
              },
              {
                href: "https://www.linkedin.com",
                src: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg",
                alt: "LinkedIn",
              },
              {
                href: "https://www.pinterest.com",
                src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
                alt: "Pinterest",
              },
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={link.src} alt={link.alt} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
