import React, { useState, useEffect } from "react";
import "./Seats.css"; // Add styles here

const Seats2 = () => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  const cols = 28;
  const ticketPrice = 200; // Price per seat

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
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const totalPrice = selectedSeats.length * ticketPrice;

  return (
    <div className="theatre-container">

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
                  className={`seat ${isBooked ? "booked" : isSelected ? "selected" : "available"}`}
                  onClick={() => toggleSeat(row, col)}
                >
                  {col}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Screen */}
      <div className="screen">All eyes this way please!</div>

      {/* Total Price */}
      <div className="total-price">
        <p>
          Selected Seats: {selectedSeats.join(", ") || "None"}
        </p>
        <p>Total Price: ₹{totalPrice}</p>
      </div>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <span className="seat available"></span> Available
        </div>
        <div className="legend-item">
          <span className="seat selected"></span> Selected
        </div>
        <div className="legend-item">
          <span className="seat booked"></span> Booked
        </div>
      </div>
    </div>
  );
};

export default Seats2;
