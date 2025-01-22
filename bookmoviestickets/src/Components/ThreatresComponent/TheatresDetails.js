import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useLocation, useNavigate } from "react-router-dom";
import db from "../ThreatresData/TheatresFirebase.js";
import { collection, getDocs } from "firebase/firestore";
import "./TheatreDetails.css";

const MovieShowtimes = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [theatresData, setTheatresData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("Telugu");
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();
  const { movieName } = location.state || { movieName: "Select Movie" };

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Fetch theater data from Firestore
  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const theatresCollection = collection(db, "Theatres");
        const theatresSnapshot = await getDocs(theatresCollection);
        const theatresList = theatresSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTheatresData(theatresList);
      } catch (error) {
        console.error("Error fetching theaters: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTheatres();
  }, []);

  // Handle language selection
  const handleLanguageChange = (language) => setSelectedLanguage(language);

  // Handle search query change
  const handleSearchQuery = (event) => setSearchQuery(event.target.value);

  // Navigate between dates
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      const newDate = new Date();
      newDate.setDate(date.getDate() + i);
      days.push(newDate);
    }
    return days;
  };

  // Filter theaters by language and search query
  const filteredTheatres = theatresData.filter(
    (theatre) =>
      theatre.language?.includes(selectedLanguage) &&
      theatre.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine class for showtime based on index
  const getShowtimeClass = (index) =>
    index % 2 === 0 ? "available" : "fast-filling";

  const handleShowtimeClick = (classType, theatreName, showtime) => {
    const movieDetails = {
      movieName,
      theatreName,
      showtime,
      date: date.toDateString(),
    };

    if (classType === "available") {
      navigate("/Seats1", { state: movieDetails });
    } else if (classType === "fast-filling") {
      navigate("/Seats2", { state: movieDetails });
    }
  };

  return (
    <div>
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

      <div className="container">
        <h1>🎬 {movieName} - Showtimes</h1>

        {loading ? (
          <center>
            <Spinner animation="border" variant="danger" />
          </center>
        ) : (
          <>
            <div className="date-navigation">
              {getNext7Days().map((day, index) => (
                <button
                  key={index}
                  className={`date-button ${
                    day.toDateString() === date.toDateString() ? "selected" : ""
                  }`}
                  onClick={() => setDate(day)}
                >
                  <div>{day.toLocaleString("default", { weekday: "short" })}</div>
                  <div>{day.getDate()}</div>
                </button>
              ))}
            </div>
            <p id="date">Selected Date: {date.toDateString()}</p>

            <div className="language-selection">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="Telugu">Telugu</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Malayalam">Malayalam</option>
              </select>

              <div className="legend">
                <span className="avail">🟩 Available</span>
                <span className="fill">🟧 Fast filling</span>
              </div>
            </div>

            <div className="showtimes-container">
              {filteredTheatres.length > 0 ? (
                filteredTheatres.map((theatre) => (
                  <div key={theatre.id} className="theatre-card">
                    <h3 className="theatre-name">{theatre.name}</h3>
                    <div className="showtimes">
                      {theatre.showtimes.map((time, index) => (
                        <span
                          key={index}
                          className={`showtime ${getShowtimeClass(index)}`}
                          onClick={() =>
                            handleShowtimeClick(
                              getShowtimeClass(index),
                              theatre.name,
                              time
                            )
                          }
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No theatres available for the selected language or search.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieShowtimes;
