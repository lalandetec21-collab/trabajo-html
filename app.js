//referencias del dom
const inputTarea = document.getElementById('InputTarea');
const btnAgregar = document.getElementById('btnAgregar');
const listaTareas = document.getElementById('listaTareas');

//funcion para agregar tarea
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

const guardarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

const renderTareas = () => {
    listaTareas.innerHTML = '';

    tareas.forEach(({ id, texto, completar }) => {
        const li = document.createElement('li');
        li.textContent = texto;
        li.style.textDecoration = completar ? 'line-through' : 'none';

        li.addEventListener('click', () => {
            toggleTarea(id);
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', (e) => {
            e.stopPropagation();
            eliminarTarea(id);
        });

        li.appendChild(btnEliminar);
        listaTareas.appendChild(li);
    });
};

const agregarTarea = () => {
    const texto = inputTarea.value.trim();
    if (!texto) return;

    const nuevaTarea = {
        id: Date.now(),
        texto,
        completar: false,
    };

    tareas.push(nuevaTarea);
    guardarTareas();
    renderTareas();

    inputTarea.value = '';
};

const toggleTarea = (id) => {
    tareas = tareas.map((t) =>
        t.id === id ? { ...t, completar: !t.completar } : t
    );
    guardarTareas();
    renderTareas();
};

const eliminarTarea = (id) => {
    tareas = tareas.filter((t) => t.id !== id);
    guardarTareas();
    renderTareas();
};

btnAgregar.addEventListener('click', agregarTarea);

renderTareas();
