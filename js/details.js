// Global Variables
const modeBtn = document.getElementById("mode");

if (localStorage.getItem("theme")) {
  const theme = localStorage.getItem("theme");
  document.documentElement.dataset.theme = localStorage.getItem("theme");
  if (theme === "light") {
    modeBtn.classList.replace("fa-sun", "fa-moon");
  } else {
    modeBtn.classList.replace("fa-moon", "fa-sun");
  }
}

modeBtn.addEventListener("click", function (e) {
  theme(e.target);
});

(async function () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'abba00eb1cmshc33322f36ba7e4cp1f95b1jsn12ab79a4d77d',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
  const result = await response.json();
  displayData(result);
})();

function displayData(data) {
  let card = `
    <div class="col-md-4">
      <figure>
          <img src="${data.thumbnail}" class="w-100" alt="details image" />
      </figure>
    </div>
    <div class="col-md-8">
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
              <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
              <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
          </ol>
        </nav>
        <h1>${data.title}</h1>
        <h3>About ${data.title}</h3>
        <p>${data.description}</p>
      </div>
    </div>
  `;
  document.getElementById('detailsData').innerHTML = card;
  document.body.style.cssText = `background:url('${data.thumbnail.replace("thumbnail", "background")}') center / cover no-repeat`;
}

function theme(ele) {
  const rootElement = document.documentElement;
  if (ele.classList.contains("fa-sun")) {
    ele.classList.replace("fa-sun", "fa-moon");
    rootElement.dataset.theme = "light";
    localStorage.setItem("theme", "light");
  } else {
    ele.classList?.replace("fa-moon", "fa-sun");
    rootElement.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
  }
}
