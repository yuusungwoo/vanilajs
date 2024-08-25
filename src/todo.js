const TodoForm = document.querySelector('#todo-form');
const TodoInput = TodoForm.querySelector('#todo-form input');
const TodoList = document.querySelector('#todo-list');

const TODOS_KEY = 'todos';
let Todos =[];

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(Todos));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    Todos = Todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodos();
}

function paintTodo(newTodo) {
    const li = document.createElement('li');
    li.id = newTodo.id;
    const span = document.createElement('span');
    span.innerText = newTodo.text;
    const button = document.createElement('button');
    button.innerText = '❌';
    button.addEventListener('click',deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    TodoList.appendChild(li);
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = TodoInput.value;
    TodoInput.value = "";
    const NewTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    Todos.push(NewTodoObj);
    paintTodo(NewTodoObj);
    saveTodos();
}


TodoForm.addEventListener('submit', handleTodoSubmit);
const SavedTodos = localStorage.getItem(TODOS_KEY);

if (SavedTodos !== null) {
    const parsedTodos = JSON.parse(SavedTodos);
    Todos = parsedTodos
    parsedTodos.forEach(paintTodo);
}
