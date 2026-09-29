const STORAGE_KEY = 'student-task-manager-v1';
let tasks = loadTasks();

const $ = (id) => document.getElementById(id);
const form = $('taskForm');

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[c]);
}

function formatDate(date) {
  if (!date) return 'No due date';
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString();
}

function filteredTasks() {
  const search = $('search').value.trim().toLowerCase();
  const status = $('statusFilter').value;
  const priority = $('priorityFilter').value;
  return tasks.filter((task) => {
    const matchesSearch = !search || `${task.title} ${task.subject} ${task.description}`.toLowerCase().includes(search);
    const matchesStatus = status === 'all' || (status === 'completed' ? task.completed : !task.completed);
    const matchesPriority = priority === 'all' || task.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });
}

function render() {
  const visible = filteredTasks();
  $('taskList').innerHTML = visible.map((task) => `
    <article class="task ${task.completed ? 'completed' : ''}">
      <input class="check" type="checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task complete" data-action="toggle" data-id="${task.id}">
      <div>
        <h3 class="task-title">${escapeHtml(task.title)}</h3>
        <div class="meta">
          <span class="badge">${escapeHtml(task.subject)}</span>
          <span class="badge">${escapeHtml(task.priority)} priority</span>
          <span class="badge">Due: ${escapeHtml(formatDate(task.dueDate))}</span>
        </div>
        ${task.description ? `<p class="task-desc">${escapeHtml(task.description)}</p>` : ''}
      </div>
      <div class="task-actions">
        <button class="small-btn" type="button" data-action="edit" data-id="${task.id}">Edit</button>
        <button class="small-btn" type="button" data-action="delete" data-id="${task.id}">Delete</button>
      </div>
    </article>
  `).join('');

  $('emptyState').style.display = visible.length ? 'none' : 'block';
  $('totalCount').textContent = tasks.length;
  $('pendingCount').textContent = tasks.filter((t) => !t.completed).length;
  $('completedCount').textContent = tasks.filter((t) => t.completed).length;
}

function resetForm() {
  form.reset();
  $('editingId').value = '';
  $('saveButton').textContent = 'Add Task';
  $('formTitle').textContent = 'Add a Task';
  $('cancelEdit').classList.add('hidden');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = $('title').value.trim();
  const subject = $('subject').value.trim();
  if (!title || !subject) return;

  const data = {
    title,
    subject,
    dueDate: $('dueDate').value,
    priority: $('priority').value,
    description: $('description').value.trim()
  };

  const editingId = $('editingId').value;
  if (editingId) {
    tasks = tasks.map((task) => task.id === editingId ? { ...task, ...data } : task);
  } else {
    tasks.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), ...data, completed: false });
  }
  saveTasks();
  resetForm();
  render();
});

$('cancelEdit').addEventListener('click', resetForm);
$('search').addEventListener('input', render);
$('statusFilter').addEventListener('change', render);
$('priorityFilter').addEventListener('change', render);

$('taskList').addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const id = button.dataset.id;
  const action = button.dataset.action;
  const task = tasks.find((item) => item.id === id);
  if (!task) return;

  if (action === 'toggle') {
    task.completed = !task.completed;
  } else if (action === 'delete') {
    tasks = tasks.filter((item) => item.id !== id);
  } else if (action === 'edit') {
    $('title').value = task.title;
    $('subject').value = task.subject;
    $('dueDate').value = task.dueDate;
    $('priority').value = task.priority;
    $('description').value = task.description;
    $('editingId').value = task.id;
    $('saveButton').textContent = 'Update Task';
    $('formTitle').textContent = 'Edit Task';
    $('cancelEdit').classList.remove('hidden');
    $('title').focus();
    return;
  }
  saveTasks();
  render();
});

$('clearCompleted').addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
});

$('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('student-task-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  $('themeToggle').textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

if (localStorage.getItem('student-task-theme') === 'dark') {
  document.body.classList.add('dark');
  $('themeToggle').textContent = '☀️';
}

window.StudentTaskManager = { loadTasks, saveTasks, filteredTasks, render };
render();
