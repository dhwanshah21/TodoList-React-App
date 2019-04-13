```
## React App

-> This is a simple React App which is basically useful in day to day life for scheduling the todos for a particular day.
-> The user is allowed to add tasks or note down the important tasks which he is afraid of forgetting in his/her busy life. 
-> The user can Add Tasks on a particular day by clicking 'ADD NEW'-> Entering the task -> TAP '+'. For instance : 'Meeting with XYZ'. 
-> We have also provided a checkbox with that task text which can be useful when the user acknowledges that the given task is completed.    So, the user checks the checkbox and the task is then dropped to the bottom of the list with a sign of disabled.
-> Also the total of NOT DONE Tasks are shown at the bottom left of the page. Basically the ones which are not checked.
-> According to the given specs the user can not go to the NEXT DATES but can go to the previous days by clicking '<' to see the tasks      in previous days. If there are no tasks then it simply shows 0 Tasks.


## Getting Started

1. Unzip the solution.
2. Run `yarn` to install the dependencies.
3. Run `yarn start` or `npm start` to run the app and go to http://localhost:3000/ to view. 
   I have tested it on chrome browser.

## Understanding the React App :

├── package.json                     # Node related dependencies and scripts        
├── package-lock.json               
├── src ├── index.js                 # Main root file where App.js file is called
        ├── index.scss                   
        ├── App.js                   # Manages all routes and decide which component should be called depending on the path
        ├── TodoList ├── TodoList.js # Manages all the todos of the particular day
                     ├── Storage.js  # Storage of todos in local storage
                     ├── TodoList.scss
                     ├── utils.js            
        ├── App.scss
        ├── App.test.js
        ├── serviceworker.js
├── public  ├── index.html
            ├── manifest.json
├── node-modules

## Technologies and Development Tools Used for the Project :

- JavaScript(ES6), localstorage, React.js, HTML, SCSS, Microsoft VS Code, npm and Trello.   

## Future Enhancements :

- Allowing to create a common TodoList for a team. Basically making a group using email-ids so that the teamwork can be scheduled in a     better way.
- 'Delete/Update' feature for deleting the selected todos.
- Pagination/Next/Prev for huge number of todos.
- Setting a deadline for a particular todo.
- Also, if the deadline is missed, sending a notification or an alarm setting like before 1 hour of deadline.
