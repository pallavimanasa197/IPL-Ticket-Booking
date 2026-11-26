
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

// ACTIVITY 8: RESPONSIVE LAYOUT

// 1. GRID AND LIST VIEW
const matchContainer = document.getElementById("matchContainer");
const gridViewBtn = document.getElementById("gridView");
const listViewBtn = document.getElementById("listView");

if (matchContainer && gridViewBtn && listViewBtn) {

    gridViewBtn.addEventListener("click", function () {
        matchContainer.classList.remove("list-view");

        gridViewBtn.classList.add("active");
        listViewBtn.classList.remove("active");
    });

    listViewBtn.addEventListener("click", function () {
        matchContainer.classList.add("list-view");

        listViewBtn.classList.add("active");
        gridViewBtn.classList.remove("active");
    });
}


// 2. TEAM FILTER
const teamFilter = document.getElementById("teamFilter");

if (teamFilter && matchContainer) {

    teamFilter.addEventListener("change", function () {

        const selectedTeam = this.value;
        const matchCards = document.querySelectorAll(".match-card");

        matchCards.forEach(function (card) {

            const teams = card.dataset.team;

            if (
                selectedTeam === "all" ||
                teams.includes(selectedTeam)
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });
}


// 3. HAMBURGER MENU
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        });

    });

}
