const taskInput = document.getElementById("name-todo");
const dateInput = document.getElementById("date-todo");
const addBtn = document.getElementById("add-todo");
const editBtn = document.getElementById("edit-todo");
const alertMsg = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-btn");
const filterButtons = document.querySelectorAll(".filter-todo");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

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

const displayTodos = (data) => {
  const todoList = data || todos;
  todosBody.innerHTML = "";

  if (!todoList.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No task found!</td></tr>";
    return;
  }

  todoList.forEach((todo) => {
    todosBody.innerHTML += `
    <tr>
      <td>${todo.task}</td>
      <td>${todo.date || "No Date"}</td>
      <td>${todo.completed ? "Completed" : "Pending"}</td>
      <td>
        <button onclick="editHandler('${todo.id}')">Edit</button>
        <button onclick="toggleHandler('${todo.id}')">
          ${todo.completed ? "Undo" : "Do"}      
        </button>
        <button onclick="deleteHandler('${todo.id}')">Delete</button>
      </td>
    </tr>
    `;
  });
};

const addHandler = () => {
  const nameTodo = taskInput.value;
  const dateTodo = dateInput.value;

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
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Todo added successfully", "success");
  } else {
    showAlert("please enter a todo !", "error");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    // localStorage.clear();
    displayTodos();
    showAlert("All todos cleared successfully", "success");
  } else {
    showAlert("No todos to clear", "error");
  }
};

const deleteHandler = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo deleted successfully", "success");
};

const toggleHandler = (id) => {
  //cleanCode
  const getTodo = todos.find((todo) => todo.id === id);
  getTodo.completed = !getTodo.completed;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo status changed successfully", "success");

  // const updateStatus = todos.map((todo) => {
  //   if (todo.id === id) {
  //     return { ...todo, completed: !todo.completed };
  //     // return {
  //     //   id: todo.id,
  //     //   task: todo.task,
  //     //   date: todo.date,
  //     //   completed: !todo.completed,
  //     // };
  //   } else {
  //     return todo;
  //   }
  // });
  // todos = updateStatus;
};

const editHandler = (id) => {
  const getTodo = todos.find((todo) => todo.id === id);
  taskInput.value = getTodo.task;
  dateInput.value = getTodo.date;
  addBtn.style.display = "none";
  editBtn.style.display = "inline-block";
  editBtn.dataset.id = id;
};

const applyEditHandler = (event) => {
  const id = event.target.dataset.id;
  const getTodo = todos.find((todo) => todo.id === id);

  getTodo.task = taskInput.value;
  getTodo.date = dateInput.value;
  taskInput.value = "";
  dateInput.value = "";
  addBtn.style.display = "inline-block";
  editBtn.style.display = "none";
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo edited successfully", "success");
};

const filterHandler = (event) => {
  let filteredTodos = null;
  const filter = event.target.dataset.filter;

  switch (filter) {
    case "pending":
      filteredTodos = todos.filter((todo) => todo.completed === false);
      break;
    case "completed":
      filteredTodos = todos.filter((todo) => todo.completed === true);
      break;
    default:
      filteredTodos = todos;
      break;
  }
  displayTodos(filteredTodos);
};

window.addEventListener("load", () => displayTodos());
addBtn.addEventListener("click", addHandler);
editBtn.addEventListener("click", applyEditHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
filterButtons.forEach((button) => {
  button.addEventListener("click", filterHandler);
});
