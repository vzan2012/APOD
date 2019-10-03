// Custom Scripts

const picPage = new PicDay();

// Get the elements
const title = document.querySelector(".titleContent");
const datewrapper = document.querySelector(".datewrapper");
const mediaSection = document.querySelector(".media-section");
const explanation = document.querySelector(".explanation");

// Fetch the Data from the URL
picPage
  .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
  .then(data => displayData(data))
  .catch(err => console.log(err));

// Display the Data
const displayData = data => {
  console.log(data);
  title.textContent = `${data.title}`;
  datewrapper.innerHTML = `<span><strong>Date: </strong>${data.date}</span>`;
  datewrapper.className += " mt-3 mb-3";
  if (data.media_type && data.media_type === "image") {
    mediaSection.innerHTML = `<img src="${data.url}" title="" class="img-fluid d-img" />`;
  } else if (data.media_type && data.media_type === "video") {
    mediaSection.innerHTML = `<iframe class="video-player" src="${data.url}"></iframe>`;
  }
  explanation.className += " mt-3 mb-3";
  explanation.innerHTML = `<p>${data.explanation}</p<`;
};

// Get the Year for the Footer
const year = document.querySelector(".copyyear");
year.textContent = new Date().getFullYear();
