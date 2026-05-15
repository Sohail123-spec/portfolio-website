const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// SAVE TO LOCAL STORAGE

function saveTasks(){

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}


// RENDER TASKS

function renderTasks(){

  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(task => {

    if(currentFilter === "active"){
      return !task.completed;
    }

    if(currentFilter === "completed"){
      return task.completed;
    }

    return true;

  });


  filteredTasks.forEach(task => {

    const li = document.createElement("li");

    if(task.completed){
      li.classList.add("completed");
    }

    li.innerHTML = `

      <span>${task.text}</span>

      <div class="task-buttons">

        <button class="complete-btn" data-id="${task.id}">
          ✓
        </button>

        <button class="edit-btn" data-id="${task.id}">
          Edit
        </button>

        <button class="delete-btn" data-id="${task.id}">
          Delete
        </button>

      </div>

    `;

    taskList.appendChild(li);

  });

}


// ADD TASK

addTaskBtn.addEventListener("click", () => {

  const text = taskInput.value.trim();

  if(text === "") return;

  const newTask = {

    id: Date.now(),

    text,

    completed:false

  };

  tasks.push(newTask);

  saveTasks();

  renderTasks();

  taskInput.value = "";

});


// EVENT DELEGATION

taskList.addEventListener("click", (e) => {

  const id = Number(e.target.dataset.id);

  // DELETE

  if(e.target.classList.contains("delete-btn")){

    tasks = tasks.filter(task => task.id !== id);

  }

  // COMPLETE

  if(e.target.classList.contains("complete-btn")){

    tasks = tasks.map(task => {

      if(task.id === id){

        task.completed = !task.completed;

      }

      return task;

    });

  }

  // EDIT

  if(e.target.classList.contains("edit-btn")){

    const task = tasks.find(task => task.id === id);

    const updatedText = prompt(
      "Edit Task",
      task.text
    );

    if(updatedText !== null){

      task.text = updatedText;

    }

  }

  saveTasks();

  renderTasks();

});


// FILTER BUTTONS

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    currentFilter = button.dataset.filter;

    renderTasks();

  });

});


// INITIAL RENDER

renderTasks();