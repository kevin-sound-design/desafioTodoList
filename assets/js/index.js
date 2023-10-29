// ---------------- Tipos de referencia ----------------
/**
 * @typedef {Object} Task
 * @property {number} id - El ID de la tarea.
 * @property {string} name - Nombre de la tarea
 * @property {boolean} isfinished - Indica si la tarea esta finalizada
 */

// ---------------- Tipos de referencia ----------------

/**
 * @type {Array<Task>} 
 */
const taskList = [
    {
        id: 16,
        name: "Hacer mercado",
        isfinished: true
    },
    {
        id: 60,
        name: "Estudiar para la prueba",
        isfinished: false
    },
    {
        id: 24,
        name: "Sacar a pasear a Tobby",
        isfinished: false
    },
];

const span_totalTask = document.getElementById("totalTask");
const span_finishedTask = document.getElementById("finishedTask");
const formAddTask = document.getElementById("AddTask");

formAddTask.addEventListener("submit", newTask);

let id = 0;
let finished_task_count = 0;
let total_task = 0;

init();


/**
 * Agrega los tareas iniciales a la tabla
 */
function init() {
    taskList.forEach(e => {
        addToTable(e);
    });
}


/**
 * Recibe la tarea ingresada en el form para crear una tarea
 * @param {Event} e 
 */
function newTask(e) {
    e.preventDefault();

    const form = new FormData(formAddTask);
    const taskName = form.get("tarea");

    const newTask = {
        id: idValidator(),
        name: taskName,
        isfinished: false
    }

    taskList.push(newTask);
    addToTable(newTask);
    id++;
}

/**
 * 
 * @returns {number} devuelve un id valido si es posible si no devuelve -1
 */
function idValidator() {
    const idExisting = []

    for (let i = 0; i < taskList.length; i++) {
        idExisting.push(taskList[i].id);
    }

    let maxValue = 0;
    let validId = -1;
    idExisting.forEach((e) => {
        if (e > maxValue) {
            maxValue = e;
        }
    })

    for (let i = 0; i <= maxValue; i++) {
        if (!idExisting.includes(id)) {
            validId = id;
            break;
        } else {
            id++;
        }
    }

    return validId;
}


/**
 * Actualiza la informacion de las tareas en pantalla 
 */
function updateUIInfo() {
    total_task = taskList.length;
    finished_task_count = 0;

    for (let i = 0; i < taskList.length; i++) {
        const current_task = taskList[i];

        if (current_task.isfinished === true) {
            finished_task_count++;
        }
    }

    span_totalTask.textContent = total_task;
    span_finishedTask.textContent = finished_task_count;
}

/**
 * Elimina una tarea segun el id existente en la fila en el primer elemento \<td\>
 * @param {Event} e 
 */
function deleteTask(e) {
    const tr = e.target.parentElement.parentElement;
    const id_task = tr.childNodes[0].outerText;

    for (let i = 0; i < taskList.length; i++) {
        const current_task = taskList[i];

        if (current_task.id == id_task) {
            taskList.splice(i, 1);
            tr.remove();
        }
    }
    updateUIInfo();
}


/**
 * cambia el estado isFinished del elemento seleccionado en la tabla a traves del input tipo checkbox
 * @param {Event} e 
 */
function setIsFinished(e) {
    const tr = e.target.parentElement.parentElement;
    const id_task = tr.childNodes[0].outerText;

    for (let i = 0; i < taskList.length; i++) {
        const current_task = taskList[i];

        if (current_task.id == id_task) {
            current_task.isfinished = !current_task.isfinished;

            if (current_task.isfinished === true) {
                tr.classList.add("finished");
            } else {
                if (tr.classList.contains("finished")) {
                    tr.classList.remove("finished");
                }
            }
        }
    }
    updateUIInfo();
}

/**
 * crea una fila para la tabla con los datos de la tarea proporcionada por newTask(e)
 * y la agrega a la tabla
 * @param {Task} task
 */
function addToTable(task) {
    const tr = document.createElement("tr");
    const td_id = document.createElement("td");
    const td_name = document.createElement("td");
    const input_check = document.createElement("input");
    const input_button = document.createElement("input");
    const td_check = document.createElement("td");
    const td_button = document.createElement("td");


    td_id.textContent = task.id;
    td_name.textContent = task.name;
    input_check.type = "checkbox";
    input_check.checked = task.isfinished;
    input_button.type = "button";
    input_button.className = "inputButton";
    input_button.value = "❌";

    if (task.isfinished === true) {
        tr.classList.add("finished");
    } else {
        if (tr.classList.contains("finished")) {
            tr.classList.remove("finished");
        }
    }

    tr.appendChild(td_id);
    tr.appendChild(td_name);

    td_check.appendChild(input_check); // se agrega el elemento input al td
    tr.appendChild(td_check); // se agrega el td al elemento tr

    td_button.appendChild(input_button); // se agrega el elemento input al td
    tr.appendChild(td_button); // se agrega el td al elemento tr

    // agregar eventos a los elementos
    input_check.addEventListener("change", setIsFinished);
    input_button.addEventListener("click", deleteTask);

    const tabla = document.getElementById("taskTable");

    tabla.appendChild(tr);
    updateUIInfo();
}