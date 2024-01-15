const nameTask = document.getElementById("name-todo");
const dateTask = document.getElementById("date-todo");
const addTask = document.getElementById("add-todo");
const alertMsg = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-btn");

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
  const updateStatus = todos.find((todo) => todo.id === id);
  updateStatus.completed = !updateStatus.completed;
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

window.addEventListener("load", displayTodos);
addTask.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
