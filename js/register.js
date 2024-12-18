// Global Variables
const inputs = document.querySelectorAll('input');
const registerForm = document.getElementById('register');
const registerBtn = document.getElementById('btnRegister');
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

registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (isValid) {
    setForm();
  }
});

registerForm.addEventListener('input', function() {
  if (validateInputs(inputs[0]) && validateInputs(inputs[1]) && validateInputs(inputs[2]) && validateInputs(inputs[3]) && validateInputs(inputs[4])) {
    registerBtn.removeAttribute('disabled');
    isValid = true;
  } else {
    registerBtn.setAttribute('disabled', true);
    isValid = false;
  }
});

modeBtn.addEventListener("click", function (e) {
  theme(e.target);
});

async function setForm() {
  const user = {
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    age: inputs[4].value
  };
  const response = await registerApi(user);
  if (response.message === 'success') {
    location.href = './index.html';
  } else {
    document.getElementById('msg').textContent = response.errors?.email?.message;
  }
}

async function registerApi(data) {
  registerBtn.setAttribute('disabled', true);
  try {
    const api = await fetch('https://movies-api.routemisr.com/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      }
    });
    const response = await api.json();
    registerBtn.removeAttribute('disabled');
    return response;
  } catch (err) {
    registerBtn.removeAttribute('disabled');
    console.log(err.message);
  }
}

function validateInputs(input) {
  let regex = {
    firstName: /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    lastName: /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    age: /^([1-7][0-9]|80)$/
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
