async function editFeedback(event) {
    event.preventDefault();

    const rating = document.querySelector("input[id='rating']").value.trim();
    const review_text = document.querySelector("input[id='review']").value.trim();
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const response = await fetch(`/api/feedback/${id}`, {
        method: "PUT",
        body: JSON.stringify({ rating, review_text }),
        headers: { "Content-Type": "application/json" }
    });

    if(response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
};

document.querySelector(".edit-feedback").addEventListener("submit", editFeedback);