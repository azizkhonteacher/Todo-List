const fromCreate = document.getElementById("form-create");
const fromEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById("message-create");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeEl = document.getElementById("close");

/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

let editItemId;

// check
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) showTodos();

// time
function getTime() {
  const now = new Date();

  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();
  // time
  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const month_title = now.getMonth();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  fullDay.textContent = `${date} ${months[month_title]}, ${year}`;
  hourEl.textContent = hour;
  minuteEl.textContent = minute;
  secondEl.textContent = second;
  return `${hour}:${minute}, ${date}.${month}.${year}`;
}
setInterval(() => getTime());

// setTodos to LocalStorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

// show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));

  listGroupTodo.innerHTML = "";

  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
    <li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between ${
      item.complated == true ? "complated" : ""
    }">
          ${item.text}
          <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onclick=(editTodo(${i})) src="img/edit.svg" alt="edit icon" width="25" height="25">
            <img onclick=(deleteTodo(${i})) src="img/delete.svg" alt="delete icon" width="25" height="25">
          </div>
        </li>
    `;
  });
}

// show error
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;

  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

// get Todos
fromCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = fromCreate["input-create"].value.trim();
  fromCreate.reset();

  if (todoText.length) {
    todos.push({ text: todoText, time: getTime(), complated: false });

    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please, enter some text ...");
  }
});

// deleteTodo
function deleteTodo(id) {
  const deletedTodos = todos.filter((item, i) => {
    return i !== id;
  });

  todos = deletedTodos;
  setTodos();
  showTodos();
}

// setCompleted

function setCompleted(id) {
  const complatedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, complated: item.complated == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = complatedTodos;
  setTodos();
  showTodos();
}

// edit Form
fromEdit.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = fromEdit["input-edit"].value.trim();
  fromEdit.reset();

  if (todoText.length) {
    todos.splice(editItemId, 1, {
      text: todoText,
      time: getTime(),
      complated: false,
    });

    setTodos();
    showTodos();
    close();
  } else {
    showMessage("message-edit", "Please, enter some text ...");
  }
});

// editTodo
function editTodo(id) {
  open();
  editItemId = id;
}

overlay.addEventListener("click", () => close());
closeEl.addEventListener("click", () => close());

document.addEventListener('keydown', (e)=>{
  if(e.code == "Escape"){
    close()
  }
})

function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
