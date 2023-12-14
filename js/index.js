let form = document.getElementById("speaker-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newSpeaker = {
    name: document.getElementById("name").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    topic: document.getElementById("topic").value,
  };

  fetch("http://localhost:8080/api/speaker", {
    method: "POST",
    body: JSON.stringify(newSpeaker),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      successAlert.classList.remove("d-none");
      errorAlert.classList.add("d-none");
      autocloseAlert();
      form.reset();
    })
    .catch((err) => {
      successAlert.classList.add("d-none");
      errorAlert.classList.remove("d-none");
      autocloseAlert();
      console.log(err);
    });
});

const autocloseAlert = () => {
  window.setTimeout(() => {
    successAlert.classList.add("d-none");
    errorAlert.classList.add("d-none");
  }, 5000);
};
