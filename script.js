const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const newTodoInput = document.querySelector("#todo");
const todoForm = document.querySelector("#todo-form");
const todoSearchInput = document.querySelector("#filter");
const todoList = document.querySelector(".list-group");
const clearButton = document.querySelector("#clear-todos");

lifeCycle();

function lifeCycle() {
  todoForm.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadTodoListToUI);
  todoList.addEventListener("click", deleteTodo);
  todoSearchInput.addEventListener("keyup", search);
  clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos() {
  console.log(todoList.firstElementChild);

  while (todoList.firstElementChild !== null) {
    todoList.firstElementChild.remove();
  }

  localStorage.removeItem("todos");
}

function search(e) {
  const filterText = e.target.value.toLowerCase();
  const todoItems = document.querySelectorAll(".list-group-item");

  todoItems.forEach((element) => {
    if (element.textContent.toLowerCase().indexOf(filterText) === -1) {
      element.setAttribute("style", "display: none !important");
    } else {
      element.setAttribute("style", "display: block");
    }
  });
}

function deleteTodoFromStorage(deletedItem) {
  let todos = getTodosFromStorage();

  todos.forEach((todo, index) => {
    if (todo === deletedItem) {
      todos.splice(index, 1);
    }
  });

  if (todos.length > 0) {
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    localStorage.removeItem("todos");
  }
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    const deletedItem = e.target.parentElement.parentElement;
    deleteTodoFromStorage(deletedItem.textContent);
    deletedItem.remove();
    e.preventDefault();
  }
}

function loadTodoListToUI() {
  const todos = getTodosFromStorage();

  todos.forEach((element) => {
    addTodoToUI(element);
  });
}

function addTodo(e) {
  const addedTodo = newTodoInput.value.trim();

  if (addedTodo === "") {
    showAlert("danger", "Bir Todo daxil edin");
  } else {
    addTodoToUI(addedTodo);
    addTodoToStorage(addedTodo);
    showAlert("success", "Todo əlavə edildi");
    newTodoInput.value = "";
  }

  e.preventDefault();
}

function getTodosFromStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function addTodoToStorage(addedTodo) {
  const todos = getTodosFromStorage();
  todos.push(addedTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToUI(addedTodo) {
  const todoItem = document.createElement("li");
  todoItem.className = "list-group-item d-flex justify-content-between";
  todoItem.appendChild(document.createTextNode(addedTodo));

  const link = document.createElement("a");
  link.href = "";
  link.className = "delete-item";
  link.innerHTML = "<i class='fa fa-remove'></i>";

  todoItem.appendChild(link);
  todoList.appendChild(todoItem);
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  todoForm.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 2000);
}
