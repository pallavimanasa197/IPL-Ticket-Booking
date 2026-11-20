
// Activity 5: JavaScript Basics and User Interaction

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

// 2. Smooth Scrolling to Booking Form
document.addEventListener("DOMContentLoaded", function () {

    // Select all Book buttons
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

});
