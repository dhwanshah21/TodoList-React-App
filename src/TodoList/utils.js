import { getItem } from './Storage.js';

const options = { 
  weekday: 'long', month: 'long', 
  day: 'numeric', hour: 'numeric',
  minute: 'numeric', hour12:false,
  timeZone: 'America/Los_Angeles' ,
};

export const getLocaleDateString = (date) => date.toLocaleDateString("en-US",options);

export const getDateTime = (date) => {
  const splitDate = date.split(', ');
  const dateDay = `${splitDate[0]}, ${splitDate[1]}`;
  const time = splitDate[2];

  return { date: dateDay, time };
}
// Exporting the current Date 
export const isCurrentDate = (date) => {
  const today  = new Date();
  let fullDate = today.toLocaleDateString("en-US",options);

  return date === getDateTime(fullDate).date;
}
// The tasks which are not completed yet (not checked) are unVisitedTasks
export const unVisitedTasks = (tasks) => tasks.filter(task => !task.isVisited);
// The tasks that are completed/checked
const visitedTasks = (tasks) => tasks.filter(task => task.isVisited);

// Each and every task created by the user
export const allTasks = (date) => {
  const storageTasks = getItem('tasks') && getItem('tasks')[date] || [];
  return [...unVisitedTasks(storageTasks), ...visitedTasks(storageTasks)];
}

export const createTaskObject = (time, text) => {
  return {
    text,
    isVisited: false,
    time,
  };
}