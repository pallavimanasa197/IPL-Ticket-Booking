
import { useState } from "react";
import { supabase } from "../supabase";

function MatchCard(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stand, setStand] = useState("General");
  const [tickets, setTickets] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");

    const count = Number(tickets);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setMessage("Please fill all details.");
      return;
    }

    if (!Number.isInteger(count) || count < 1) {
      setMessage("Enter a valid ticket quantity.");
      return;
    }

    if (count > props.availableSeats) {
      setMessage("Not enough seats available!");
      return;
    }

    setLoading(true);

    // First, reserve available seats
    const { data: updatedSeats, error: updateError } =
      await supabase
        .from("matches")
        .update({
          available_seats: props.availableSeats - count
        })
        .eq("id", props.matchId)
        .gte("available_seats", count)
        .select("id, available_seats");

    if (updateError || !updatedSeats || updatedSeats.length === 0) {
      setMessage(
        updateError
          ? updateError.message
          : "Seats are no longer available. Please refresh."
      );
      setLoading(false);
      return;
    }

    // Save booking details
    const { error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          match_id: props.matchId,
          user_name: name,
          match_title: `${props.team1} vs ${props.team2}`,
          tickets: count,
          total_price: Number(props.price) * count
        }
      ]);

    if (bookingError) {
      // Restore seats if booking insertion fails
      await supabase
        .from("matches")
        .update({
          available_seats: updatedSeats[0].available_seats + count
        })
        .eq("id", props.matchId);

      setMessage("Booking failed: " + bookingError.message);
      setLoading(false);
      return;
    }

    setMessage("Tickets booked successfully! 🎉");
    setName("");
    setEmail("");
    setPhone("");
    setTickets(1);
    setLoading(false);
  };

  return (
    <div className="match-card">

      <h2>{props.team1} VS {props.team2}</h2>

      <p>📅 Date: {props.date}</p>

      <p>🏟️ Venue: {props.venue}</p>

      <p>💰 Ticket Price: ₹{props.price}</p>

      <p>🎟️ Available Seats: {props.availableSeats}</p>

      <form onSubmit={handleBooking}>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <select
          value={stand}
          onChange={(e) => setStand(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>

        <input
          type="number"
          min="1"
          max={props.availableSeats}
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
          required
        />

        <p>
          Total: ₹{Number(props.price) * Number(tickets)}
        </p>

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Tickets"}
        </button>

      </form>

      {message && <p>{message}</p>}

    </div>
  );
}

export default MatchCard;
