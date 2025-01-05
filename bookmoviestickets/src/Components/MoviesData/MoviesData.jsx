import React, { useEffect, useState } from "react";
import db from "./Firebase.js";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

let hasStoredMovies = false; // Persistent flag to prevent re-execution

export default function StoreMovies() {
  const [isLoading, setIsLoading] = useState(false);

  // Movie data to store in Firestore
  const movies = [
    {
      title: "Mufasa: The Lion King",
      rating: "8.5/10",
      votes: "135.6K Votes",
      trailerUrl:
        "https://www.youtube.com/embed/CDgOcSh9hKM?si=XjQoDD0saF84OHnK",
      genre: "Action, Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/mufasa-the-lion-king-et00396541-1734081980.jpg",
      formats: [
        "2D",
        "3D",
        "ICE 3D",
        "IMAX 2D",
        "IMAX 3D",
        "MX4D 3D",
        "4DX 3D",
      ],
      languages: ["English", "Telugu", "Tamil", "Hindi"],
      duration: "1h 58m",
      releaseDate: "20 Dec 2024",
      ageRating: "U",
      description:
        "A prequel to the beloved Lion King saga, Mufasa explores the journey of Simba's father, from his humble beginnings to becoming a revered king of the Pride Lands.",
      cast: [
        {
          name: "Mahesh Babu as Mufasa (Telugu)",
          image:
            "https://in.bmscdn.com/iedb/artist/images/website/poster/large/mahesh-babu-36982-20-12-2017-04-21-05.jpg",
        },
        {
          name: "Aryan Khan as Simba (Hindi)",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aryan-khan-26062-19-09-2017-16-58-17.jpg",
        },
      ],
    },
    {
      title: "Pushpa 2: The Rule",
      rating: "8.4/10",
      votes: "296.1K Votes",
      trailerUrl:
        "https://www.youtube.com/embed/1StdAUcreJ4?si=cAro-qb8z0Nbz-Bg",
      genre: "Action/Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-the-rule--part-2-et00356724-1729771762.jpg",
      formats: ["2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "3h 20m",
      releaseDate: "5 Dec 2024",
      ageRating: "UA16+",
      description:
        "The continuation of Pushpa Raj's story as he faces new challenges while navigating the criminal underworld and protecting his loved ones.",
      cast: [
        {
          name: "Allu Arjun as Pushpa Raj",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/allu-arjun-125-03-10-2016-01-55-06.jpg",
        },
        {
          name: "Rashmika Mandanna as Srivalli",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rashmika-mandanna-1076783-28-12-2016-12-20-39.jpg",
        },
      ],
    },
  ];

  // Function to store movies in Firestore
  const storeMoviesInFirebase = async () => {
    setIsLoading(true);
    try {
      const collectionRef = collection(db, "movies"); // Reference to the "movies" collection

      for (const movie of movies) {
        // Query to check if the movie already exists
        const q = query(collectionRef, where("title", "==", movie.title));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Add movie to Firestore if not already present
          const docRef = await addDoc(collectionRef, { ...movie });
          console.log("Document written with ID: ", docRef.id);
        } else {
          console.log(`Skipping duplicate movie: ${movie.title}`);
        }
      }

      alert("Movies successfully stored in Firebase!");
    } catch (error) {
      console.error("Error adding movies to Firebase:", error);
      alert("Failed to store movies. Check the console for details.");
    } finally {
      setIsLoading(false); // Stop the loading indicator
    }
  };

  // Run the storing function only once when the component mounts
  useEffect(() => {
    if (!hasStoredMovies) {
      hasStoredMovies = true; // Prevent duplicate execution
      storeMoviesInFirebase();
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <h1>Storing Movies in Firebase</h1>
      {isLoading ? (
        <p>Storing movies...</p>
      ) : (
        <p>Check your Firebase Firestore to see the stored movies.</p>
      )}
    </div>
  );
}
