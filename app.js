
/* ===== Activity 5: JavaScript Basics and User Interaction ===== */

// 1. Reusable Toast Notification Function
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = "show";

    setTimeout(function () {
        toast.className = "";
    }, 3000);
}

// 2. DOM Loaded
document.addEventListener("DOMContentLoaded", function () {

    // Smooth Scrolling to Booking Form
    const bookButtons = document.querySelectorAll(".book-btn");

    bookButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {

            const bookingForm = document.getElementById("bookingForm");

            if (bookingForm) {
                event.preventDefault();

                bookingForm.scrollIntoView({
                    behavior: "smooth"
                });

                showToast("Redirecting to ticket booking!");
            }
        });
    });

    // ===== Activity 7: Live Booking Summary =====

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        // Select Form Elements
        const matchSelect = document.getElementById("match");
        const standSelect = document.getElementById("stand");
        const quantityInput = document.getElementById("tickets");

        // Select Summary Elements
        const summaryMatch = document.getElementById("summaryMatch");
        const summaryStand = document.getElementById("summaryStand");
        const summaryQuantity = document.getElementById("summaryQuantity");
        const totalPrice = document.getElementById("totalPrice");

        // Ticket Prices
        const ticketPrices = {
            General: 800,
            Premium: 1500,
            VIP: 3000,
            Corporate: 0
        };

        // Update Booking Summary
        function updateSummary(showNotification = true) {

            const match = matchSelect.value;
            const stand = standSelect.value;
            const quantity = Number(quantityInput.value) || 0;

            const price = ticketPrices[stand] || 0;
            const total = price * quantity;

            summaryMatch.textContent = match || "Not Selected";
            summaryStand.textContent = stand || "Not Selected";
            summaryQuantity.textContent = quantity;
            totalPrice.textContent = total;

            if (showNotification) {
                showToast("Booking Summary Updated!");
            }
        }

        // Change Event Listeners
        matchSelect.addEventListener("change", updateSummary);
        standSelect.addEventListener("change", updateSummary);
        quantityInput.addEventListener("input", updateSummary);

        // Reset Event
        bookingForm.addEventListener("reset", function () {
            setTimeout(function () {
                updateSummary(false);
                showToast("Booking Form Reset!");
            }, 0);
        });

        // Confirm Booking
        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            updateSummary(false);

            showToast("Booking Confirmed Successfully!");

            alert("Congratulations! Your IPL ticket booking is confirmed.");
        });

        // Initial Summary
        updateSummary(false);
    }

});
