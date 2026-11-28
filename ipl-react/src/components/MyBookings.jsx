
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          matches (
            team1,
            team2,
            match_date
          )
        `)
        .order("id", { ascending: false });

      if (error) {
        console.error("Booking error:", error.message);
      } else {
        setBookings(data || []);
      }

      setLoading(false);
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="my-bookings">
      <h2>My Ticket Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings available yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Match</th>
              <th>Date</th>
              <th>Stand</th>
              <th>Tickets</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>
                  {booking.matches?.team1} vs{" "}
                  {booking.matches?.team2}
                </td>
                <td>{booking.matches?.match_date}</td>
                <td>{booking.stand_category}</td>
                <td>{booking.tickets}</td>
                <td>₹{booking.tickets * 800}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBookings;
