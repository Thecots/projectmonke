const img = ['/img/muscles/antebrazo.png', '/img/muscles/bicep.png', '/img/muscles/tricep.png', '/img/muscles/hombro.png', '/img/muscles/pecho.png', '/img/muscles/trapecio.png', '/img/muscles/espalda.png', '/img/muscles/core.png', '/img/muscles/gluteo.png', '/img/muscles/quadricep.png', '/img/muscles/pantorrillas.png'];
const muscles = ['Antebrazo', 'Bicep', 'Tricep', 'Hombro', 'Pecho', 'Trapecio', 'Espalda', 'Core', 'Gluteo', 'Quadricep', 'Pantorrillas'];
const sensaciones = [['Muy cansado', 'cansado', 'Normal', 'Bien', 'Muy bien'], ['Muy desmotivado', 'Desmotivado', 'Normal', 'Motivado', 'Muy motivado'], ['Muy insatisfecho', 'Insatisfecho', 'Normal', 'Satisfecho', 'Muy satisfecho']]
const img2 = ['muycansado', 'cansado', 'normal', 'bien', 'muybien'];
let info = info2 = [];

const form1 = document.querySelector('section:nth-child(1) form');

/* form 1 */
form1.addEventListener('submit', (e) => {
  e.preventDefault();
  let x = 0;
  for (let i = 0; i < form1.length; i++) {
    if (form1[i].value > 0) {
      x += parseInt(form1[i].value)
    }
  }
  if (x === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Completa al menos 1 campo',
    })
  } else {
    document.querySelector('section:nth-child(1)').style.margin = "0 0 0 -100%"
    setTimeout(() => { window.scrollTo(0, 0); }, 400)
  }
})

/* button go back*/
document.querySelector('section:nth-child(2) #goback').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('section:nth-child(1)').style.margin = "0 0 0 -0%"
  setTimeout(() => { window.scrollTo(0, 0); }, 400)
})

const form2 = { cansancio: 0, motivacion: 0, satisfacion: 0 }
/* form 2 cansancio */
function cansancio(a) {
  for (let i = 1; i <= 5; i++) {
    document.querySelector(`section:nth-child(2) form div:nth-child(2) div span:nth-child(${i})`).classList.remove('active');
  }
  document.querySelector(`section:nth-child(2) form div:nth-child(2) div span:nth-child(${a})`).classList.add('active');
  form2.cansancio = a;
}

/* form2 motivacion*/
function motivacion(a) {
  for (let i = 1; i <= 5; i++) {
    document.querySelector(`section:nth-child(2) form div:nth-child(3) div span:nth-child(${i})`).classList.remove('active');
  }
  document.querySelector(`section:nth-child(2) form div:nth-child(3) div span:nth-child(${a})`).classList.add('active');
  form2.motivacion = a;
}

/* form2 motivacion*/
function satisfacion(a) {
  for (let i = 1; i <= 5; i++) {
    document.querySelector(`section:nth-child(2) form div:nth-child(4) div span:nth-child(${i})`).classList.remove('active');
  }
  document.querySelector(`section:nth-child(2) form div:nth-child(4) div span:nth-child(${a})`).classList.add('active');
  form2.satisfacion = a;
}

/* button go next 2*/

document.querySelector('section:nth-child(2) form').addEventListener('submit', (e) => {
  e.preventDefault();

  if (form2.cansancio == 0 || form2.motivacion == 0 || form2.satisfacion == 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Completa todos los campos',
    })
  } else {
    info = [];
    info2 = [];
    let template = '';
    for (let i = 0; i < form1.length; i++) {
      if (form1[i].value > 0) {
        info.push({
          id: i,
          series: form1[i].value,
          img: img[i],
          percent: 0
        });
      }
    }
    let seriesSum = info.reduce((a, b) => a + (parseInt(b.series) || 0), 0)
    info.forEach((n, i) => {
      info[i].percent = Math.round((n.series * 100) / seriesSum);
    })

    info2.push({ title: 'Cansancio', id: form2.cansancio });
    info2.push({ title: 'Motivación', id: form2.motivacion });
    info2.push({ title: 'Satisfación', id: form2.satisfacion });

    /* Mounting interface */
    template = '';
    info.forEach(n => {
      template += `
      <span><img src="${img[n.id]}" alt="">
      <h1>${muscles[n.id]}</h1>
      <p>${n.percent}%</p>
      </span>
    `;
    });

    let j = '';
    info2.forEach((n, i) => {
      j += `
      <div>
        <h1>${n.title}</h1>
        <span>
          <img src="/img/states/${img2[n.id - 1]}.png">
          <p>${sensaciones[i][n.id - 1]}</p>
        </span>
      </div>
      `;

    })

    document.querySelector('.interface').innerHTML = `<form><h1>Series</h1><div>${template}</div></form>`;
    document.querySelector('.interface2').innerHTML = `<h1>Sensaciones</h1><div>${j}</div>`;

    document.querySelector('section:nth-child(1)').style.margin = "0 0 0 -200%"
    setTimeout(() => { window.scrollTo(0, 0); }, 400)
  }
})

/* 3 */

/* button go back 2*/
document.querySelector('section:nth-child(3) button:nth-child(1)').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('section:nth-child(1)').style.margin = "0 0 0 -100%"
  setTimeout(() => { window.scrollTo(0, 0); }, 400)
})

/* button finish*/
document.querySelector('section:nth-child(3) button:nth-child(2)').addEventListener('click', (e) => {
  e.preventDefault();
  console.log({ info });
  console.log({ info2 });
})