import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import "./HomePage.css";

function HomePage() {
  const movies = [
    {
      title: "Mufasa: The Lion King",
      rating: "8.5/10",
      votes: "135.6K Votes",
      genre: "Action, Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/mufasa-the-lion-king-et00396541-1734081980.jpg",
      formats: ["2D", "3D", "ICE 3D","IMAX 2D","IMAX 3D","MX4D 3D","4DX 3D"],
      languages: ["English","Telugu", "Tamil","Hindi"],
      duration: "1h 58m",
      releaseDate: "20 Dec 2024",
      ageRating: "U",
    },
    {
      title: "Pushpa 2: The Rule",
      rating: "8.4/10",
      votes: "296.1K Votes",
      genre: "Action/Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1729771762.jpg",
      formats: ["2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "3h 20m",
      releaseDate: "5 Dec 2024",
      ageRating: "UA16+",
    },
    {
      title: "Bachhala Malli",
      rating: "8.2/10",
      votes: "50.3K Votes",
      genre: "Action/Drama",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/bachhala-malli-et00401910-1718777745.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 16m",
      releaseDate: "20 Dec 2024",
      ageRating: "UA+",
    },
    {
      title: "Lucky Baskhar",
      rating: "9.3/10",
      votes: "150.7K Likes",
      genre: "Crime/Drama/Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/lucky-baskhar-et00386123-1707118235.jpg",
      formats: ["2D"],
      languages: ["Malayalam","Telugu", "Hindi", "Tamil", "Kannada"],
      duration: "2h 30m",
      releaseDate: "31 Oct 2024",
      ageRating: "UA",
    },
    {
      title: "UI",
      rating: "8.4/10",
      votes: "54.7K Votes",
      genre: "Action/Sci-Fi/Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/ui-2024-et00370266-1733467456.jpg",
      formats: ["2D"],
      languages: ["Kannada","Telugu", "Hindi", "Tamil", "Malayalam",],
      duration: "2h 12m",
      releaseDate: "25 Dec 2024",
      ageRating: "UA",
    },
    {
      title: "Amaran",
      rating: "9.4/10",
      votes: "200.7K Likes",
      genre: "Action/Drama/Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/amaran-et00388085-1728627184.jpg",
      formats: ["2D"],
      languages: ["Tamil","Telugu","Hindi", "Kannada", "Malayalam"],
      duration: "2h 49m",
      releaseDate: "31 Oct 2024",
      ageRating: "UA",
    },
    {
      title: "Kanguva",
      rating: "6.5/10",
      votes: "121K Likes",
      genre: "Action/Adventure/Fantasy/Period",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kanguva-et00357490-1711005979.jpg",
      formats: ["2D", "ICE","ICE 3D","IMAX 2D","3D", "IMAX 3D",],
      languages: ["Tamil","Hindi","Telugu", "Kannada", "Malayalam"],
      duration: "2h 34m",
      releaseDate: "14 Nov 2024",
      ageRating: "UA",
    },
    {
      title: "Game Changer",
      rating: "8.7/10",
      votes: "292.4K Likes",
      genre: "Drama/Political",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/game-changer-et00311772-1731311322.jpg",
      formats: ["2D","3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 40m",
      releaseDate: "10 Jan 2025",
      ageRating: "UA",
    },
    {
      title: "They Call Him OG",
      rating: "9.4/10",
      votes: "505.7K Likes",
      genre: "Action/Drama",
      poster:
        "https://cdn.123telugu.com/content/wp-content/uploads/2024/06/OG.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 30m",
      releaseDate: "29 Apr 2025",
      ageRating: "UA",
    },
    {
      title: "Sankranthiki Vasthunnam",
      rating: "8.5/10", // Rating not available yet
      votes: "157.2K Likes", // Votes not available yet
      genre: "Action/Drama",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/sankranthiki-vasthunam-et00418119-1731656543.jpg", // Placeholder poster image
      formats: ["2D", "3D"],
      languages: ["Telugu"],
      duration: "2h 10m",
      releaseDate: "14 Jan 2025",
      ageRating: "UA+",
    },
    {
      title: "Daaku Maharaaj",
      rating: "8.2/10",
      votes: "140.3K Likes",
      genre: "Action/Drama",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/daaku-maharaaj-et00419964-1731669684.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 10m",
      releaseDate: "12 Jan 2025",
      ageRating: "UA",
    },
    {
      title: "Thandel",
      rating: "8.5/10",
      votes: "300.8K Votes",
      genre: "Action/Drama/Romantic",
      poster:
           "https://m.media-amazon.com/images/M/MV5BYjljYmFhMWEtMzYyOS00NzZmLThiNTktMjA0ZWQ4Njg3MDI1XkEyXkFqcGc@._V1_.jpg",
      formats: ["2D", "IMAX 2D","3D", "IMAX 3D",],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 50m",
      releaseDate: "7 Feb 2025",
      ageRating: "A",
    },
    {
      title: "Kalki 2898 AD",
      rating: "8.6/10",
      votes: "112.8K Votes",
      genre: "Sci-Fi/Action/Drama",
      poster:
        "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202408/kalki-2898-ad-prabhas-part-2-shooting-30042599-3x4.jpeg?VersionId=md3vuSgiCkRcQjmBLe07a9fMIe2fuZiw",
      formats: ["2D", "IMAX 2D","3D", "IMAX 3D",],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "3h 1m",
      releaseDate: "27 Jun 2024",
      ageRating: "UA",
    },
    {
      title: "Animal",
      rating: "8.2/10",
      votes: "400.4K Votes",
      genre: "Action/Crime/Drama",
      poster:
           "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/animal-et00311762-1672646524.jpg",
      formats: ["2D", "IMAX 2D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "3h 21m",
      releaseDate: "1 Dec 2023",
      ageRating: "A",
    },
    {
      title: "Salaar: Cease Fire - Part 1",
      rating: "9.1/10",
      votes: "650.3K Votes",
      genre: "Action/Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/salaar-cease-fire--part-1-et00301886-1702971289.jpg", // Placeholder for "Miss You"
      formats: ["2D", "IMAX 2D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 55m",
      releaseDate: "22 Dec 2023",
      ageRating: "A",
    },
    {
      title: "Hari Hara Veera Mallu",
      rating: "8.3/10",
      votes: "145.7K Likes",
      genre: "Action/Adventure/Period/Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/hari-hara-veera-mallu-et00308207-26-08-2021-04-26-29.jpg",
      formats: ["2D", "3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 30m",
      releaseDate: "28 Mar 2025",
      ageRating: "UA",
    },
    {
      title: "The Raja Saab",
      rating: "9.3/10", // Rating not available yet
      votes: "95.5 likes", // Votes not available yet
      genre: "Comedy/Horror/Romantic",
      poster:
        "https://filmfare.wwmindia.com/content/2024/oct/prabhastherajasaab11729510718.jpg", // Placeholder poster image
      formats: ["2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil","Kannada"],
      duration: "2h 50m",
      releaseDate: "10 Apr 2025",
      ageRating: "UA+",
    },
    {
      title: "Avatar: Fire and Ash",
      rating: "9.6/10", // Rating not available yet
      votes: "400.5 likes", // Votes not available yet
      genre: "Action/Adventur/Fantasy,Sci-Fi",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/avatar-fire-and-ash-et00407893-1723442554.jpg", // Placeholder poster image
      formats: ["2D"],
      languages: ["English"],
      duration: "2h 41m",
      releaseDate: "19 Dec 2025",
      ageRating: "A",
    },
    {
      title: "Spirit",
      rating: "9.4/10",
      votes: "112.8K Votes",
      genre: "Action/Crime/Drama",
      poster:
           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTje16-w9Y8wOITtZUkr_TLaV9-N-sHvp57Kg&s",
      formats: ["2D", "IMAX 2D","3D", "IMAX 3D",],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 50m",
      releaseDate: "15 Jan 2026",
      ageRating: "A",
    },
    {
      title: "Baby John",
      rating: "7.3/10", // Rating not available yet
      votes: "88.5 likes", // Votes not available yet
      genre: "Action/Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/baby-john-et00386190-1733985497.jpg", // Placeholder poster image
      formats: ["2D"],
      languages: ["Hindi"],
      duration: "2h 41m",
      releaseDate: "25 Dec 2024",
      ageRating: "UA16+",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.title}`, { state: movie });
  };

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
      </header>

      <Carousel className="banner">
        <Carousel.Item>
          <img
            className="banimg"
            src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg"
            alt="credit card"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="banimg"
            src="https://assets-in.bmscdn.com/promotions/cms/creatives/1732797085304_asiancinemawebbanner.jpg"
            alt="credit card"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="banimg"
            src="https://assets-in.bmscdn.com/promotions/cms/creatives/1733491218245_prasadsmultiplexweb.jpg"
            alt="credit card"
          />
        </Carousel.Item>
      </Carousel>

      <section className="movies-section">
        <h2>Recommended Movies</h2>
        <div className="movies-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie, index) => (
              <MovieCard
                key={index}
                title={movie.title}
                name={movie.name}
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
