// Global Variables
const inputs = document.querySelectorAll('input');
const loginForm = document.getElementById('login');
const loginBtn = document.getElementById('btnLogin');
let isValid = false;
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

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (isValid) {
    setForm();
  }
});

loginForm.addEventListener('input', function() {
  if (validateInputs(inputs[0]) && validateInputs(inputs[1])) {
    loginBtn.removeAttribute('disabled');
    isValid = true;
  } else {
    loginBtn.setAttribute('disabled', true);
    isValid = false;
  }
});

modeBtn.addEventListener("click", function (e) {
  theme(e.target);
});

async function setForm() {
  const user = {
    email: inputs[0].value,
    password: inputs[1].value
  };
  const response = await loginApi(user);
  if (response.message === 'success') {
    localStorage.setItem('token', response.token);
    location.href = './home.html';
  } else {
    document.getElementById('msg').textContent = response?.message;
  }
}

async function loginApi(data) {
  loginBtn.setAttribute('disabled', true);
  try {
    const api = await fetch('https://movies-api.routemisr.com/signin', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      }
    });
    const response = await api.json();
    loginBtn.removeAttribute('disabled');
    return response;
  } catch (err) {
    loginBtn.removeAttribute('disabled');
    console.log(err.message);
  }
}

function validateInputs(input) {
  let regex = {
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  }
  if (regex[input.id].test(input.value)) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    return true;
  } else {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    return false;
  }
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
