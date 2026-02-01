import React, { useEffect, useState } from "react";
import db from "./MoviesFirebase";
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
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-2-the-rule-et00356724-1737184762.jpg",
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

    {
      title: "Bachhala Malli",
      rating: "8.2/10",
      votes: "50.3K Votes",
      trailerUrl:"https://www.youtube.com/embed/aggB9HZItzg?si=hW_9neGHVt7mYll_",
      genre: "Action/Drama",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/bachhala-malli-et00401910-1718777745.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 16m",
      releaseDate: "20 Dec 2024",
      ageRating: "UA+",
      description:"A tale of love, betrayal, and redemption set in the heartland, where one man fights against the odds to reclaim his honor.",
      cast: [
        {
          name: "Allari Naresh",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/allari-naresh-2640-24-03-2017-12-48-05.jpg",
        },
        {
          name: "Amritha Aiyer",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/amritha-aiyer-2007988-19-03-2020-12-58-29.jpg",
        },
      ],
    },

    {
      title: "Lucky Baskhar",
      rating: "9.3/10",
      votes: "150.7K Likes",
      trailerUrl:"https://www.youtube.com/embed/Kv5RKsqVe-Y?si=90NCLPrPTw6zvC5S",
      genre: "Crime/Drama/Thriller",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/lucky-baskhar-et00386123-1707118235.jpg",
      formats: ["2D"],
      languages: ["Malayalam", "Telugu", "Hindi", "Tamil", "Kannada"],
      duration: "2h 30m",
      releaseDate: "31 Oct 2024",
      ageRating: "UA",
      description:"Lucky Baskhar, an ordinary man with an extraordinary plan, unravels a gripping tale of deception and survival.",
      cast: [
        {
          name: "Dulquer Salmaan",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/dulquer-salmaan-37626-19-09-2017-04-04-09.jpg",
        },
        {
          name: "Meenakshi Chaudhary",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/meenakshi-chaudhary-2014033-1651641584.jpg",
        },
      ],
    },

    {
      title: "UI",
      rating: "8.4/10",
      votes: "54.7K Votes",
      trailerUrl:"https://www.youtube.com/embed/Za0yA0j-DK8?si=ow6VRr6gPQv0ZkNS",
      genre: "Action/Sci-Fi/Thriller",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/ui-2024-et00370266-1733467456.jpg",
      formats: ["2D"],
      languages: ["Kannada", "Telugu", "Hindi", "Tamil", "Malayalam"],
      duration: "2h 12m",
      releaseDate: "25 Dec 2024",
      ageRating: "UA",
      description:"Set in a dystopian future, 'UI' delves into a world where artificial intelligence controls human lives, and a rebel rises to challenge the status quo.",
      cast: [
        {
          name: "Upendra",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/upendra-2420-24-03-2017-17-35-15.jpg",
        },
        {
          name: "Reeshma Nanaiah",
          image:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/reeshma-nanaiah-2004571-1667300383.jpg",
        },
      ],
    },

    {
      title: "Amaran",
      rating: "9.4/10",
      votes: "200.7K Likes",
      trailerUrl:"https://www.youtube.com/embed/U3aPapvUihg?si=gC1f4kqn8t7x4pVz",
      genre: "Action/Drama/Thriller",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/amaran-et00388085-1728627184.jpg",
      formats: ["2D"],
      languages: ["Tamil", "Telugu", "Hindi", "Kannada", "Malayalam"],
      duration: "2h 49m",
      releaseDate: "31 Oct 2024",
      ageRating: "UA",
      description:"A gritty drama showcasing the rise and fall of a crime lord, battling foes within and outside his syndicate.",
      cast: [
        {
          name: "Sivakarthikeyan as Major Mukund Varadarajan",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sivakarthikeyan-1042969-18-09-2017-03-37-23.jpg",
        },
        {
          name: "Sai Pallavi as Indhu Rebecca Varghese",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sai-pallavi-1065111-1654347116.jpg",
        },
      ],
    },

    {
      title: "Kanguva",
      rating: "6.5/10",
      votes: "121K Likes",
      trailerUrl:"https://www.youtube.com/embed/fUekk6TVeq4?si=j08eRk9PzGphBbdv",
      genre: "Action/Adventure/Period",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kanguva-et00357490-1711005979.jpg",
      formats: ["2D", "ICE", "ICE 3D", "IMAX 2D", "3D", "IMAX 3D"],
      languages: ["Tamil", "Hindi", "Telugu", "Kannada", "Malayalam"],
      duration: "2h 34m",
      releaseDate: "14 Nov 2024",
      ageRating: "UA",
      description:"An epic tale of a warrior destined to change the fate of his kingdom, with mythical creatures and treacherous enemies.",
      cast: [
        {
          name: "Suriya Sivakumar as Kanguva/Kangaa",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/suriya-sivakumar-3823-1689655189.jpg",
        },
        {
          name: "Disha Patani as Angelina",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/disha-patani-1061408-1714379037.jpg",
        },
      ],
    },

    {
      title: "Game Changer",
      rating: "8.7/10",
      votes: "292.4K Likes",
      genre: "Drama/Political",
      trailerUrl:"https://www.youtube.com/embed/_iFmNHvqWqA?si=wiH74ZlmCJFWlQND",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/game-changer-et00311772-1731311322.jpg",
      formats: ["2D", "3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 40m",
      releaseDate: "10 Jan 2025",
      ageRating: "UA",
      description:"A gripping political drama about a visionary leader challenging the corrupt political system with his unorthodox methods.",
      cast: [
        {
          name: "Ram Charan",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/ram-charan-teja-1046368-19-09-2017-02-37-43.jpg",
        },
        {
          name: "Kiara Advani",
          image:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/kiara-advani-1043272-1655467015.jpg",
        },
      ],
    },

    {
      title: "They Call Him OG",
      rating: "9.4/10",
      votes: "505.7K Likes",
      genre: "Action/Drama",
      trailerUrl:"https://www.youtube.com/embed/1Zw7PmkSAlI?si=jQ4VlmPk6oAE3j4I",
      poster:"https://cdn.123telugu.com/content/wp-content/uploads/2024/06/OG.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 30m",
      releaseDate: "29 Apr 2025",
      ageRating: "UA",
      description:"A man with a mysterious past fights for justice in a tale of love, revenge, and redemption.",
      cast: [
        {
          name: "Pawan Kalyan as OG",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/pawan-kalyan-26911-19-09-2017-02-46-38.jpg",
        },
        {
          name: "Priyanka Arul Mohan",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/priyanka-arul-mohan-1095858-30-10-2018-10-24-47.jpg",
        },
      ],
    },

    {
      title: "Mr. Perfect",
      rating: "9.7/10", // Rating not available yet
      votes: "157.2K Likes", // Votes not available yet
      trailerUrl:"https://www.youtube.com/embed/KoLsNVB6t_c?si=0S4C57qiIsAjDFRG",
      genre: "Comedy,Romantic",
      poster:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSEGjZBgc9s6_XyKl7Qo-mUKWgnnnmY9cu58O8FLKTOn0QPKhZ7O8uYChQGMPZ1GGug4szi", // Placeholder poster image
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 24m",
      releaseDate: "21 Apr 2011",
      ageRating: "U",
      description:"Vicky (Prabhas) believes that one should be oneself in a relationship and one shouldnt change one`s orientation for the sake of the partner. Vicky and Priya (Kajal Agarwal) are childhood friends and they like each other. Their parents want to marry them off. But Vicky feels that Priya is a not choice for him as she is willing to sacrifice all her comforts for him. Meanwhile, Vicky meets Maggy who has the same taste and lifestyle orientation. Both of them fall in love. The rest of the story is all about how Vicky realises that adjustment is the essence of any blissful relationship.",
      cast: [
        {
          name: "Prabhas",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/prabhas-1708-1686915417.jpg",
        },
        {
          name: "Kajal Aggarwal",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/kajal-aggarwal-1051555-19-09-2017-10-38-45.jpg",
        },
      ],
    },

    {
      title: "Daaku Maharaaj",
      rating: "8.2/10",
      votes: "140.3K Likes",
      trailerUrl:"https://www.youtube.com/embed/teN0JZ67KZU?si=wH6ksqRAGvUauJsB",
      genre: "Action/Drama",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/daaku-maharaaj-et00419964-1731669684.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 10m",
      releaseDate: "12 Jan 2025",
      ageRating: "UA",
      description:"Set in the rugged terrains of India, the story follows a legendary bandit leader who becomes an unlikely savior of the oppressed.",
      cast: [
        {
          name: "Nandamuri Balakrishna",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/nandamuri-balakrishna-282-24-03-2017-17-27-29.jpg",
        },
        {
          name: "Shraddha Srinath",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/shraddha-srinath-30452-1695707094.jpg",
        },
      ],
    },

    {
      title: "Thandel",
      rating: "8.5/10",
      votes: "300.8K Votes",
      trailerUrl:"https://www.youtube.com/embed/RlRpN1Fa9Wo?si=-qlW0v9JOG1k0ASj",
      genre: "Action/Drama/Romantic",
      poster:"https://m.media-amazon.com/images/M/MV5BYjljYmFhMWEtMzYyOS00NzZmLThiNTktMjA0ZWQ4Njg3MDI1XkEyXkFqcGc@.V1.jpg",
      formats: ["2D", "IMAX 2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 50m",
      releaseDate: "7 Feb 2025",
      ageRating: "A",
      description:"An epic saga of love, revenge, and redemption set against the backdrop of war and familial ties.",
      cast: [
        {
          name: "Naga Chaitanya Akkineni",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/naga-chaitanya-akkineni-13567-1655789028.jpg",
        },
        {
          name: "Sai Pallavi",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sai-pallavi-1065111-1654347116.jpg",
        },
      ],
    },

    {
      title: "Kalki 2898 AD",
      rating: "8.6/10",
      votes: "112.8K Votes",
      trailerUrl:"https://www.youtube.com/embed/y1-w1kUGuz8?si=MzRhX-8BcKEkHKk3",
      genre: "Sci-Fi/Action/Drama",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kalki-2898-ad-et00352941-1718275859.jpg",
      formats: ["2D", "IMAX 2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "3h 1m",
      releaseDate: "27 Jun 2024",
      ageRating: "UA",
      description:"Set in a dystopian future, the story follows a warrior's journey to restore balance to the world.",
      cast: [
        { 
          name: "Prabhas", 
          image: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/prabhas-1708-1686915417.jpg" 
        },
        { 
          name: "Deepika Padukone", 
          image: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/deepika-padukone-2822-12-09-2017-06-31-43.jpg" 
        },
      ],
    },

    {
      title: "Mem Famous",
      rating: "8.2/10",
      votes: "200K Votes",
      trailerUrl:"https://www.youtube.com/embed/eQSWfUKi6DE?si=-ZMk4lADL-I_w3DS",
      genre: "Comedy,Drama,Romantic",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/mem-famous-et00357552-1681789372.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 30m",
      releaseDate: "26 May 2023",
      ageRating: "UA",
      description:"Mai, Bali and Durga, the musketeer trio from Bandanarsampally located in rural Telangana find passion, love and purpose in this coming-of-age movie.",
      cast: [
        {
          name: "Sumanth Prabhas as Mahesh",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sumanth-prabhas-2027341-1681729428.jpg",
        },
        {
          name: "Saarya Laxman as Mounika",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/saarya-laxman-2027550-1682487284.jpg",
        },
      ],
    },

    {
      title: "Janaka Aithe Ganaka",
      rating: "8.9/10",
      votes: "65K Votes",
      trailerUrl:"https://www.youtube.com/embed/6eGXENFS024?si=2m5S-In6sHQYM-Tm",
      genre: "Comedy,Drama",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/janaka-aithe-ganaka-et00410356-1725352531.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 18m",
      releaseDate: "12 Oct 2024",
      ageRating: "UA",
      description:"Janaka Aithe Ganaka is a Telugu movie starring Suhas, Sangeerthana, Venalla Kishore and Rajendra Prasad in prominent roles. It is written and directed by Sandeep Reddy Bandla.",
      cast: [
        {
          name: "Suhas",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/suhas-6328-27-07-2021-08-32-07.jpg",
        },
        {
          name: "Sangeerthana Vipin",
          image:
            "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sangeerthana-vipin-2026566-1684838611.jpg",
        },
      ],
    },

    {
      title: "Hari Hara Veera Mallu",
      rating: "8.3/10",
      votes: "145.7K Likes",
      trailerUrl:"https://www.youtube.com/embed/4TriF7BfHyI?si=leIoV1CRnaYymajR",
      genre: "Action/Adventure/Period/Thriller",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/hari-hara-veera-mallu--part-1-sword-vs-spirit-et00308207-1751530343.jpg",
      formats: ["2D", "3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 30m",
      releaseDate: "28 Mar 2025",
      ageRating: "UA",
      description:"A swashbuckling tale of a legendary outlaw navigating treacherous politics and high-stakes missions during the Mughal era.",
      cast: [
        {
          name: "Pawan Kalyan",
          image:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/pawan-kalyan-26911-19-09-2017-02-46-38.jpg",
        },
        {
          name: "Nidhhi Agerwal",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/nidhhi-agerwal-1083263-29-06-2021-01-57-05.jpg",
        },
      ],
    },

    {
      title: "The Raja Saab",
      rating: "9.3/10",
      votes: "95.5 Likes",
      genre: "Comedy/Horror/Romantic",
      trailerUrl:"https://www.youtube.com/embed/ihO4EGhUS_4?si=-ZGAE82bnRIByU-L",
      poster:"https://filmfare.wwmindia.com/content/2024/oct/prabhastherajasaab11729510718.jpg",
      formats: ["2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Kannada"],
      duration: "2h 50m",
      releaseDate: "10 Apr 2025",
      ageRating: "UA+",
      description:"A quirky royal embarks on a comedic and spooky journey to find love in an unexpected place.",
      cast: [
        {
          name: "Prabhas",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/prabhas-1708-1686915417.jpg",
        },
        {
          name: "Nidhhi Agerwal",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/nidhhi-agerwal-1083263-29-06-2021-01-57-05.jpg",
        },
      ],
    },

    {
      title: "Avatar: Fire and Ash",
      rating: "9.6/10",
      votes: "400.5 Likes",
      genre: "Action/Adventure/Sci-Fi",
      trailerUrl:"https://www.youtube.com/embed/ti-b0hGdggQ?si=jyonnjWzR5gOlvAZ",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/avatar-fire-and-ash-et00407893-1765890770.jpg",
      formats: ["2D"],
      languages: ["English"],
      duration: "2h 41m",
      releaseDate: "19 Dec 2025",
      ageRating: "A",
      description:"The saga continues as the Na'vi embark on a new journey to protect their world from devastating threats.",
      cast: [
        {
          name: "Sam Worthington",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sam-worthington-12089-24-03-2017-12-32-07.jpg",
        },
        {
          name: "Zoe Saldana",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/zoe-saldana-3261-13-10-2017-03-54-34.jpg",
        },
      ],
    },

    {
      title: "Spirit",
      rating: "9.4/10",
      votes: "112.8K Votes",
      genre: "Action/Crime/Drama",
      poster:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTje16-w9Y8wOITtZUkr_TLaV9-N-sHvp57Kg&s",
      formats: ["2D", "IMAX 2D", "3D", "IMAX 3D"],
      languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"],
      duration: "2h 50m",
      releaseDate: "15 Jan 2026",
      ageRating: "A",
      description:"A fearless vigilante takes on a ruthless criminal empire in a story of redemption and justice.",
      cast: [
        {
          name: "Prabhas",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/prabhas-1708-1686915417.jpg",
        },
        {
          name: "Kiara Advani",
          image:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/kiara-advani-1043272-1655467015.jpg",
        },
      ],
    },

    {
      title: "Orange",
      rating: "8.9/10",
      votes: "88.5 Likes",
      trailerUrl:"https://www.youtube.com/embed/_FrmfC5_Pv8?si=fn1nsu3XZCVvgcKa",
      genre: "Drama,Romantic",
      poster:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/orange-telugu-et00005527-1738763120.jpg",
      formats: ["2D"],
      languages: ["Telugu"],
      duration: "2h 41m",
      releaseDate: "26 Nov 2010",
      ageRating: "U",
      description:"After going through a heartbreak, a man who does not believe in love gets in a relationship with a young woman. But when she asks him to be with her forever, he hesitates to accept her proposal.",
      cast: [
        {
          name: "Ram Charan",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/ram-charan-teja-1046368-19-09-2017-02-37-43.jpg",
        },
        {
          name: "Genelia Deshmukh",
          image:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/genelia-d-souza-730-24-03-2017-17-29-08.jpg",
        },
      ],
    },
  ];

  // Function to store movies in Firestore
  const storeMoviesInFirebase = async () => {
    setIsLoading(true);
    try {
      const collectionRef = collection(db, "Movies");
      for (const movie of movies) {
        const q = query(collectionRef, where("title", "==", movie.title));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          await addDoc(collectionRef, { ...movie });
          console.log(`Movie added: ${movie.title}`);
        } else {
          console.log(`Skipping duplicate: ${movie.title}`);
        }
      }
      alert("Movies successfully stored in Firebase!");
    } catch (error) {
      console.error("Error storing movies:", error);
      alert("Failed to store movies. Check console for details.");
    } finally {
      setIsLoading(false);
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