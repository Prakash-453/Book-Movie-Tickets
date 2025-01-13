import React, { useState } from "react";
import "./Seats.css"; // Ensure this file contains the necessary styles

const Seats = () => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  const ticketPrice = 200; // Price per seat
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (row, col) => {
    const seat = `${row}${col}`;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const totalPrice = selectedSeats.length * ticketPrice;

  return (
    <div className="theatre-container">
      {/* Seat Map */}
      <div className="theatre">
        {rows.map((row) => {
          const numSeats = row === "A" || row === "H" ? 30 : 28; // A and H have 30 seats, others have 28
          return (
            <div key={row} className="row">
              {/* Row Label */}
              <div className="row-label">{row}</div>
              {/* Render Seats */}
              {Array.from({ length: numSeats }, (_, i) => i + 1).map((col) => {
                const seat = `${row}${col}`;
                const isSelected = selectedSeats.includes(seat);

                // Add a gap between seats 14 and 15 for applicable rows
                if (col === 15 && row !== "A" && row !== "H") {
                  return (
                    <React.Fragment key={col}>
                      <div className="gap"></div>
                      <div
                        className={`seat ${isSelected ? "selected" : "available"}`}
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

      {/* Screen Section */}
      <div className="screen">All eyes this way please!</div>

      {/* Selected Seats and Total Price */}
      <div className="total-price">
        <p>Selected Seats: {selectedSeats.join(", ") || "None"}</p>
        <p>Total Price: ₹{totalPrice}</p>
      </div>

      {/* Legend Section */}
      <div className="legend">
        <div className="legend-item">
          <div className="seat available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="seat selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="seat booked"></div>
          <span>Sold</span>
        </div>
      </div>
    </div>
  );
};

export default Seats;
