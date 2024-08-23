import './primary-style.css';
import './secondary-style.css';
import './eventListeners.js';
import './formInputProcessing.js';

import { habitHistory } from './taskStorage.js';

// check if a day has passed, if yes, push habits into history that's it.
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
let lastDate = localStorage.getItem("lastDate");
console.log(today);

if (lastDate == null) {
    localStorage.setItem(lastDate, JSON.stringify(today));
}
else {
    const storedDate = JSON.parse(lastDate);
    if (storedDate.getDate() != today.getDate()) {
        const habitHistoryList = JSON.parse(localStorage.getItem('habitHistoryList'));
        const habitList = JSON.parse(localStorage.getItem('habitsList'));
        habitHistory.list = habitHistoryList;
        habitHistory.push(habitList);
        console.log(habitList);
        localStorage.setItem('habitList', JSON.stringify(habitList));
        localStorage.setItem('habitHistoryList', JSON.stringify(habitHistoryList));
    }
}

const habitsList = localStorage.getItem('habitsList');