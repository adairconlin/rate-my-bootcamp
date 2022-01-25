function addBootcamp(event) {
    event.preventDefault();

    let newBootcampForm = document.querySelector(".new-bootcamp");
    if (newBootcampForm.style.display === "none") {
        newBootcampForm.style.display = "flex";
    } else {
        newBootcampForm.style.display = "none";
    }
};

async function createBootcamp(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;

    const response = await fetch("/api/bootcamps", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        location.reload();
    }
    else {
        alert(response.statusText);
    }
};

document.querySelector("#add-bootcamp").addEventListener("click", addBootcamp);
document.querySelector("#create-bootcamp").addEventListener("click", createBootcamp);