async function addBootcamp(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;

    await fetch("api/bootcamps", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-type": "application/json" }
    })
        .then((response) => response.json())
        .then((data) => {
            addFeedback(data);
        });
};

async function addFeedback(data) {
    const rating = document.querySelector("#rating").value;
    const review_text = document.querySelector("#review").value;
    const bootcamp_id = data.id;
    const user_id = document.querySelector("#user_id").innerHTML;

    const createFeedback = await fetch("api/feedback", {
        method: "POST",
        body: JSON.stringify({ rating, review_text, bootcamp_id, user_id }),
        headers: { "Content-type": "application/json" }
    });
    
    if (createFeedback.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(createFeedback.statusText);
    }
};

document.querySelector(".add-feedback").addEventListener("submit", addBootcamp);