//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listners

getTodos();
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
  //Prevent to reload
  event.preventDefault();

  //Create todoDiv
  const todoDiv = document.createElement("div")
  todoDiv.classList.add("todo");
  //Create lI
  const newTodo = document.createElement("li")
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);

  //ADD todo to LOCALSTORAGE
  saveLocalTodos(todoInput.value);

  //CHECK-MARK Button
  const completedButton = document.createElement("button")
  completedButton.classList.add("complete-btn");
  completedButton.innerHTML = '<i class = "fas fa-check"></i>';
  todoDiv.appendChild(completedButton);
  //TRASH Button
  const trashButton = document.createElement("button")
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);

  //Attach DIV to main todo
  todoList.appendChild(todoDiv);

  //Clear INPUT value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //DELETE todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //ANIMATION
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK-MARK todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //CHECK - for todos

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todoDiv
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo");
    //Create lI
    const newTodo = document.createElement("li")
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    //CHECK-MARK Button
    const completedButton = document.createElement("button")
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    todoDiv.appendChild(completedButton);
    //TRASH Button
    const trashButton = document.createElement("button")
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //Attach DIV to main todo
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}