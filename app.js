// Initialize tasks array from localStorage or empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks(filter = "all") {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear current list
  
  let filteredTasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else {
    filteredTasks = tasks; // Show all tasks
  }

  filteredTasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.textContent = task.text;
    taskElement.classList.add(task.completed ? "completed" : "pending");

    // Add click event to toggle task completion
    taskElement.addEventListener("click", () => {
      toggleTaskCompletion(index);
    });

    taskList.appendChild(taskElement);
  });
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTask(taskText) {
  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

// Event listener to add a new task
document.getElementById("add-task").addEventListener("click", () => {
  const taskInput = document.getElementById("task-input");
  if (taskInput.value.trim()) {
    addTask(taskInput.value.trim());
    taskInput.value = "";
  }
});

// Filter tasks based on selected filter
function filterTasks(filter) {
  renderTasks(filter);

  // Update active filter button
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.id === `${filter}-btn`) {
      btn.classList.add("active");
    }
  });
}

// Adding event listeners to filter buttons
document.getElementById("all-btn").addEventListener("click", () => filterTasks("all"));
document.getElementById("completed-btn").addEventListener("click", () => filterTasks("completed"));
document.getElementById("pending-btn").addEventListener("click", () => filterTasks("pending"));

// Initial render when the page loads
renderTasks();
