import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./Seats.css";

const Seats1 = () => {
  const location = useLocation();
  const { movieName, theatreName, date, showtime } = location.state || {};

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (row, col) => {
    const seat = `${row}${col}`;
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
      <div className="theatre">
        {/* Seat Map */}
        {rows.map((row) => {
          const numSeats = row === "A" || row === "H" ? 30 : 28;
          return (
            <div key={row} className="row">
              <div className="row-label">{row}</div>
              {Array.from({ length: numSeats }, (_, i) => i + 1).map((col) => {
                const seat = `${row}${col}`;
                const isSelected = selectedSeats.includes(seat);

                if (col === 15 && row !== "A" && row !== "H") {
                  return (
                    <React.Fragment key={col}>
                      <div className="gap"></div>
                      <div
                        className={`seat ${
                          isSelected ? "selected" : "available"
                        }`}
                        onClick={() => toggleSeat(row, col)}
                      >
                        {col}
                      </div>
                    </React.Fragment>
                  );
                }

                return (
                  <div
                    key={col}
                    className={`seat ${isSelected ? "selected" : "available"}`}
                    onClick={() => toggleSeat(row, col)}
                  >
                    {col}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend Section */}
      <div className="seat-legend">
        <span className="available"></span> Available
        <span className="selected"></span> Selected
        <span className="sold"></span> Sold
      </div>
    </div>
  );
};

export default Seats1;
