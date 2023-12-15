let tbody = document.getElementById("speakers-table-body");
let deleteButton = document.querySelector("#deleteModal .btn-danger");
var editModal = new bootstrap.Modal(document.getElementById("editModal"), "");
var deleteModal = new bootstrap.Modal(
  document.getElementById("deleteModal"),
  ""
);
let speakers = [];
let currentSpeaker = null;

let setCurrentSpeaker = (id) => {
  currentSpeaker = speakers.find((speaker) => speaker.id === id);
};

let fillSpeakerModal = (id) => {
  setCurrentSpeaker(id);
  document.getElementById("edit-name").value = currentSpeaker.name;
  document.getElementById("edit-lastName").value = currentSpeaker.lastName;
  document.getElementById("edit-email").value = currentSpeaker.email;
  document.getElementById("edit-topic").value = currentSpeaker.topic;
};

let updateSpeaker = () => {
  let id = currentSpeaker.id;
  let name = document.getElementById("edit-name").value;
  let lastName = document.getElementById("edit-lastName").value;
  let topic = document.getElementById("edit-topic").value;
  let speaker = {
    name: name,
    lastName: lastName,
    topic: topic,
  };
  fetch(`http://localhost:8080/api/speaker?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(speaker),
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
      let { name, lastName, email, topic } = data.data;
      let speakerRow = document.getElementById(`speaker-${id}`);
      speakerRow.innerHTML = `
        <td>${name}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${topic}</td>
        <td>
          <button type="button" class="btn btn-labeled btn-primary" onclick="fillSpeakerModal(${id})" data-bs-toggle="modal" data-bs-target="#editModal"><span class="btn-label"><i class="fas fa-edit"></i></span> Editar</button>
          <button type="button" class="btn btn-labeled btn-danger" onclick="setCurrentSpeaker(${id})" data-bs-toggle="modal" data-bs-target="#deleteModal"><span class="btn-label"><i class="fas fa-trash-alt"></i></span> Eliminar</a>
        </td>
      `;
      editModal.hide();
    })
    .catch((err) => {
      console.log(err);
    });
  editModal.hide();
};

let deleteSpeaker = () => {
  let id = currentSpeaker.id;
  fetch(`http://localhost:8080/api/speaker?id=${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  let speakerRow = document.getElementById(`speaker-${id}`);
  speakerRow.remove();
  setCurrentSpeaker(null);
  deleteModal.hide();
};

let getAllSpeakers = () => {
  fetch("http://localhost:8080/api/speakers")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      speakers = response.data;
      speakers.forEach((speaker) => {
        tbody.innerHTML += `
          <tr id="speaker-${speaker.id}">
            <td>${speaker.name}</td>
            <td>${speaker.lastName}</td>
            <td>${speaker.email}</td>
            <td>${speaker.topic}</td>
            <td>
              <button type="button" class="btn btn-labeled btn-primary" onclick="fillSpeakerModal(${speaker.id})" data-bs-toggle="modal" data-bs-target="#editModal"><span class="btn-label"><i class="fas fa-edit"></i></span> Editar</button>
              <button type="button" class="btn btn-labeled btn-danger" onclick="setCurrentSpeaker(${speaker.id})" data-bs-toggle="modal" data-bs-target="#deleteModal"><span class="btn-label"><i class="fas fa-trash-alt"></i></span> Eliminar</a>
            </td>
          </tr>
        `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getAllSpeakers();
