import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./BookingPage.css";

function BookingPage() {
  const { state: movie } = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirmation, setConfirmation] = useState(null);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = () => {
    fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: movie.id, seats: selectedSeats }),
    })
      .then((response) => response.json())
      .then((data) => setConfirmation(data.message))
      .catch((error) => console.error("Error booking tickets:", error));
  };

  return (
    <div className="booking-page">
      <h1>{movie.title} - Booking</h1>
      <div className="seat-selection">
        {Array(50)
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              className={`seat ${
                selectedSeats.includes(index) ? "selected" : ""
              }`}
              onClick={() => handleSeatClick(index)}
            >
              {index + 1}
            </button>
          ))}
      </div>
      <button onClick={handleBooking} disabled={!selectedSeats.length}>
        Confirm Booking
      </button>
      {confirmation && <p>{confirmation}</p>}
    </div>
  );
}

export default BookingPage;
