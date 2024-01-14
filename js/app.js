const nameTask = document.getElementById("name-todo");
const dateTask = document.getElementById("date-todo");
const addTask = document.getElementById("add-todo");
const alertMsg = document.getElementById("alert-message");
const todos = [];

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

const addHandler = () => {
  const nameTodo = nameTask.value;
  const dateTodo = dateTask.value;
  const todo = {
    task: nameTodo,
    date: dateTodo,
    completed: false,
  };
  if (nameTodo) {
    todos.push(todo);
    nameTask.value = "";
    dateTask.value = "";
    console.log(todos);
    showAlert("Todo added successfully", "success");
  } else {
    showAlert("please enter a todo !", "error");
  }
};

addTask.addEventListener("click", addHandler);
