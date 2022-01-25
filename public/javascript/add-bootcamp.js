async function addBootcamp(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const rating = document.querySelector("#rating").value;
    const review_text = document.querySelector("#review").value;

    const createBootcamp = await fetch("api/bootcamps", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(bootcampData => {
        const searchBootcamp = await fetch ("api/bootcamps", {
            method: "GET"
        })
    });

/*     if (!bootcampResponse.ok) {
        alert(bootcampResponse.statusText);
    }

    console.log("Bootcamp response: " + bootcampResponse.dataValues.id);
    const bootcamp_id = bootcampResponse.dataValues.id;
    const user_id = req.body.user_id;
    const feedbackResponse = await fetch("api/feedback", {
        method: "POST",
        body: JSON.stringify({ rating, review_text, bootcamp_id, user_id }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (feedbackResponse.ok) {
        window.location.replace('/dashboard');
    } else {
        alert(feedbackResponse.statusText);
    } */
};


document.querySelector(".add-feedback").addEventListener("submit", addBootcamp);