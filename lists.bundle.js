"use strict";
(self["webpackChunkto_do_list"] = self["webpackChunkto_do_list"] || []).push([["lists"],{

/***/ "./src/lists.js":
/*!**********************!*\
  !*** ./src/lists.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearElement": () => (/* binding */ clearElement),
/* harmony export */   "default": () => (/* binding */ render),
/* harmony export */   "deleteList": () => (/* binding */ deleteList),
/* harmony export */   "lists": () => (/* binding */ lists),
/* harmony export */   "newList": () => (/* binding */ newList),
/* harmony export */   "save": () => (/* binding */ save),
/* harmony export */   "saveAndRender": () => (/* binding */ saveAndRender),
/* harmony export */   "selectedListId": () => (/* binding */ selectedListId)
/* harmony export */ });
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");


const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_KEY = "task.selectedListId";

let lists =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(
  LOCAL_STORAGE_SELECTED_LIST_KEY
);

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_KEY, selectedListId);
}

function saveAndRender() {
  save();
  render();
}

function render() {
  const listContainer = document.querySelector("[data-lists]");
  listContainer.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "li") {
      selectedListId = e.target.dataset.listId;
      saveAndRender();
    }
  });

  clearElement(listContainer);
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.setAttribute("class", "list-name ");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listContainer.append(listElement);
  });

  (0,_tasks__WEBPACK_IMPORTED_MODULE_0__["default"])();
}

function renderLists() {}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function newList() {
  const newListForm = document.querySelector("[data-new-list-form]");
  const newListInput = document.querySelector("[data-new-list-input]");

  newListForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const listName = newListInput.value;
    if (listName == null || listName === "") return;
    const list = createList(listName);
    newListInput.value = null;
    lists.push(list);
    saveAndRender();
  });
}

function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [
      {
        id: Date.now().toString(),
        name: name,
        complete: false,
      },
    ],
  };
}

function deleteList() {
  const deleteListButton = document.querySelector("[data-delete-list-button]");

  deleteListButton.addEventListener("click", (e) => {
    lists = lists.filter((list) => list.id !== selectedListId);

    selectedListId = null;
    saveAndRender();
  });
  return deleteListButton;
}


/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addToTaskList": () => (/* binding */ addToTaskList),
/* harmony export */   "clearCompletet": () => (/* binding */ clearCompletet),
/* harmony export */   "default": () => (/* binding */ listDisplay),
/* harmony export */   "renderTaskCount": () => (/* binding */ renderTaskCount)
/* harmony export */ });
/* harmony import */ var _lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lists */ "./src/lists.js");


function listDisplay() {
  const listDisplayContainer = document.querySelector(
    "[data-list-display-container]"
  );
  const listTitleElement = document.querySelector("[data-list-title]");
  const taskContainer = document.querySelector("[data-tasks]");

  const selectedList = _lists__WEBPACK_IMPORTED_MODULE_0__.lists.find((list) => list.id === _lists__WEBPACK_IMPORTED_MODULE_0__.selectedListId);

  if (_lists__WEBPACK_IMPORTED_MODULE_0__.selectedListId == null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
  }

  (0,_lists__WEBPACK_IMPORTED_MODULE_0__.clearElement)(taskContainer);
  renderTasks(selectedList);
  addToTaskList();
  clearCompletet();

  taskContainer.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "input") {
      const selectedList = _lists__WEBPACK_IMPORTED_MODULE_0__.lists.find((list) => list.id === _lists__WEBPACK_IMPORTED_MODULE_0__.selectedListId);
      const selectedTask = selectedList.tasks.find(
        (task) => task.id === e.target.id
      );

      selectedTask.complete = e.target.checked;
      (0,_lists__WEBPACK_IMPORTED_MODULE_0__.save)();
      renderTaskCount(selectedList);
    }
  });

  //updateTasks(lists);
}

function addToTaskList() {
  const newTaskForm = document.querySelector("[data-new-task-form]");
  const newTaskInput = document.querySelector("[data-new-task-input]");
  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskName = newTaskInput.value;
    if (taskName == null || taskName === "") return;
    const task = createNewTask(taskName);
    newTaskInput.value = null;
    const selectedList = _lists__WEBPACK_IMPORTED_MODULE_0__.lists.find((list) => list.id === _lists__WEBPACK_IMPORTED_MODULE_0__.selectedListId);
    selectedList.tasks.push(task);
    (0,_lists__WEBPACK_IMPORTED_MODULE_0__.saveAndRender)();
  });
}

function createNewTask(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [
      {
        id: Date.now().toString(),
        name: name,
        complete: false,
      },
    ],
  };
}

function renderTasks(selectedList) {
  const container = document.querySelector("[data-tasks]");

  selectedList.tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.setAttribute("class", "task");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", task.id);
    checkbox.checked = task.complete;
    const taskLabel = document.createElement("label");
    taskLabel.setAttribute("for", task.id);
    taskLabel.append(task.name);
    const customCheckbox = document.createElement("span");
    customCheckbox.setAttribute("class", "custom-checkbox");

    container.appendChild(taskElement);
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskLabel);
    taskLabel.appendChild(customCheckbox);
  });
}

function renderTaskCount(selectedList) {
  const listCountElement = document.querySelector("[data-list-count]");

  const incompleteTaskCount = selectedList.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

function clearCompletet(selectedList) {
  const clearCompleteTasksButton = document.querySelector(
    "[data-clear-complete-tasks-button]"
  );

  clearCompleteTasksButton.addEventListener("click", (e) => {
    selectedList = _lists__WEBPACK_IMPORTED_MODULE_0__.lists.find((list) => list.id === _lists__WEBPACK_IMPORTED_MODULE_0__.selectedListId);
    selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
    (0,_lists__WEBPACK_IMPORTED_MODULE_0__.saveAndRender)();
  });
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/lists.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQzs7QUFFbEM7QUFDQTs7QUFFTztBQUNQO0FBQ087QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRSxrREFBVztBQUNiOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZGaUI7O0FBRUY7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1Qiw4Q0FBVSx1QkFBdUIsa0RBQWM7O0FBRXRFLE1BQU0sa0RBQWM7QUFDcEI7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSxvREFBWTtBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLDhDQUFVLHVCQUF1QixrREFBYztBQUMxRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLDRDQUFJO0FBQ1Y7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDhDQUFVLHVCQUF1QixrREFBYztBQUN4RTtBQUNBLElBQUkscURBQWE7QUFDakIsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxxQkFBcUIsRUFBRSxZQUFZO0FBQ3JFOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLDhDQUFVLHVCQUF1QixrREFBYztBQUNsRTtBQUNBLElBQUkscURBQWE7QUFDakIsR0FBRztBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9saXN0cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsaXN0RGlzcGxheSBmcm9tIFwiLi90YXNrc1wiO1xuXG5jb25zdCBMT0NBTF9TVE9SQUdFX0xJU1RfS0VZID0gXCJ0YXNrLmxpc3RzXCI7XG5jb25zdCBMT0NBTF9TVE9SQUdFX1NFTEVDVEVEX0xJU1RfS0VZID0gXCJ0YXNrLnNlbGVjdGVkTGlzdElkXCI7XG5cbmV4cG9ydCBsZXQgbGlzdHMgPVxuICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfTElTVF9LRVkpKSB8fCBbXTtcbmV4cG9ydCBsZXQgc2VsZWN0ZWRMaXN0SWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcbiAgTE9DQUxfU1RPUkFHRV9TRUxFQ1RFRF9MSVNUX0tFWVxuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmUoKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfTElTVF9LRVksIEpTT04uc3RyaW5naWZ5KGxpc3RzKSk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfU0VMRUNURURfTElTVF9LRVksIHNlbGVjdGVkTGlzdElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVBbmRSZW5kZXIoKSB7XG4gIHNhdmUoKTtcbiAgcmVuZGVyKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgY29uc3QgbGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1saXN0c11cIik7XG4gIGxpc3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJsaVwiKSB7XG4gICAgICBzZWxlY3RlZExpc3RJZCA9IGUudGFyZ2V0LmRhdGFzZXQubGlzdElkO1xuICAgICAgc2F2ZUFuZFJlbmRlcigpO1xuICAgIH1cbiAgfSk7XG5cbiAgY2xlYXJFbGVtZW50KGxpc3RDb250YWluZXIpO1xuICBsaXN0cy5mb3JFYWNoKChsaXN0KSA9PiB7XG4gICAgY29uc3QgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgbGlzdEVsZW1lbnQuZGF0YXNldC5saXN0SWQgPSBsaXN0LmlkO1xuICAgIGxpc3RFbGVtZW50LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGlzdC1uYW1lIFwiKTtcbiAgICBsaXN0RWxlbWVudC5pbm5lclRleHQgPSBsaXN0Lm5hbWU7XG4gICAgaWYgKGxpc3QuaWQgPT09IHNlbGVjdGVkTGlzdElkKSB7XG4gICAgICBsaXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLWxpc3RcIik7XG4gICAgfVxuICAgIGxpc3RDb250YWluZXIuYXBwZW5kKGxpc3RFbGVtZW50KTtcbiAgfSk7XG5cbiAgbGlzdERpc3BsYXkoKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyTGlzdHMoKSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJFbGVtZW50KGVsZW1lbnQpIHtcbiAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3TGlzdCgpIHtcbiAgY29uc3QgbmV3TGlzdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbmV3LWxpc3QtZm9ybV1cIik7XG4gIGNvbnN0IG5ld0xpc3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1uZXctbGlzdC1pbnB1dF1cIik7XG5cbiAgbmV3TGlzdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IGxpc3ROYW1lID0gbmV3TGlzdElucHV0LnZhbHVlO1xuICAgIGlmIChsaXN0TmFtZSA9PSBudWxsIHx8IGxpc3ROYW1lID09PSBcIlwiKSByZXR1cm47XG4gICAgY29uc3QgbGlzdCA9IGNyZWF0ZUxpc3QobGlzdE5hbWUpO1xuICAgIG5ld0xpc3RJbnB1dC52YWx1ZSA9IG51bGw7XG4gICAgbGlzdHMucHVzaChsaXN0KTtcbiAgICBzYXZlQW5kUmVuZGVyKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaXN0KG5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgdGFza3M6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlTGlzdCgpIHtcbiAgY29uc3QgZGVsZXRlTGlzdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1kZWxldGUtbGlzdC1idXR0b25dXCIpO1xuXG4gIGRlbGV0ZUxpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgbGlzdHMgPSBsaXN0cy5maWx0ZXIoKGxpc3QpID0+IGxpc3QuaWQgIT09IHNlbGVjdGVkTGlzdElkKTtcblxuICAgIHNlbGVjdGVkTGlzdElkID0gbnVsbDtcbiAgICBzYXZlQW5kUmVuZGVyKCk7XG4gIH0pO1xuICByZXR1cm4gZGVsZXRlTGlzdEJ1dHRvbjtcbn1cbiIsImltcG9ydCByZW5kZXIsIHtcbiAgbGlzdHMsXG4gIHNlbGVjdGVkTGlzdElkLFxuICBjbGVhckVsZW1lbnQsXG4gIHNhdmUsXG4gIHNhdmVBbmRSZW5kZXIsXG59IGZyb20gXCIuL2xpc3RzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpc3REaXNwbGF5KCkge1xuICBjb25zdCBsaXN0RGlzcGxheUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCJbZGF0YS1saXN0LWRpc3BsYXktY29udGFpbmVyXVwiXG4gICk7XG4gIGNvbnN0IGxpc3RUaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbGlzdC10aXRsZV1cIik7XG4gIGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdGFza3NdXCIpO1xuXG4gIGNvbnN0IHNlbGVjdGVkTGlzdCA9IGxpc3RzLmZpbmQoKGxpc3QpID0+IGxpc3QuaWQgPT09IHNlbGVjdGVkTGlzdElkKTtcblxuICBpZiAoc2VsZWN0ZWRMaXN0SWQgPT0gbnVsbCkge1xuICAgIGxpc3REaXNwbGF5Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfSBlbHNlIHtcbiAgICBsaXN0RGlzcGxheUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICBsaXN0VGl0bGVFbGVtZW50LmlubmVyVGV4dCA9IHNlbGVjdGVkTGlzdC5uYW1lO1xuICAgIHJlbmRlclRhc2tDb3VudChzZWxlY3RlZExpc3QpO1xuICB9XG5cbiAgY2xlYXJFbGVtZW50KHRhc2tDb250YWluZXIpO1xuICByZW5kZXJUYXNrcyhzZWxlY3RlZExpc3QpO1xuICBhZGRUb1Rhc2tMaXN0KCk7XG4gIGNsZWFyQ29tcGxldGV0KCk7XG5cbiAgdGFza0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkTGlzdCA9IGxpc3RzLmZpbmQoKGxpc3QpID0+IGxpc3QuaWQgPT09IHNlbGVjdGVkTGlzdElkKTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkVGFzayA9IHNlbGVjdGVkTGlzdC50YXNrcy5maW5kKFxuICAgICAgICAodGFzaykgPT4gdGFzay5pZCA9PT0gZS50YXJnZXQuaWRcbiAgICAgICk7XG5cbiAgICAgIHNlbGVjdGVkVGFzay5jb21wbGV0ZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICBzYXZlKCk7XG4gICAgICByZW5kZXJUYXNrQ291bnQoc2VsZWN0ZWRMaXN0KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vdXBkYXRlVGFza3MobGlzdHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9UYXNrTGlzdCgpIHtcbiAgY29uc3QgbmV3VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbmV3LXRhc2stZm9ybV1cIik7XG4gIGNvbnN0IG5ld1Rhc2tJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1uZXctdGFzay1pbnB1dF1cIik7XG4gIG5ld1Rhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCB0YXNrTmFtZSA9IG5ld1Rhc2tJbnB1dC52YWx1ZTtcbiAgICBpZiAodGFza05hbWUgPT0gbnVsbCB8fCB0YXNrTmFtZSA9PT0gXCJcIikgcmV0dXJuO1xuICAgIGNvbnN0IHRhc2sgPSBjcmVhdGVOZXdUYXNrKHRhc2tOYW1lKTtcbiAgICBuZXdUYXNrSW5wdXQudmFsdWUgPSBudWxsO1xuICAgIGNvbnN0IHNlbGVjdGVkTGlzdCA9IGxpc3RzLmZpbmQoKGxpc3QpID0+IGxpc3QuaWQgPT09IHNlbGVjdGVkTGlzdElkKTtcbiAgICBzZWxlY3RlZExpc3QudGFza3MucHVzaCh0YXNrKTtcbiAgICBzYXZlQW5kUmVuZGVyKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdUYXNrKG5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgdGFza3M6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYXNrcyhzZWxlY3RlZExpc3QpIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXRhc2tzXVwiKTtcblxuICBzZWxlY3RlZExpc3QudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhc2tcIik7XG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcImlkXCIsIHRhc2suaWQpO1xuICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0YXNrLmNvbXBsZXRlO1xuICAgIGNvbnN0IHRhc2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICB0YXNrTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIHRhc2suaWQpO1xuICAgIHRhc2tMYWJlbC5hcHBlbmQodGFzay5uYW1lKTtcbiAgICBjb25zdCBjdXN0b21DaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGN1c3RvbUNoZWNrYm94LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiY3VzdG9tLWNoZWNrYm94XCIpO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tFbGVtZW50KTtcbiAgICB0YXNrRWxlbWVudC5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgdGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQodGFza0xhYmVsKTtcbiAgICB0YXNrTGFiZWwuYXBwZW5kQ2hpbGQoY3VzdG9tQ2hlY2tib3gpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclRhc2tDb3VudChzZWxlY3RlZExpc3QpIHtcbiAgY29uc3QgbGlzdENvdW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1saXN0LWNvdW50XVwiKTtcblxuICBjb25zdCBpbmNvbXBsZXRlVGFza0NvdW50ID0gc2VsZWN0ZWRMaXN0LnRhc2tzLmZpbHRlcihcbiAgICAodGFzaykgPT4gIXRhc2suY29tcGxldGVcbiAgKS5sZW5ndGg7XG4gIGNvbnN0IHRhc2tTdHJpbmcgPSBpbmNvbXBsZXRlVGFza0NvdW50ID09PSAxID8gXCJ0YXNrXCIgOiBcInRhc2tzXCI7XG4gIGxpc3RDb3VudEVsZW1lbnQuaW5uZXJUZXh0ID0gYCR7aW5jb21wbGV0ZVRhc2tDb3VudH0gJHt0YXNrU3RyaW5nfSByZW1haW5pbmdgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDb21wbGV0ZXQoc2VsZWN0ZWRMaXN0KSB7XG4gIGNvbnN0IGNsZWFyQ29tcGxldGVUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCJbZGF0YS1jbGVhci1jb21wbGV0ZS10YXNrcy1idXR0b25dXCJcbiAgKTtcblxuICBjbGVhckNvbXBsZXRlVGFza3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgc2VsZWN0ZWRMaXN0ID0gbGlzdHMuZmluZCgobGlzdCkgPT4gbGlzdC5pZCA9PT0gc2VsZWN0ZWRMaXN0SWQpO1xuICAgIHNlbGVjdGVkTGlzdC50YXNrcyA9IHNlbGVjdGVkTGlzdC50YXNrcy5maWx0ZXIoKHRhc2spID0+ICF0YXNrLmNvbXBsZXRlKTtcbiAgICBzYXZlQW5kUmVuZGVyKCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9