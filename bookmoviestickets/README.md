Online Movie Ticket Booking System

Overview
The Online Movie Ticket Booking System provides users with a seamless and convenient way to book movie tickets online. It ensures a smooth experience with features like movie search, seat selection, secure payment, and booking confirmation.

Project Purpose
The primary objectives of this system are:
✔️ Allow users to search for movies, view show timings, and check seat availability.
✔️ Enable users to select seats and book tickets online hassle-free.
✔️ Integrate secure online payment for ticket booking.
✔️ Generate booking confirmations and digital tickets.
✔️ Provide a responsive user interface across multiple devices.

Technologies Used
Frontend (Client-Side)
React.js – For building a dynamic and interactive UI.
JavaScript – Handles event-driven operations and user interactions.
HTML & CSS – Ensures a structured and visually appealing design.
React Router – Manages navigation between pages (e.g., Home, Movie List, Booking Page).
Bootstrap/CSS – Enhances responsiveness and styling.

Backend & Database
Firebase (Firestore Database) – Stores real-time movie data, user bookings, and seat availability.
Provides cloud-based hosting for static assets.
Manages authentication (if login/signup is implemented).

Payment Gateway – Razorpay Integration
Ensures secure online transactions for ticket bookings.
Supports various payment methods (credit/debit cards, UPI, wallets).

Key Features & Functionalities

✅ Movie Search & Selection
Users can browse available movies and filter them based on:
Genre (Action, Comedy, Drama, etc.).
Language (English, Hindi, etc.).
City/Theater.
Show Timing.
Clicking on a movie redirects the user to a detailed page displaying:

Movie description, trailer, and ratings.
Available theaters and their respective show timings.
✅ Seat Selection & Booking Process
View an interactive seat layout.
Select the desired number of seats.
Pricing updates dynamically based on seat selection.
Real-time seat availability updates to prevent duplicate bookings.

✅ Payment Processing with Razorpay
Users proceed to a secure checkout after seat selection.
Razorpay processes transactions securely.
Upon successful payment, booking details are stored in Firebase.

✅ Booking Confirmation & Ticket Generation
Users receive an email/SMS confirmation.
A digital ticket (QR Code or PDF) is generated.
The system updates seat availability in real time to prevent overbooking.

✅ Responsive UI & User-Friendly Design
Optimized for mobile and desktop users.
Intuitive navigation ensures a smooth experience.
Users can track booking history (if login is implemented).

User Journey (Step-by-Step Guide)
1️⃣ Search & Select Movie
Users land on the homepage and search or browse available movies.
Select a movie and preferred showtime.

2️⃣ Choose Seats
View a real-time seat map.
Select seats and review pricing.

3️⃣ Make Payment
Redirected to Razorpay's secure payment gateway.
Enter payment details and complete the transaction.

4️⃣ Get Booking Confirmation
A digital ticket (QR Code or PDF) is generated.

5️⃣ Enjoy the Movie!
Show the digital ticket at the theater for entry.

Future Enhancements
✅ User Authentication - Allow users to log in and track bookings.
✅ Reviews & Ratings - Enable users to rate movies and theaters.
✅ Promo Codes & Discounts - Implement discount features for users.
✅ Multiple Payment Gateways - Support PayPal, Stripe, or other options.

Project Setup & Installation 

Clone the Repository
git clone https://github.com/Prakash-453/Book-Movie-Tickets.git

Navigate to the Project Directory
cd BookmovieTickets

Install Dependencies
npm install

Configuration
Create a .env file in the root directory and add the following configurations:
REACT_APP_GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'
REACT_APP_RAZORPAY_KEY = 'YOUR_RAZORPAY_API_KEY'
Replace <YOUR_GOOGLE_CLIENT_ID> and <YOUR_RAZORPAY_API_KEY> with your actual API keys.

Start the Development Server
npm start
This will start the application locally at: 🔗 http://localhost:3000

Conclusion
The Online Movie Ticket Booking System offers a modern, secure, and user-friendly way to book movie tickets online. With React.js, Firebase, and Razorpay, it ensures a fast, reliable, and real-time booking experience. The responsive UI enhances the overall movie-going experience.

Project Preview
![alt text](<Project Execution Video.gif>)