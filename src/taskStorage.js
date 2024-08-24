import { SingleInstanceTask, HabitTask} from './taskObjects.js';
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

class Habits {
    // elements contained in this class will be of the type HabitTask
    list = [];
    push(habit) {
        if (!(habit instanceof HabitTask)) {
            console.log('Inserted Habit not an instance of a habit object');
            return;
        }
        insertTaskByPriority(this.list, habit);
    }
}

class HabitHistory {
    // elements contained in this class will be objects withing lists, with property name and priority only. only completed tasks will have an entry in the objects

    list = [];
    push(dailyHabitList, dateForHabit) {
        // daily habit list is a list of custom objects, with only name and priority, AND only for those elements that have been 'checked'
        let habitsForTheDay = [dateForHabit];
        dailyHabitList.forEach(habit => {
            // create new object list to push
            // take each habit in the habitList and uncheck it
            if (habit.checked)
            {
                const newHistoryObject = {
                    Name: habit.Name,
                    Priority: habit.Priority
                };
                habitsForTheDay.push(newHistoryObject);
                habit.checked = false;
            }
        });
        if (habitsForTheDay.length > 1)
            this.list.push(habitsForTheDay);
    }
    trim() {
        let toRemove = this.list.length - 30;
        if (toRemove > 0) {
            this.list.splice(30, toRemove);
        }
        else {
            console.log('nothing to trim')
        }
    }
}

class Tasks {
    // elements contained in this class will be of the type SingleInstanceTask
    list = [];
    push(task) {
        insertTaskByPriority(this.list, task);
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