let todos = [
    {
        title: "Projeyi tamamla",
        done: false
    },
    {
        title: "Yürüyüş yap",
        done: false
    },
    {
        title: "Faturaları öde",
        done: true
    },
    {
        title: "Vitaminlerini al",
        done: true
    }
];

// EĞER KAYITLI TODOS VARSA ONU
if (localStorage["data"])
    todos = JSON.parse(localStorage["data"]);

const divTodos = document.getElementById("todos");
const frmTask = document.getElementById("frmTask");
const txtTask = document.getElementById("task");

function displayTodos() {
    divTodos.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];

        divTodos.innerHTML += `
            <div class="row mb-3 border border-secondary rounded py-3 px-1 mx-0 bg-primary-subtle ${todo.done ? "done" : "undone"}">

                <div class="col-auto">
                    <input type="checkbox" class="form-check-input" ${todo.done ? "checked" : ""} onchange="toggleItem(${i})">
                </div>
                <div class="col ps-0 d-flex align-items-center lead todo-title">
                    ${todo.title}
                </div>
                <div class="col-auto">
                    <button class="btn btn-danger px-3" onclick="deleteItem(${i})">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

            </div>
        `;
    }
}

function toggleItem(index) {
    const item = todos[index];
    item.done = !item.done;
    sortAndSave();
    displayTodos();
}

function deleteItem(index) {
    todos.splice(index, 1);
    sortAndSave();
    displayTodos();
}

function addTask() {
    const newTask = {
        title: txtTask.value,
        done: false
    };
    todos.push(newTask);
    sortAndSave();
    displayTodos();
    txtTask.value = "";
}

function sortAndSave() {
    todos.sort((a, b) => a.done - b.done);
    let json = JSON.stringify(todos);
    localStorage["data"] = json;
}

// EVENTS
frmTask.onsubmit = function(event) {
    event.preventDefault();
    addTask();
};

displayTodos();