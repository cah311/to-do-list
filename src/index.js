import _ from "lodash";
import "./styles/style.css";
import lists from "./lists.js";

// Creates grid for layout of page
function pageGrid() {
  // container for entire page
  const gridContainer = document.createElement("div");
  gridContainer.setAttribute("id", "page-grid");

  // header grid cell
  const headerSection = document.createElement("div");
  headerSection.setAttribute("class", "grid-section");
  headerSection.setAttribute("id", "header-section");

  // list grid cell
  const listSection = document.createElement("div");
  listSection.setAttribute("class", "grid-section");
  listSection.setAttribute("id", "list-section");

  // task section grid cell
  const taskSection = document.createElement("div");
  taskSection.setAttribute("class", "grid-section");
  taskSection.setAttribute("id", "task-section");

  // footer grid cell
  const footerSection = document.createElement("div");
  footerSection.setAttribute("class", "grid-section");
  footerSection.setAttribute("id", "footer-section");

  // append to page
  gridContainer.appendChild(headerSection);
  gridContainer.appendChild(listSection);
  gridContainer.appendChild(taskSection);
  gridContainer.appendChild(footerSection);

  return gridContainer;
}

document.body.append(pageGrid());

// appends any content to header section
function headerContent() {
  const headerContainer = document.getElementById("header-section");
  const headerContent = document.createElement("div");
  headerContent.innerText = "Header";
  headerContainer.appendChild(headerContent);

  return headerContainer;
}

headerContent();

// appends content to list section
function listContent() {
  // main list container
  const listContainer = document.getElementById("list-section");

  const listContent = document.createElement("div");
  listContent.setAttribute("id", "lists-container");

  // Full list library
  const allListContainer = document.createElement("div");
  allListContainer.setAttribute("class", "all-lists");
  allListContainer.setAttribute("id", "all-list-container");

  // Header for list of lists
  const allListTitle = document.createElement("h2");
  allListTitle.setAttribute("class", "task-list-title");
  allListTitle.innerText = "Lists";

  // list of lists
  const allList = document.createElement("ul");
  allList.setAttribute("class", "task-list");

  // list 1
  const firstList = document.createElement("li");
  firstList.setAttribute("class", "list-name active-list");
  firstList.innerText = "First List";

  // list 2
  const secondList = document.createElement("li");
  secondList.setAttribute("class", "list-name");
  secondList.innerText = "Second List";

  // list 3
  const thirdList = document.createElement("li");
  thirdList.setAttribute("class", "list-name");
  thirdList.innerText = "Second List";

  // add new list
  const newList = document.createElement("form");
  newList.setAttribute("action", "");
  const newListInput = document.createElement("input");
  newListInput.setAttribute("type", "text");
  newListInput.setAttribute("class", "new-list");
  newListInput.setAttribute("placeholder", "new list name");
  //// subit new list
  const newListButton = document.createElement("button");
  newListButton.setAttribute("class", "list-button button-create");
  newListButton.innerText = "+";

  //// ***********temp*****************/////
  const btn = document.createElement("button");
  btn.innerHTML = "Click me and check the console!";
  btn.onclick = lists;
  //// ***********temp*****************/////

  // append to list section
  listContainer.appendChild(listContent);
  listContent.appendChild(allListContainer);
  // full list library
  allListContainer.appendChild(allListTitle);
  allListContainer.appendChild(allList);
  allList.appendChild(firstList);
  allList.appendChild(secondList);
  allList.appendChild(thirdList);
  allListContainer.appendChild(newList);
  newList.appendChild(newListInput);
  newList.appendChild(newListButton);

  listContent.appendChild(btn);

  return listContainer;
}

listContent();

// appends content to task section
function tasksContent() {
  // container & div for task section
  const taskContainer = document.getElementById("task-section");
  const taskContent = document.createElement("div");

  // div for current selected task
  const currentTaskList = document.createElement("div");
  currentTaskList.setAttribute("class", "todo-list");

  // task list header
  const taskListHeader = document.createElement("div");
  taskListHeader.setAttribute("class", "todo-list-header");

  const taskListTitle = document.createElement("h2");
  taskListTitle.setAttribute("class", "todo-list-title");
  taskListTitle.innerHTML = "First List";
  const taskCount = document.createElement("p");
  taskCount.setAttribute("class", "todo-count");
  taskCount.innerText = "3 tasks remaining";

  //task list body
  const taskListBody = document.createElement("div");
  taskListBody.setAttribute("class", "todo-list-body");

  // todo section
  const todos = document.createElement("div");
  todos.setAttribute("class", "todos");

  // individual task1
  const task1 = document.createElement("div");
  task1.setAttribute("class", "task");
  const task1Input = document.createElement("input");
  task1Input.setAttribute("type", "checkbox");
  task1Input.setAttribute("id", "task-1");
  const task1Label = document.createElement("label");
  task1Label.setAttribute("for", "task-1");
  task1Label.innerText = "Banana";
  const customCheckbox1 = document.createElement("span");
  customCheckbox1.setAttribute("class", "custom-checkbox");

  // individual task2
  const task2 = document.createElement("div");
  task2.setAttribute("class", "task");
  const task2Input = document.createElement("input");
  task2Input.setAttribute("type", "checkbox");
  task2Input.setAttribute("id", "task-2");
  const task2Label = document.createElement("label");
  task2Label.setAttribute("for", "task-2");
  task2Label.innerText = "Apple";
  const customCheckbox2 = document.createElement("span");
  customCheckbox2.setAttribute("class", "custom-checkbox");

  // individual task3
  const task3 = document.createElement("div");
  task3.setAttribute("class", "task");
  const task3Input = document.createElement("input");
  task3Input.setAttribute("type", "checkbox");
  task3Input.setAttribute("id", "task-3");
  const task3Label = document.createElement("label");
  task3Label.setAttribute("for", "task-3");
  task3Label.innerText = "Orange";
  const customCheckbox3 = document.createElement("span");
  customCheckbox3.setAttribute("class", "custom-checkbox");

  // task creator
  const taskCreator = document.createElement("div");
  taskCreator.setAttribute("class", "new-task-creator");
  //// new task form
  const newTask = document.createElement("form");
  newTask.setAttribute("action", "");
  const newTaskInput = document.createElement("input");
  newTaskInput.setAttribute("type", "text");
  newTaskInput.setAttribute("class", "new-task");
  newTaskInput.setAttribute("placeholder", "new-task-name");
  //// submit new task
  const newTaskButton = document.createElement("button");
  newTaskButton.setAttribute("class", "task-button button-create");
  newTaskButton.innerText = "+";

  // delete task
  const deleteTasks = document.createElement("div");
  deleteTasks.setAttribute("class", "delete-tasks");
  const deleteCompletedBtn = document.createElement("button");
  deleteCompletedBtn.setAttribute("class", "btn-delete");
  deleteCompletedBtn.innerText = "Clear Completed Tasks";
  const deleteTaskList = document.createElement("button");
  deleteTaskList.setAttribute("class", "btn-delete");
  deleteTaskList.innerText = "Delete List";

  // append main containers
  taskContainer.appendChild(taskContent);
  taskContent.appendChild(currentTaskList);
  // append header content
  currentTaskList.appendChild(taskListHeader);
  taskListHeader.appendChild(taskListTitle);
  taskListHeader.appendChild(taskCount);
  // append body content
  currentTaskList.appendChild(taskListBody);
  taskListBody.appendChild(todos);
  //// task1
  todos.appendChild(task1);
  task1.appendChild(task1Input);
  task1.appendChild(task1Label);
  task1Label.appendChild(customCheckbox1);
  ////task2
  todos.appendChild(task2);
  task2.appendChild(task2Input);
  task2.appendChild(task2Label);
  task2Label.appendChild(customCheckbox2);
  ////task3
  todos.appendChild(task3);
  task3.appendChild(task3Input);
  task3.appendChild(task3Label);
  task3Label.appendChild(customCheckbox3);
  // task creator
  taskListBody.appendChild(taskCreator);
  taskCreator.appendChild(newTask);
  newTask.appendChild(newTaskInput);
  newTask.appendChild(newTaskButton);

  // delete task
  taskListBody.appendChild(deleteTasks);
  deleteTasks.appendChild(deleteCompletedBtn);
  deleteTasks.appendChild(deleteTaskList);

  return taskContainer;
}

tasksContent();

// appends content to footer section
function footerContent() {
  const footerContainer = document.getElementById("footer-section");
  const footerContent = document.createElement("div");
  footerContent.innerText = "Footer";
  footerContainer.appendChild(footerContent);

  return footerContainer;
}

footerContent();
