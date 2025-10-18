    let todos = [];

    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const addBtn = document.getElementById('addBtn');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const filterSelect = document.getElementById('filterSelect');
    const todoList = document.getElementById('todoList');

function addTodo() {
    const task = taskInput.value.trim();
    const dueDate = dateInput.value;

    if (task === '') return;

    const todo = {
        id: Date.now(),
        task: task,
        dueDate: dueDate,
        completed: false
    };

    todos.push(todo);
    taskInput.value = '';
    dateInput.value = '';
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function toggleComplete(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function deleteAll() {
    if (todos.length === 0) return;
    if (confirm('Are you sure you want to delete all tasks?')) {
        todos = [];
        renderTodos();
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderTodos() {
    const filter = filterSelect.value;
    let filteredTodos = todos;

    if (filter === 'pending') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state">No task found</div>';
        return;
    }

    todoList.innerHTML = filteredTodos.map(todo => `
        <div class="todo-item">
            <div class="task-text ${todo.completed ? 'completed' : ''}">${todo.task}</div>
            <div class="due-date">${formatDate(todo.dueDate)}</div>
            <div>
                <span class="status-badge ${todo.completed ? 'status-completed' : 'status-pending'}">
                    ${todo.completed ? 'Completed' : 'Pending'}
                </span>
            </div>
            <div class="actions">
                <button onclick="toggleComplete(${todo.id})" class="btn-complete">✓</button>
                <button onclick="deleteTodo(${todo.id})" class="btn-delete">✕</button>
            </div>
        </div>
    `).join('');
}

    addBtn.addEventListener('click', addTodo);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });
    deleteAllBtn.addEventListener('click', deleteAll);
    filterSelect.addEventListener('change', renderTodos);

    renderTodos();