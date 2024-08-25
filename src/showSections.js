// this derives information directly from localStorage
const mainContent = document.querySelector('#mainContent');
import { add, intlFormat, intlFormatDistance, parseJSON, startOfDay } from "date-fns";
import { taskHistory, tasks, habits, habitHistory } from './taskStorage.js'

export const listElements = document.querySelector('#infoBar').querySelector('ul').querySelectorAll('li');

const classes = {
    Habits : 'habitDisplayer',
    TodoActivity : 'taskDisplayer',
    HabitHistory : 'habitHistory',
    TaskHistory : 'taskDisplayer',
    Notes : 'NotesDisplayer'
};

const contentGenerator = {
    Habits: () => {
        let habitsList = JSON.parse(localStorage.getItem("habitsList"));
        const element = document.createElement('div');
        if (habitsList.length == 0)
        {
            const announce = document.createElement('h3');
            announce.textContent = 'Your habits are displayed here!';
            announce.style.placeSelf = 'center';
            element.appendChild(announce);
            return element;
        }
        for (let i = 0; i < habitsList.length; i++) {
            const currentHabit = habitsList[i];

            const child = document.createElement('div');
            const check = document.createElement('check');
            const checkBox = document.createElement('input');
            const name = document.createElement('name');
            const description = document.createElement('description');
            const deleteHabit = document.createElement('button');

            checkBox.type = 'checkbox';
            if (currentHabit.checked)
                checkBox.checked = true;
            checkBox.id = currentHabit.taskID;
            checkBox.addEventListener('change', (event) => {
                const index = habitsList.findIndex(element => element.taskID == currentHabit.taskID);
                if (index == -1) {
                    console.log('does not exist');
                    return;
                }
                if (event.target.checked) {
                    habitsList[index].checked = true;
                }
                else {
                    habitsList[index].checked = false;
                }
                localStorage.setItem("habitsList", JSON.stringify(habitsList));
            });

            name.textContent = currentHabit.Name;
            description.textContent = currentHabit.Description;
            deleteHabit.textContent = 'Delete';
            deleteHabit.addEventListener('click', () => {
                const index = habitsList.findIndex(element => element.taskID == currentHabit.taskID)
                if (index == -1)
                    return;
                habitsList.splice(index, 1);

                localStorage.setItem("habitsList", JSON.stringify(habitsList));
                element.removeChild(child);
            })

            check.appendChild(checkBox);
            child.append(check, name, description, deleteHabit);
            child.classList.add(`P${currentHabit.Priority}`);

            element.appendChild(child);
        }
        return element;
    },
    TodoActivity: () => {
        let taskList = JSON.parse(localStorage.getItem("taskList"));
        let taskHistoryList = JSON.parse(localStorage.getItem("taskHistoryList"));
        const element = document.createElement('div');
        if (taskList.length == 0)
        {
            const announce = document.createElement('h3');
            announce.textContent = 'Remaining tasks are displayed here!';
            announce.style.placeSelf = 'center';
            element.appendChild(announce);
            return element;
        }
        for (let i = 0; i < taskList.length; i++) {
            const currentTask = taskList[i];
            
            const child = document.createElement('div');
            const check = document.createElement('check');
            const checkBox = document.createElement('input');
            const name = document.createElement('name');
            const description = document.createElement('description');
            const dueTime = document.createElement('dueTime');
            const deleteTask = document.createElement('button');
            
            checkBox.type = 'checkbox';
            if (currentTask.checked)
                checkBox.checked = true;
            checkBox.id = currentTask.taskID;
            checkBox.addEventListener('change', (event) => {
                if (event.target.checked) {
                    // find the element
                    const index = taskList.findIndex(element => element.taskID == currentTask.taskID);
                    if (index == -1) {
                        console.log('does not exist');
                        return;
                    }

                    currentTask.checked = true;
                    
                    taskList.splice(index, 1);
                    taskHistoryList.unshift(currentTask);

                    localStorage.setItem("taskList", JSON.stringify(taskList));
                    localStorage.setItem("taskHistoryList", JSON.stringify(taskHistoryList));
                    child.classList.add('accomplished');
                }
            });

            name.textContent = currentTask.Name;
            description.textContent = currentTask.Description;

            const finalTime = startOfDay(add(currentTask.DueDate, {days: 1}));
            const timeDistance = intlFormatDistance(finalTime, new Date(), {unit: 'hour'});
            dueTime.textContent = `Due ${timeDistance}`;

            deleteTask.textContent = 'Delete';
            deleteTask.addEventListener('click', () => {
                const index = taskList.findIndex(element => element.taskID == currentTask.taskID);
                if (index == -1)
                    return;
                taskList.splice(index, 1);

                localStorage.setItem("taskList", JSON.stringify(taskList));
                element.removeChild(child);
            });

            check.appendChild(checkBox);
            child.append(check, name, description, dueTime, deleteTask);
            
            child.classList.add(`P${currentTask.Priority}`);
            
            element.appendChild(child);
        }
        return element;
    },
    HabitHistory: () => {
        let habitHistoryList = JSON.parse(localStorage.getItem("habitHistoryList"));
        const element = document.createElement('div');
        if (habitHistoryList.length == 0)
        {
            const announce = document.createElement('h3');
            announce.textContent = 'No history to display!';
            announce.style.placeSelf = 'center';
            element.appendChild(announce);
            return element;
        }
        habitHistoryList.forEach(content => {
            const Heading = document.createElement('h3');
            Heading.textContent = intlFormat(parseJSON(content[0]));
            const object = document.createElement('div');
            object.classList.add('dayInfo');
            object.append(Heading);
            if (content.length > 1) {
                for (let i = 1; i < content.length; i++) {
                    const task = document.createElement('h5');
                    task.textContent = content[i].Name;
                    task.classList.add(`P${content[i].Priority}`);
                    task.classList.add(`habitHistoryElement`);
                    object.append(task);
                }
            }
            else {
                const task = document.createElement('h5');
                task.textContent = 'No records';
                task.classList.add(`habitHistoryElement`);
                object.append(task);
            }
            element.appendChild(object);
        });
        return element;
        
    },
    TaskHistory: () => {
        let taskHistoryList = JSON.parse(localStorage.getItem("taskHistoryList"));;

        taskHistory.list = taskHistoryList;
        taskHistory.trim();
        taskHistoryList = taskHistory.list;

        let taskList = JSON.parse(localStorage.getItem("taskList"));
        const element = document.createElement('div');
        if (taskHistoryList.length == 0)
        {
            const announce = document.createElement('h3');
            announce.textContent = 'Completed tasks are displayed here!';
            announce.style.placeSelf = 'center';
            announce.style.textAlign = 'center';
            element.appendChild(announce);
            return element;
        }
        for (let i = 0; i < taskHistoryList.length; i++) {
            const currentTask = taskHistoryList[i];
            
            const child = document.createElement('div');
            const check = document.createElement('check');
            const checkBox = document.createElement('input');
            const name = document.createElement('name');
            const description = document.createElement('description');
            const dueTime = document.createElement('dueTime');
            const deleteTask = document.createElement('button');
            
            checkBox.type = 'checkbox';
            if (currentTask.checked)
                checkBox.checked = true;
            checkBox.id = currentTask.taskID;
            checkBox.addEventListener('change', (event) => {
                if (!event.target.checked) {
                    // find the element
                    const index = taskHistoryList.findIndex(element => element.taskID == currentTask.taskID);
                    if (index == -1) {
                        console.log('does not exist');
                        return;
                    }

                    currentTask.checked = false;
                    
                    taskHistoryList.splice(index, 1);

                    tasks.list = taskList;
                    tasks.push(currentTask);
                    taskList = tasks.list;

                    localStorage.setItem("taskList", JSON.stringify(taskList));
                    localStorage.setItem("taskHistoryList", JSON.stringify(taskHistoryList));
                    child.classList.add('accomplished');
                }
            });

            name.textContent = currentTask.Name;
            description.textContent = currentTask.Description;

            const finalTime = startOfDay(add(currentTask.DueDate, {days: 1}));
            const timeDistance = intlFormatDistance(finalTime, new Date());
            dueTime.textContent = `Due time: ${timeDistance}`;

            deleteTask.textContent = 'Delete';
            deleteTask.addEventListener('click', () => {
                const index = taskHistoryList.findIndex(element => element.taskID == currentTask.taskID);
                if (index == -1)
                    return;
                taskHistoryList.splice(index, 1);

                localStorage.setItem("taskHistoryList", JSON.stringify(taskHistoryList));
                element.removeChild(child);
            });

            check.appendChild(checkBox);
            child.append(check, name, description, dueTime, deleteTask);
            
            child.classList.add(`P${currentTask.Priority}`);
            
            element.appendChild(child);
        }
        localStorage.setItem("taskHistoryList", JSON.stringify(taskHistoryList));
        return element;
    },
    Notes: () => {
        const element = document.createElement('div');
        const notesList = JSON.parse(localStorage.getItem("Notes"));
        let removed = 0;
        for (let i = 0; i < notesList.length; i++) {
            const box = document.createElement('div');
            const heading = document.createElement('h5');
            const content = document.createElement('p');
            const DeleteButton = document.createElement('button');

            heading.textContent = notesList[i].Title;
            content.textContent = notesList[i].Content;
            DeleteButton.textContent = 'Delete';
            DeleteButton.addEventListener('click', () => {
                element.removeChild(box);
                notesList.splice(i - removed, 1);
                removed++;
                localStorage.setItem("Notes", JSON.stringify(notesList));
            })

            box.classList.add('notesBox');
            box.append(heading, content, DeleteButton);

            element.appendChild(box);
        }
        const AddNoteButton = document.createElement('div');
        const AddNoteContent = document.createElement('h1');

        AddNoteButton.id = 'AddNoteButton';
        AddNoteButton.title = 'Add New Note';
        AddNoteButton.addEventListener('click', () => {
            const addNotesDialog = document.querySelector('#addNotesDialog');
            addNotesDialog.style.display = 'grid';
        });
        AddNoteContent.textContent = '+';
        AddNoteButton.appendChild(AddNoteContent);


        element.appendChild(AddNoteButton);
        return element;
    }
};

export function showContent(element) {
    for (let i = 0; i < listElements.length; i++) {
        listElements[i].classList = '';
    }
    mainContent.innerHTML = '';
    const content = contentGenerator[element.id]();
    content.classList.add(classes[element.id]);
    element.classList.add('active');
    mainContent.appendChild(content);
}