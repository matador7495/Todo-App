const nameTask = document.getElementById("name-todo");
const dateTask = document.getElementById("date-todo");
const addTask = document.getElementById("add-todo");
const alertMsg = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");


const todos = JSON.parse(localStorage.getItem("todos")) || [];

const generateId = () => {
  return Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString();
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const showAlert = (message, type) => {
  alertMsg.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMsg.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const displayTodos = () => {
  todosBody.innerHTML = "";
  if (!todos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No task found!</td></tr>";
    return;
  }
  todos.forEach((todo) => {
    todosBody.innerHTML += `
    <tr>
      <td>${todo.task}</td>
      <td>${todo.date || "No Date"}</td>
      <td>${todo.completed ? "Completed" : "Pending"}</td>
      <td>
        <button>Edit</button>
        <button>Do</button>
        <button>Delete</button>
      </td>    
    </tr>
    `;
  });
};

const addHandler = () => {
  const nameTodo = nameTask.value;
  const dateTodo = dateTask.value;
  const todo = {
    id: generateId(),
    task: nameTodo,
    date: dateTodo,
    completed: false,
  };
  if (nameTodo) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    nameTask.value = "";
    dateTask.value = "";
    showAlert("Todo added successfully", "success");
  } else {
    showAlert("please enter a todo !", "error");
  }
};

window.addEventListener("load", displayTodos);
addTask.addEventListener("click", addHandler);
