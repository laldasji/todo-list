import {SingleInstanceTask, HabitTask} from './taskObjects.js';
import { formatDistanceToNowStrict } from 'date-fns';

function insertTaskByPriority(list, insertedTask) {
    let i = 0;
    while (i < list.length) {
        if (list[i].Priority < insertedTask.Priority) {
            break;
        }
        i++;
    }
    list.splice(i, 0, insertedTask);
}

function remove(list, taskID) {
    let i = 0;
    for (i; i < this.list.length; i++) {
        if (list[i].taskID == taskID)
            break;
        i++;
    }
    if (i != this.list.length) {
        this.list.splice(i, 1);
    }
}

class Habits {
    // elements contained in this class will be of the type HabitTask
    list = [];
    deepCopy() {
        const newHabits = new Habits();
        this.list.forEach(habit => {
            newHabits.list.push(habit.deepCopy());
        })
        return newHabits;
    }
    push(habit) {
        if (!(habit instanceof HabitTask)) {
            console.log('Inserted Habit not an instance of a habit object');
            return;
        }
        insertTaskByPriority(this.list, habit);
    }
    remove(taskID) {
        remove(this.list, taskID);
    }
}

class HabitHistory {
    // elements contained in this class will be of the type Habits

    list = [];
    push(dailyHabitList) {
        // create copy of the habits in the habitList and push the copy
        const objectCopy = dailyHabitList.deepCopy();
        this.list.push(objectCopy);
        // take each habit in the habitList and uncheck it
        dailyHabitList.list.forEach(habit => {
            habit.checked = false;
        });
    }
    trim() {
        let i = 0;
        while (i < this.list.length) {
            const currentDistance = formatDistanceToNowStrict(list[i].DateOfCreation, {
                unit: 'month',
                roundingMethod: 'floor'
            });
            if (currentDistance[0] == '0') {
                break;
            }
            i++;
        }
        this.list.splice(0, i);
    }
}

class Tasks {
    // elements contained in this class will be of the type SingleInstanceTask
    list = [];
    push(task) {
        insertTaskByPriority(this.list, task);
    }
    remove(taskID) {
        remove(this.list, taskID);
    }
}

class TaskHistory {
    // elements contained in this class will be of the type SingleInstanceTask
    list = [];
    push(taskList, index) {
        // add the element to history
        this.list.splice(0, 0, taskList[index]);
        // remove the element from taskList
        taskList.list.splice(index, 1);
    }
    trim() {
        let toRemove = this.list.length - 15;
        if (toRemove > 0) {
            this.list.splice(15, toRemove);
        }
        else {
            console.log('nothing to trim')
        }
    }
}

const taskHistory = new TaskHistory();
const tasks = new Tasks();
const habits = new Habits();
const habitHistory = new HabitHistory();

export { taskHistory, tasks, habits, habitHistory };