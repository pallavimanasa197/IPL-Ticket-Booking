
import { useState, useEffect } from "react";
import "./App.css";

import { supabase } from "./supabase";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import MyBookings from "./components/MyBookings";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase
        .from("matches")
        .select("*");

      if (error) {
        setError(error.message);
      } else {
        setMatches(data || []);
        setError("");
      }

      setLoading(false);
    };

    fetchMatches();

    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches",
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <Navbar onNavigate={setActivePage} />

      {activePage === "home" && (
        <>
          <Hero />

          <h2 id="matches">Upcoming IPL Matches 🏏</h2>

          {loading && <p>Loading matches...</p>}

          {error && <p>Error: {error}</p>}

          {!loading && !error && (
            <div className="match-container">
              {matches.map((match) => (
                <MatchCard
                  key={match.id}
                  matchId={match.id}
                  team1={match.team1}
                  team2={match.team2}
                  date={match.date}
                  price={match.price}
                  venue={match.venue}
                  availableSeats={match.available_seats}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activePage === "bookings" && <MyBookings />}
    </>
  );
}

export default App;
