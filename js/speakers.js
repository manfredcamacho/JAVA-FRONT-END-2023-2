let tbody = document.getElementById("speakers-table-body");

let getSpeakers = () => {
  fetch("http://localhost:8080/api/speakers")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let speakers = response.data;
      speakers.forEach((speaker) => {
        tbody.innerHTML += `
          <tr>
            <td>${speaker.name}</td>
            <td>${speaker.lastName}</td>
            <td>${speaker.email}</td>
            <td>${speaker.topic}</td>
            <td>
              <button type="button" class="btn btn-labeled btn-primary" data-bs-toggle="modal" data-bs-target="#editModal"><span class="btn-label"><i class="fas fa-edit"></i></span> Edit</button>
              <button type="button" class="btn btn-labeled btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"><span class="btn-label"><i class="fas fa-trash-alt"></i></span> Delete</a>
            </td>
          </tr>
        `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getSpeakers();
