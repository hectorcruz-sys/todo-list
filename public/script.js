const tareaInput = document.getElementById('tarea');
const botonAgregar = document.getElementById('agregar');
const listaTareas = document.getElementById('lista-tareas');

// Agregar tarea
botonAgregar.addEventListener('click', () => {
  agregarTarea();
});

// Cargar tareas guardadas
window.addEventListener('load', cargarTareas);

// Función agregar tarea
function agregarTarea(textoGuardado = null, completada = false){

  const texto = textoGuardado !== null
    ? textoGuardado
    : tareaInput.value.trim();

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

  // Completar tarea
  li.querySelector('.completar').addEventListener('click', () => {
    li.classList.toggle('completada');
    guardarTareas();
  });

  // Eliminar tarea
  li.querySelector('.eliminar').addEventListener('click', () => {
    li.remove();
    guardarTareas();
  });

  listaTareas.appendChild(li);

  tareaInput.value = '';

  guardarTareas();
}

// Guardar tareas
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