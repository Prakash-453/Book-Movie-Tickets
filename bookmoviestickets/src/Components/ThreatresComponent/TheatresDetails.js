import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ThreatreDetails.css';

const MovieShowtimes = () => {
  const movieData = {
    theatres: [
      {
        id: '1',
        name: 'AAA Cinemas: Ameerpet',
        showtimes: ['10:45 AM', '03:50 PM', '05:30 PM', '09:30 PM'],
        language: ['Telugu', 'Hindi'],
      },
      {
        id: '2',
        name: 'Alankar (Pratap Theatre): Langer House',
        showtimes: ['02:00 PM', '05:45 PM', '09:30 PM'],
        language: ['Telugu', 'Tamil'],
      },
      {
        id: '3',
        name: 'AMB Cinemas: Gachibowli',
        showtimes: ['12:55 PM', '03:50 PM'],
        language: ['Hindi', 'Malayalam'],
      },
      {
        id: '4',
        name: 'Aparna Cinemas: Nallagandla',
        showtimes: ['02:30 PM', '06:30 PM', '07:25 PM', '10:30 PM', '11:15 PM'],
        language: ['Telugu', 'Malayalam'],
      },
    ],
  };

  const [selectedLanguage, setSelectedLanguage] = useState('Telugu');
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { movieName } = location.state || { movieName: 'Unknown Movie' };

  const handleLanguageChange = (language) => setSelectedLanguage(language);

  const handleDateChange = (direction) => {
    const newDate = new Date(date);
    direction === 'prev' ? newDate.setDate(newDate.getDate() - 1) : newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  const filteredTheatres = movieData.theatres.filter((theatre) =>
    theatre.language.includes(selectedLanguage)
  );

  const getShowtimeClass = (index) => (index % 2 === 0 ? 'available' : 'fast-filling');

  return (
    <div className="container">
      <h1>{movieName} - Showtimes</h1>

      <div className="date-navigation">
        <button onClick={() => handleDateChange('prev')}>Previous</button>
        <button onClick={() => handleDateChange('next')}>Next</button>
        <p>Selected Date: {date.toDateString()}</p>
      </div>

      <div className="language-selection">
        <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
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
        {filteredTheatres.map((theatre) => (
          <div key={theatre.id} className="theatre-card">
            <h3 className="theatre-name">{theatre.name}</h3>
            <div className="showtimes">
              {theatre.showtimes.map((time, index) => (
                <span key={index} className={`showtime ${getShowtimeClass(index)}`}>
                  {time}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieShowtimes;