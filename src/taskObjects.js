class Task {
    static getTaskID() {
        let taskID = localStorage.getItem("taskID");
    
        if (taskID === null) {
            taskID = 1000;
        }
        else {
            taskID = JSON.parse(taskID);
        }
    
        taskID++;
    
        localStorage.setItem("taskID", JSON.stringify(taskID));
    
        return taskID;
    }
    constructor(Name, Description, Priority) {
        this.Name = Name;
        this.Description = Description;
        this.Priority = Priority;
        this.checked = false;
        this.taskID = Task.getTaskID();
    }
}

class SingleInstanceTask extends Task {
    constructor(Name, Description, Priority, DueDate) {
        super(Name, Description, Priority);
        this.DueDate = DueDate;
    }
}

class HabitTask extends Task {
    constructor(Name, Description, Priority) {
        super(Name, Description, Priority);
    }
}

export { SingleInstanceTask, HabitTask };