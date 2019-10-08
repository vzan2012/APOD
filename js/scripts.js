// Custom Scripts
const picPage = new PicDay();

// Get the API key from the NASA API - Website
const apiKey = "";

// Get the elements
const title = document.querySelector(".titleContent");
const datewrapper = document.querySelector(".datewrapper");
const mediaSection = document.querySelector(".media-section");
const explanation = document.querySelector(".explanation");

const contentContainer = document.querySelector(".content-container");

const div = document.createElement("div");

const btnshowData = document
  .querySelector("#btn-show-data")
  .addEventListener("click", showData);

if (!apiKey) {
  // Fetch the Data from the URL
  picPage
    .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    .then(data => displayData(data))
    .catch(err => console.log(err));
} else {
  // Fetch the Data from the URL
  picPage
    .get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    .then(data => displayData(data))
    .catch(err => console.log(err));
}

// Show the Data for the selected date
function showData() {
  const dayVal = document.querySelector("#date-field").value;
  const monthVal = document.querySelector("#month-field").value;
  const yearVal = document.querySelector("#year-field").value;

  if (!apiKey) {
    picPage
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${yearVal.toString()}-${monthVal.toString()}-${dayVal.toString()}`
      )
      .then(data => displayData(data))
      .catch(err => console.log(err));
  } else {
    picPage
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${yearVal.toString()}-${monthVal.toString()}-${dayVal.toString()}`
      )
      .then(data => displayData(data))
      .catch(err => console.log(err));
  }
}

// Reload the page
const reloadPage = () => {
  location.reload();
};

// Display the Data
const displayData = data => {
  if (data.title) {
    title.textContent = `${data.title}`;
    datewrapper.innerHTML = `<span><strong>Date: </strong>${formatDate(
      data.date
    )}</span>`;
    datewrapper.className += " mb-3";
    if (data.media_type && data.media_type === "image") {
      mediaSection.innerHTML = `<img src="${data.url}" title="" class="img-fluid d-img" />`;
    } else if (data.media_type && data.media_type === "video") {
      mediaSection.innerHTML = `<iframe class="video-player" src="${data.url}"></iframe>`;
    }
    explanation.className += " mt-3 mb-3";
    explanation.innerHTML = `<p>${data.explanation}</p>`;
  } else {
    div.className = "alert alert-danger error-alert";
    div.innerHTML = `${data.msg}`;
    contentContainer.insertBefore(div, contentContainer.childNodes[0]);

    setTimeout(() => {
      document.querySelector(".error-alert").remove();
      // reloadPage();
    }, 2000);
  }
};

const brandTitle = document.querySelector(".navbar-brand");
brandTitle.addEventListener("click", reloadPage);

// Get the Year for the Footer
const year = document.querySelector(".copyyear");
year.textContent = new Date().getFullYear();

const formatDate = date => {
  let dateVal = date.split("-");
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const day = dateVal[2];
  const month = dateVal[1];
  const year = dateVal[0];
  const dateDisplay = `${day}-${monthName[parseInt(month) - 1]}-${year}`;

  return dateDisplay;
};
