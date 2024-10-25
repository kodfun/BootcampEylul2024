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
            <div class="row mb-3 border border-secondary rounded py-3 px-1 mx-0 bg-primary-subtle">

                <div class="col-auto">
                    <input type="checkbox" class="form-check-input" ${todo.done ? "checked" : ""}>
                </div>
                <div class="col ps-0 d-flex align-items-center lead">
                    ${todo.title}
                </div>

            </div>
        `;
    }
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