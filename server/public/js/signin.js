const form = document.querySelector('form');
const spanError = document.querySelector('#sessionError'), spanErrorUsername = document.querySelector('#sessionErrorUsername'), usernameInput = document.getElementById("username"), passwordInput = document.getElementById("password"), confirmInput = document.getElementById("confirm"), AlertIcon = '<svg aria-hidden="true" class="stUf5b LxE1Id" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>'

/* ---- toggle on/off error text ---- */
function error(type, e, t) {
  if (type == "password" && e == true) {
    spanError.innerHTML = AlertIcon + t;
    spanError.style.display = "flex";
  } else if (e == false) {
    spanError.style.display = "none";
  }
  if (type == "username" && e == true) {
    spanErrorUsername.innerHTML = AlertIcon + t;
    spanErrorUsername.style.display = "flex";
  } else if (e == false) {
    spanErrorUsername.style.display = "none";
  }
}

/* ---- remove all errors text ---- */
function restartErrors() {
  usernameInput.classList.remove('error');
  passwordInput.classList.remove('error');
  try {
    confirmInput.classList.remove('error');
  } catch (error) { }
  error("username", false);
  error("password", false);
}



form.addEventListener('submit', (e) => {
  e.preventDefault();

  var urlencoded = new URLSearchParams();
  urlencoded.append("username", document.querySelector('#username > input').value);
  urlencoded.append("password", document.querySelector('#password > input').value);
  var requestOptions = {
    method: 'POST',
    body: urlencoded,
  };

  fetch("/login", requestOptions)
    .then(response => response.text())
    .then(result => {
      res = JSON.parse(result);
      if (res.ok) {
        document.cookie = `session=${res.token}; expires=${9999999}; path=/`;
        window.location.href = "/home"
      } else {
        error("password", true, 'Usuario o contraseña incorrectos');
        passwordInput.classList.add('error');
        usernameInput.classList.add('error');
      }
    })
    .catch(error => {
      error("password", true, 'Error en el servidor');
      passwordInput.classList.add('error');
      usernameInput.classList.add('error');
    });
})