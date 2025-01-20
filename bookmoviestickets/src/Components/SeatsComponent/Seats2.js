import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Seats.css"; // Add styles here

const Seats2 = () => {
  const location = useLocation();
  const { movieName, theatreName, date, showtime } = location.state || {};

  const rows = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",];
  
  const cols = 28;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    // Randomly book 50-80% of seats
    const totalSeats = rows.length * cols;
    const bookedCount = Math.floor(
      Math.random() * (0.8 - 0.5) * totalSeats + 0.5 * totalSeats
    );
    const booked = new Set();
    while (booked.size < bookedCount) {
      const randomRow = rows[Math.floor(Math.random() * rows.length)];
      const randomCol = Math.floor(Math.random() * cols) + 1;
      booked.add(`${randomRow}${randomCol}`);
    }
    setBookedSeats(Array.from(booked));
  }, []);

  const toggleSeat = (row, col) => {
    const seat = `${row}${col}`;
    if (bookedSeats.includes(seat)) return; // Ignore booked seats
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <div className="theatre-container">
      <div className="movie-details-header">
        <h2 className="movie-title">{movieName}</h2>
        <p className="theatre-info">
          {theatreName} | {date}, {showtime}
        </p>
      </div>
      {/* Seats with Row Labels */}
      <div className="theatre">
        {rows.map((row) => (
          <div key={row} className="row">
            {/* Row Label */}
            <div className="row-label">{row}</div>
            {/* Seats */}
            {Array.from({ length: cols }, (_, i) => i + 1).map((col) => {
              const seat = `${row}${col}`;
              const isSelected = selectedSeats.includes(seat);
              const isBooked = bookedSeats.includes(seat);
              return (
                <div
                  key={seat}
                  className={`seat ${
                    isBooked ? "booked" : isSelected ? "selected" : "available"
                  }`}
                  onClick={() => toggleSeat(row, col)}
                >
                  {col}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="seat-legend">
        <span className="available"></span> Available
        <span className="selected"></span> Selected
        <span className="sold"></span> Sold
      </div>
    </div>
  );
};

export default Seats2;
