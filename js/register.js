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
  if (validateInputs(inputs[0]) && validateInputs(inputs[1]) && validateInputs(inputs[2]) && confirmPass(inputs[2], inputs[3]) && validateInputs(inputs[4])) {
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
    name: inputs[0].value,
    email: inputs[1].value,
    password: inputs[2].value,
    rePassword: inputs[3].value,
    phone: inputs[4].value
  };
  if (user.password === user.rePassword) {
    const response = await registerApi(user);
    if (response.message === 'success') {
      location.href = './index.html';
    } else {
      document.getElementById('msg').textContent = response.errors?.email?.message;
    }
  } else {
    document.getElementById('msg').textContent = 'password and repassword dose not match';
  }
}

async function registerApi(data) {
  registerBtn.setAttribute('disabled', true);
  try {
    const api = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      }
    });
    const response = await api.json();
    console.log(response);
    registerBtn.removeAttribute('disabled');
    return response;
  } catch (err) {
    registerBtn.removeAttribute('disabled');
    console.log(err);
  }
}

function validateInputs(input) {
  let regex = {
    name: /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^[A-Z][a-z0-9]{8,}$/,
    phone: /^01[0125][0-9]{8}$/
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

function confirmPass(pass, rePass) {
  if (pass.value === rePass.value) {
    pass.classList.add('is-valid');
    pass.classList.remove('is-invalid');
    rePass.classList.add('is-valid');
    rePass.classList.remove('is-invalid');
    return true
  } else {
    pass.classList.add('is-invalid');
    pass.classList.remove('is-valid');
    rePass.classList.add('is-invalid');
    rePass.classList.remove('is-valid');
    return false;
  }
}