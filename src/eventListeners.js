import lightTheme from './svg/light.svg';
import darkTheme from './svg/dark.svg';
import { showContent, listElements } from "./showSections.js";

// buttons
const themeChangeButton = document.querySelector('#themeChanger');
const addTask = document.querySelector('#addTask');
const addTaskDialog = document.querySelector('#addTaskDialog');
const addTaskType = document.querySelector('#addTaskType');
const taskTypeButtons = addTaskType.querySelectorAll('div');
const addNotesDialog = document.querySelector('#addNotesDialog');

// functions
function toggleTheme() {
    const html = document.querySelector('html');
    const image = document.createElement('img');
    
    if (html.getAttribute("data-theme") === "light") {
        image.src = darkTheme;
        html.setAttribute("data-theme", "dark");
    } else {
        image.src = lightTheme;
        html.setAttribute("data-theme", "light");
    }
    themeChangeButton.innerHTML = '';
    themeChangeButton.appendChild(image);
}

function displayTaskCreationBox() {
    if (addTaskDialog.style.display == 'none') {
        addTaskDialog.style.display = 'grid';
    }
    else {
        addTaskDialog.style.display = 'none';
    }
}

listElements.forEach(element => {
    element.addEventListener('click', () => {
        showContent(element);
    });
});

themeChangeButton.addEventListener('click', toggleTheme);
addTask.addEventListener('click', displayTaskCreationBox);

// form options
let selectedHabitType = false;
const formSection = addTaskDialog.querySelector('#formSection');
const taskForm = formSection.querySelector('#taskForm');
const habitForm = formSection.querySelector('#habitForm');

// Submit Buttons
// const TaskSubmission = document.querySelector('#TaskSubmission');
const HabitSubmission = document.querySelector('#HabitSubmission');

addTaskType.addEventListener('click', () => {
    if (selectedHabitType) {
        taskTypeButtons[0].className = 'selected';
        taskTypeButtons[1].className = '';
        selectedHabitType = false;
        habitForm.style.display = 'none';
        taskForm.style.display = 'grid';
    }
    else {
        taskTypeButtons[1].className = 'selected';
        taskTypeButtons[0].className = '';
        selectedHabitType = true;
        taskForm.style.display = 'none';
        habitForm.style.display = 'grid';
    }
});

// show infoBar in mobile devices
const infoBarDisplayer = document.querySelector('#infoBarDisplayer');
const infoBar = document.querySelector('#infoBar');

infoBarDisplayer.addEventListener('click', () => {
    infoBar.style.display = 'grid';
});

function getAspectRatio() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return width / height;
}

document.addEventListener('click', event => {
    const currentRatio = getAspectRatio();
    if (!(addTaskDialog.contains(event.target) || addTask.contains(event.target))) {
        addTaskDialog.style.display = 'none';
    }
    // !addNotesDialog.contains(event.target) && AddNoteButton != null
    const AddNoteButton = document.querySelector('#AddNoteButton');
    if (AddNoteButton == null || !(addNotesDialog.contains(event.target) || AddNoteButton.contains(event.target))) {
        addNotesDialog.style.display = 'none';
    }
    if (infoBar.style.display == 'grid' && currentRatio <= 4 / 3 && !(infoBar.contains(event.target) || infoBarDisplayer.contains(event.target))) {
        infoBar.style.display = 'none';
    }
})

// Add eventlistener to get back window size
window.addEventListener('resize', () => {
    const currentRatio = getAspectRatio();
    if (currentRatio > 3 / 4) {
        infoBar.style.display = 'grid';
    }
    else {
        infoBar.style.display = 'none';
    }
});

// toggleTheme();