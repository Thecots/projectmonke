document.querySelector('section:nth-child(1) form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('section:nth-child(1)').classList.toggle('moveLeft');
  setTimeout(() => { window.scrollTo(0, 0); }, 400)
})

document.querySelector('section:nth-child(2) button').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('section:nth-child(1)').classList.toggle('moveLeft');
  setTimeout(() => { window.scrollTo(0, 0); }, 400)

})