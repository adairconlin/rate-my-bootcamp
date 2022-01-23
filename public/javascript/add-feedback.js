async function newFeedback(event) {
    event.preventDefault();

    const rating = document.querySelector("#rating").value;
    const review_text = document.querySelector("#review").value;

    const response = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({ rating, review_text }),
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

document.querySelector("#new-feedback").addEventListener("submit", newFeedback);