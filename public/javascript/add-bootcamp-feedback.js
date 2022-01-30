async function newFeedback(event) {
    event.preventDefault();

    const rating = document.querySelector("#rating").value;
    const review_text = document.querySelector("#review").value;
    const user_id = document.querySelector("#user_id").innerHTML;
    const bootcamp_id = window.location.pathname.split("/")[2];

    const response = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({ rating, review_text, bootcamp_id, user_id }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
    }
};

document.querySelector(".feedback-form").addEventListener("submit", newFeedback);