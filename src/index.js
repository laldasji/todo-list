import './primary-style.css';
import './secondary-style.css';
import './eventListeners.js';
import './formInputProcessing.js';
import { parseJSON } from 'date-fns';

import { habitHistory } from './taskStorage.js';

// check if a day has passed, if yes, push habits into history that's it.
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
let lastDate = localStorage.getItem("lastDate");

if (lastDate == null) {
    console.log('date doesn\'t exist');
    localStorage.setItem("lastDate", JSON.stringify(today));
}
else {
    const storedDate = parseJSON(lastDate);
    console.log(storedDate);
    if (!(today.getFullYear() == storedDate.getFullYear() && today.getMonth() == storedDate.getMonth() && today.getDate() == storedDate.getDate())) {
        console.log('A day has passed');
        let habitHistoryList = JSON.parse(localStorage.getItem('habitHistoryList'));
        const habitList = JSON.parse(localStorage.getItem('habitsList'));

        habitHistory.list = habitHistoryList;
        habitHistory.push(habitList, storedDate);
        habitHistoryList = habitHistory.list;

        localStorage.setItem('habitsList', JSON.stringify(habitList));
        localStorage.setItem('habitHistoryList', JSON.stringify(habitHistoryList));
        localStorage.setItem("lastDate", JSON.stringify(today));
    }
}

const habitsList = localStorage.getItem('habitsList');