const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_KEY = "task.selectedListId";

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_KEY);

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function saveAndRender() {
  save();
  render();
}

export default function render() {
  const listContainer = document.querySelector("[data-lists]");

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
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function newList() {
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
  return { id: Date.now().toString(), name: name, tasks: [] };
}
