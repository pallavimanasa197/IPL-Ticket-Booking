import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";

function App() {

  const matches = [
    {
      id: 1,
      team1: "CSK",
      team2: "MI",
      date: "10 December 2026",
      venue: "Chinnaswamy Stadium"
    },
    {
      id: 2,
      team1: "RCB",
      team2: "KKR",
      date: "12 December 2026",
      venue: "Eden Gardens"
    },
    {
      id: 3,
      team1: "SRH",
      team2: "CSK",
      date: "15 December 2026",
      venue: "Rajiv Gandhi Stadium"
    },
    {
      id: 4,
      team1: "MI",
      team2: "RCB",
      date: "18 December 2026",
      venue: "Wankhede Stadium"
    }
  ];

  return (
    <>
      <Navbar />
      <Hero />

      <h2>Upcoming IPL Matches 🏏</h2>

      <div className="match-container">

        {matches.map((match) => (
          <MatchCard
            key={match.id}
            team1={match.team1}
            team2={match.team2}
            date={match.date}
            venue={match.venue}
          />
        ))}

      </div>
    </>
  );
}

export default App;
