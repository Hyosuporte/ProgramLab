if (document.getElementById("frmNewStuden") != null) {
  document
    .getElementById("frmNewStuden")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(document.forms.frmNewStuden);
      const datosDelFormulario = {};
      for (let [clave, valor] of formData.entries()) {
        datosDelFormulario[clave] = valor;
      }

      fetch("/api/studens/", {
        method: "POST",
        body: JSON.stringify(datosDelFormulario),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          ocultarForm("form-studens");
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
}

if (document.getElementById("frmNewTeacher") != null) {
  document
    .getElementById("frmNewTeacher")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(document.forms.frmNewTeacher);
      const datosDelFormulario = {};
      for (let [clave, valor] of formData.entries()) {
        datosDelFormulario[clave] = valor;
      }

      fetch("/api/teachers/", {
        method: "POST",
        body: JSON.stringify(datosDelFormulario),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          ocultarForm("form-teachers");
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
}

if (document.getElementById("frmEditStuden") != null) {
  document
    .getElementById("frmEditStuden")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const userId = document.getElementById("userId").value;
      const formData = new FormData(document.forms.frmEditStuden);
      const datosDelFormulario = {};
      for (let [clave, valor] of formData.entries()) {
        datosDelFormulario[clave] = valor;
      }

      fetch(`/api/studens/${userId}`, {
        method: "PUT",
        body: JSON.stringify(datosDelFormulario),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          ocultarForm("form-perfil");
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
}

if (document.getElementById("frmEditManager") != null) {
  document
    .getElementById("frmEditManager")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const userId = document.getElementById("userId").value;
      const formData = new FormData(document.forms.frmEditManager);
      const datosDelFormulario = {};
      for (let [clave, valor] of formData.entries()) {
        datosDelFormulario[clave] = valor;
      }

      fetch(`/api/manager/${userId}`, {
        method: "PUT",
        body: JSON.stringify(datosDelFormulario),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          ocultarForm("form-perfil");
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
}

if (document.getElementById("frmEditTeacher") != null) {
  document
    .getElementById("frmEditTeacher")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const userId = document.getElementById("userId").value;
      const formData = new FormData(document.forms.frmEditTeacher);
      const datosDelFormulario = {};
      for (let [clave, valor] of formData.entries()) {
        datosDelFormulario[clave] = valor;
      }

      fetch(`/api/teachers/${userId}`, {
        method: "PUT",
        body: JSON.stringify(datosDelFormulario),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          ocultarForm("form-perfil");
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
}

function ocultarForm(name) {
  form = document.getElementById(name).style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function showForm(name) {
  const form = document.getElementById(name);
  form.style.display = "block";
  form.children[0].children[0].value = "";
  form.children[0].children[1].value = "";
  form.children[0].children[2].value = "";
  form.children[0].children[3].value = "";
  document.getElementById("overlay").style.display = "block";
}

function studenNote(value) {
  document.getElementById("pInforme").innerText = "";
  if (value === "") {
  }
  {
    fetch(`/api/studens/${value}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const selectElement = document.getElementById("list-pract");
        selectElement.innerHTML = '<option value="">Practicas</option>';
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.id;
          option.textContent = item.nombre;
          option.setAttribute("data-report", item.informe);
          selectElement.appendChild(option);
        });
      })
      .catch((error) => {});
  }
}

function riseNote() {
  const userId = document.getElementById("list-studens").value;
  const retro = document.getElementById("reto-notas").value;
  const nota = document.getElementById("nota-Pract").value;
  const practId = document.getElementById("list-pract").value;
  if (userId === "" && note === "") {
  } else {
    fetch(`/api/studens/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        retro: retro,
        nota: nota,
        practId: practId,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error in the answer");
        }
      })
      .then((data) => {
        document.getElementById("reto-notas").value = "";
        document.getElementById("nota-Pract").value = "";
        Swal.fire({
          position: "center",
          icon: "success",
          title: `updated ${data.last_name} student notes`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {});
  }
}

function downloadPdf() {
  const contentDiv = document.createElement("div");
  contentDiv.innerHTML = quill.root.innerHTML;

  var doc = new jsPDF();

  doc.fromHTML(contentDiv, 15, 15, {
    width: 170,
  });
  doc.save("document.pdf");
}

function newText() {
  const userId = document.getElementById("userId").value;
  let text = quill.root.innerText;

  if (userId === "" && text === "") {
  } else {
    fetch(`/api/studens/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        informe: text,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error in the answer");
        }
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `report was uploaded`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {});
  }
}

function newPract() {
  const name = document.getElementById("name_prac").value;
  const materia = document.getElementById("name_subjet").value;
  let text = quill.root.innerText;

  if (name === "" && materia === "" && text === "") {
  } else {
    fetch(`/api/practis/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        materia: materia,
        practiText: text,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error in the answer");
        }
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "practice created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {});
  }
}

function cargarInforme(object) {
  const select = document.getElementById("list-pract")[object.selectedIndex];
  const p = document.getElementById("pInforme");
  p.textContent = select.getAttribute("data-report");
}

function login() {
  const formData = new FormData(document.forms.frmLogin);
  const datosDelFormulario = {};
  for (let [clave, valor] of formData.entries()) {
    datosDelFormulario[clave] = valor;
  }

  fetch("/login", {
    method: "POST",
    body: JSON.stringify(datosDelFormulario),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.error(error);
    });
}
