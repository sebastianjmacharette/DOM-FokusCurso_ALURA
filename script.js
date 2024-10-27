const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
let botonIniciarPausar = document.querySelector('#start-pause');
let idIntervalo = null;
const tiempoEnPantalla = document.querySelector('#timer') 



const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');
const cambiarIcono = document.querySelector('.app__card-primary-button-icon'); // Verifica el selector aquí
let tiemporTranscurridoEnSegundos = 1500;
musica.loop = true;

inputEnfoqueMusica.addEventListener('change', () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

botonCorto.addEventListener('click', () => {
  tiemporTranscurridoEnSegundos = 300;
  cambiarContexto('descanso-corto');
  botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click', () => {
  tiemporTranscurridoEnSegundos = 1500;

  cambiarContexto('enfoque');
  botonEnfoque.classList.add('active');
});

botonLargo.addEventListener('click', () => {
  tiemporTranscurridoEnSegundos = 900;

  cambiarContexto('descanso-largo');
  botonLargo.classList.add('active');
});

function cambiarContexto(contexto) {
  mostrarTiempo()
  botones.forEach((boton) => {
    boton.classList.remove('active');
  });

  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src', `./imagenes/${contexto}.png`);
  
  switch (contexto) {
    case 'enfoque':
      titulo.innerHTML = `Optimiza tu productividad,<br><strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
      break;
    case 'descanso-corto':
      titulo.innerHTML = `Qué tal, tomar un respiro,<br><strong class="app__title-strong">Haz una pausa corta.</strong>`;
      break;
    case 'descanso-largo':
      titulo.innerHTML = `Estás listo para trabajar,<br><strong class="app__title-strong">Mantén una fuerza positiva.</strong>`;
      break;
  }
}

const cuentaRegresiva = () => {
  if (tiemporTranscurridoEnSegundos <= 0) {
    audioTiempoFinalizado.play();
    alert('Tiempo finalizado');
    reiniciar(); // Reinicia el temporizador y cambia el icono a "play"
    return;
  }
  
  botonIniciarPausar.textContent = "Pausar";
  tiemporTranscurridoEnSegundos -= 1;
  mostrarTiempo();
};

function reiniciar() {
  botonIniciarPausar.textContent = 'Comenzar';
  
  if (cambiarIcono) {
    cambiarIcono.src = './imagenes/play_arrow.png'; // Cambia al ícono de "play"
  } else {
    console.error('Elemento cambiarIcono no encontrado');
  }
  
  clearInterval(idIntervalo);
  idIntervalo = null;
  tiemporTranscurridoEnSegundos = 5; // Reinicia el tiempo aquí si es necesario
}

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
  if (idIntervalo) {
    audioPausa.play();
    
    if (cambiarIcono) {
      cambiarIcono.src = './imagenes/pause.png'; // Cambia al ícono de "play" al pausar
    } else {
      console.error('Elemento cambiarIcono no encontrado');
    }

    reiniciar();
    return;
  }

  audioPlay.play();
  
  if (cambiarIcono) {
    cambiarIcono.src = './imagenes/pause.png'; // Cambia al ícono de "pausa" al iniciar
  } else {
    console.error('Elemento cambiarIcono no encontrado');
  }

  botonIniciarPausar.textContent = "Pausar";
  idIntervalo = setInterval(cuentaRegresiva, 1000);
}

function mostrarTiempo(){
  const tiempo = new Date(tiemporTranscurridoEnSegundos * 1000) 
  const tiempoFormateado = tiempo.toLocaleString('es-AR', {minute:'2-digit', second: '2-digit'})
  tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()