const tareaInput = document.getElementById('tarea');
const botonAgregar = document.getElementById('agregar');
const listaTareas = document.getElementById('lista-tareas');

// Crear botón modo oscuro
const botonModo = document.createElement('button');
botonModo.textContent = '🌙 Modo Oscuro';
document.body.prepend(botonModo);

// Cambiar modo oscuro
botonModo.addEventListener('click', () => {
  document.body.classList.toggle('oscuro');
});

// Cargar tareas guardadas
window.addEventListener('load', cargarTareas);

// Agregar tarea
botonAgregar.addEventListener('click', agregarTarea);

function agregarTarea(textoGuardado = null, completada = false){

  const texto = textoGuardado || tareaInput.value.trim();

  if(texto === '') return;

  const li = document.createElement('li');

  if(completada){
    li.classList.add('completada');
  }

  li.innerHTML = `
    <span>${texto}</span>

    <div>
      <button class="completar">✔</button>
      <button class="eliminar">X</button>
    </div>
  `;

  // Botón completar
  li.querySelector('.completar').addEventListener('click', () => {
    li.classList.toggle('completada');
    guardarTareas();
  });

  // Botón eliminar
  li.querySelector('.eliminar').addEventListener('click', () => {
    li.remove();
    guardarTareas();
  });

  listaTareas.appendChild(li);

  tareaInput.value = '';

  guardarTareas();
}

// Guardar en localStorage
function guardarTareas(){

  const tareas = [];

  document.querySelectorAll('li').forEach(li => {

    tareas.push({
      texto: li.querySelector('span').textContent,
      completada: li.classList.contains('completada')
    });

  });

  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Cargar tareas
function cargarTareas(){

  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

  tareas.forEach(tarea => {
    agregarTarea(tarea.texto, tarea.completada);
  });
}