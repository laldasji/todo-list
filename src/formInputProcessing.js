// involves only ADDING Elements to the form
import { SingleInstanceTask, HabitTask } from './taskObjects.js';
import { taskHistory, tasks, habits, habitHistory } from './taskStorage.js';
import { showContent, listElements } from './showSections.js';


// if localstorage has taskhistory and tasks list, load them into tasks and taskHistory
// else use tasks and taskHistory as is

function syncLocalStorage(object, key) {
  if (localStorage.getItem(key) == null) {
    localStorage.setItem(key, JSON.stringify(object.list));
  }
  else {
    object.list = JSON.parse(localStorage.getItem(key));
  }
}

syncLocalStorage(tasks, "taskList");
syncLocalStorage(taskHistory, "taskHistoryList");
syncLocalStorage(habits, "habitsList");
syncLocalStorage(habitHistory, "habitHistoryList");

(function setMinDateToToday() {
  const dateInput = document.getElementById('taskDueDate');
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  dateInput.min = formattedDate;
})();

// for Task objects


const taskForm = document.querySelector('#taskForm');

const TaskName = document.querySelector('#TaskName');
const TaskDescription = document.querySelector('#TaskDescription');
const taskPriority = document.querySelectorAll('input[name="taskPriority"]');
const taskDueDate = document.querySelector('#taskDueDate');
const TaskSubmission = document.querySelector('#TaskSubmission');

TaskSubmission.addEventListener('click', (event) => {
  syncLocalStorage(tasks, "taskList");
  syncLocalStorage(taskHistory, "taskHistoryList");
  event.preventDefault();
  const name = TaskName.value;
  const description = TaskDescription.value;

  let priority = -1;

  for (const radio of taskPriority) {
    if (radio.checked) {
      priority = (radio.id)[1];
      break;
    }
  }
  priority = priority == -1 ? 1 : priority;

  const dueDate = new Date(taskDueDate.value);

  if (name == '' || taskDueDate.value == '')
    return;

  const newTask = new SingleInstanceTask(name, description, priority, dueDate);
  tasks.push(newTask);
  localStorage.setItem("taskList", JSON.stringify(tasks.list));
  showContent(listElements[1]);

  taskForm.reset();
});

// for Habit objects
const habitForm = document.querySelector("#habitForm");

const HabitName = document.querySelector('#HabitName');
const HabitDescription = document.querySelector('#HabitDescription');
const habitPriority = document.querySelectorAll('input[name="habitPriority"]');
const HabitSubmission = document.querySelector('#HabitSubmission');

HabitSubmission.addEventListener('click', (event) => {
  syncLocalStorage(habits, "habitsList");
  syncLocalStorage(habitHistory, "habitHistoryList");
  event.preventDefault();
  const name = HabitName.value;
  const description = HabitDescription.value;

  let priority = -1;

  for (const radio of habitPriority) {
    if (radio.checked) {
      priority = (radio.id)[1];
      break;
    }
  }
  priority = priority == -1 ? 1 : priority;

  if (name == '')
    return;
  const newHabit = new HabitTask(name, description, priority);
  habits.push(newHabit);
  localStorage.setItem("habitsList", JSON.stringify(habits.list));
  showContent(listElements[0]);

  habitForm.reset();

});