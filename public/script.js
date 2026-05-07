const tareaInput = document.getElementById('tarea');
const botonAgregar = document.getElementById('agregar');
const listaTareas = document.getElementById('lista-tareas');
const botonModo = document.getElementById('modoOscuro');
const frase = document.getElementById('frase');

const musica = document.getElementById('musica');
const musicaBtn = document.getElementById('musicaBtn');

// FRASES

const frases = [

  "Pequeños avances siguen siendo avances 🚀",

  "No tienes que ser perfecto, solo constante 💪",

  "Tu futuro se construye hoy ✨",

  "Cada tarea terminada es progreso 🔥",

  "Sigue adelante aunque sea poco a poco 😎",

  "La disciplina vence a la motivación 📚"

];

// Frase aleatoria
const fraseAleatoria =
  frases[Math.floor(Math.random() * frases.length)];

frase.textContent = fraseAleatoria;

// MODO OSCURO

botonModo.addEventListener('click', () => {

  document.body.classList.toggle('oscuro');

});

// MÚSICA

let reproduciendo = false;

musicaBtn.addEventListener('click', () => {

  if(!reproduciendo){

    musica.play();

    musicaBtn.textContent = '⏸ Pausar Música';

    reproduciendo = true;

  }else{

    musica.pause();

    musicaBtn.textContent = '🎵 Música';

    reproduciendo = false;
  }

});

// AGREGAR TAREA

botonAgregar.addEventListener('click', () => {

  agregarTarea();

});

// CARGAR TAREAS

window.addEventListener('load', cargarTareas);

// FUNCIÓN AGREGAR

function agregarTarea(textoGuardado = null, completada = false, fechaGuardada = null){

  const texto = textoGuardado !== null
    ? textoGuardado
    : tareaInput.value.trim();

  if(texto === '') return;

  const fecha = fechaGuardada || new Date().toLocaleString();

  const li = document.createElement('li');

  if(completada){

    li.classList.add('completada');
  }

  li.innerHTML = `
    <div>

      <span>${texto}</span>

      <br>

      <small>${fecha}</small>

    </div>

    <div>
      <button class="completar">✔</button>
      <button class="eliminar">X</button>
    </div>
  `;

  // Completar

  li.querySelector('.completar').addEventListener('click', () => {

    li.classList.toggle('completada');

    guardarTareas();
  });

  // Eliminar

  li.querySelector('.eliminar').addEventListener('click', () => {

    li.remove();

    guardarTareas();
  });

  listaTareas.appendChild(li);

  tareaInput.value = '';

  guardarTareas();
}

// GUARDAR TAREAS

function guardarTareas(){

  const tareas = [];

  document.querySelectorAll('li').forEach(li => {

    tareas.push({

      texto: li.querySelector('span').textContent,

      fecha: li.querySelector('small').textContent,

      completada: li.classList.contains('completada')

    });

  });

  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// CARGAR TAREAS

function cargarTareas(){

  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

  tareas.forEach(tarea => {

    agregarTarea(
      tarea.texto,
      tarea.completada,
      tarea.fecha
    );

  });
}