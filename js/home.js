// Global Varaibales
const loading = document.querySelector('.loading');
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

// active link
document.querySelectorAll('.menu a').forEach((link) => {
  link.addEventListener('click', function() {
    document.querySelector('.active').classList.remove('active');
    this.classList.add('active');
    const category = this.dataset.category;
    getGames(category);
  })
});

// logout Event
document.querySelector('.logout-btn').addEventListener('click', function() {
  localStorage.removeItem('token');
  location.href = './index.html';
});

modeBtn.addEventListener("click", function (e) {
  theme(e.target);
});

// Get Specific Game
async function getGames(categoryName) {
  loading.classList.remove('d-none');
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'abba00eb1cmshc33322f36ba7e4cp1f95b1jsn12ab79a4d77d',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options);
  const result = await response.json();
  displayData(result);
  loading.classList.add('d-none');
}
getGames('mmorpg');

// Diplay Game in html
function displayData(data) {
  let card = '';
  data.forEach((el) => {
    const videoPath = el.thumbnail.replace('/thumbnail.jpg', '/videoplayback.webm');
    card += `
      <div class="col">
        <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="viewDetails(${el.id})" class="card h-100 bg-transparent" role="button">
          <div class="card-body">
              <figure class="position-relative">
                <img class="card-img-top object-fit-cover h-100" src="${el.thumbnail}" />
              <video muted="true" preload="none" loop class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                <source src="${videoPath}">
                </video>
              </figure>
              <figcaption>
                <div class="hstack justify-content-between">
                  <h3 class="h6 small">${el.title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
                </div>
                <p class="card-text small text-center opacity-50">
                    ${el.short_description.split(" ", 8)}
                </p>
              </figcaption>
          </div>
          <footer class="card-footer small hstack justify-content-between">
              <span class="badge badge-color">${el.genre}</span>
              <span class="badge badge-color">${el.platform}</span>
          </footer>
        </div>
      </div>
    `
  });
  document.getElementById('gameData').innerHTML = card;
}

function stopVideo(event) {
  const videoElement = event.currentTarget.querySelector('video');
  videoElement.classList.add('d-none');
  videoElement.muted = true;
  videoElement.pause();
}

function startVideo(event) {
  const videoElement = event.currentTarget.querySelector('video');
  videoElement.muted = true;
  videoElement.play().then(function() {
    videoElement.classList.remove('d-none');
  });
}

function viewDetails(id) {
  location.href = `./details.html?id=${id}`;
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
