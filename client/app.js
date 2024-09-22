//DOM manipulation
//select the form
//select the feedback container
const feedbackForm = document.getElementById("form-data");

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(feedbackForm);
  const formValues = Object.fromEntries(formData);
  console.log(formValues);

  fetch("http://localhost:8082/add-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
}
feedbackForm.reset();

feedbackForm.addEventListener("submit", handleSubmit);

async function getData() {
  const response = await fetch("http://localhost:8082/readData");
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}

async function getFeedback() {
  const feedbackContainer = document.getElementById("feedback-container");
  const feedbackData = await getData();

  feedbackContainer.innerHTML = "";

  feedbackData.forEach((formsData) => {
    const dataContainer = document.createElement("div");
    dataContainer.className = "data-container";

    dataContainer.innerHTML = `
    <div class="fullName">${formsData.full_name}</div>
    <div class="nights">${formsData.nights_of_stay}</div>
    <div class="room">${formsData.room_type}</div>
    <div class="satisfaction">${formsData.satisfaction_of_stay}</div>
    <div class="improvement">${formsData.improvement}</div>
    `;
    feedbackContainer.appendChild(dataContainer);
  });
}

getFeedback();
