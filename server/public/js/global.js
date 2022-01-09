/* close session */
const singout = () => {
  document.cookie = "session=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;"
  window.location.reload();
};