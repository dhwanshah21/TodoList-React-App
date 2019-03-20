import React, { Component } from 'react';
import { getItem, setItem } from './Storage.js';
import { isCurrentDate, allTasks, getDateTime, getLocaleDateString, createTaskObject, unVisitedTasks} from './utils.js';
import './TodoList.scss';

class TodoList extends Component {
	constructor() {
		super();        
		const today  = new Date();
		const dateTime = getDateTime(getLocaleDateString(new Date()));
		const date = dateTime.date;
		const time = dateTime.time;

		this.state = {
			currentDate: today,
			date,
			time,
			isInputVisible: false,
			isDoneEditing: false,
			tasks: allTasks(date)
		};
	}
// When the user clicks checkbox of a particular task	
	checkboxClicked(e) { 
		const { date } = this.state;
		let tasksOfDate = getItem('tasks')[date];
		for (let i in tasksOfDate){
			if (tasksOfDate[i].text === e.target.value){
				tasksOfDate[i].isVisited=true;
			}
		}
		const allPreviousTasks = getItem('tasks');
		allPreviousTasks[date] = tasksOfDate;
		setItem('tasks', allPreviousTasks);   
		this.setState({ tasks: allTasks(date) });
	}
	handleClick() {
		this.setState ({
			isInputVisible: true,
			isDoneEditing:false,
		})
	};
// Adding the Todo Task in the List
	handleSubmit() { 
		const { date, time } = this.state;
		const text = document.getElementById('taskText') && document.getElementById('taskText').value || null;
		if(text === null) {
			alert("Please enter a task first!");
			return;
		}

		if (getItem('tasks')) {
			if(getItem('tasks')[date]) {
				const existingCollection = getItem('tasks');
				const getPreviousData = existingCollection[date];
				getPreviousData.unshift(createTaskObject(time, text));
				existingCollection[date] = getPreviousData;
				setItem('tasks', existingCollection);
			} 
			else {
				const allPreviousTasks = getItem('tasks');
				allPreviousTasks[date] = [createTaskObject(time, text)];
				setItem('tasks', allPreviousTasks);             
			}
		} 
		else { 
			setItem('tasks', { [date]: [createTaskObject(time, text)] });
		}
		document.getElementById('taskText').value = '';
		this.setState ({
			isDoneEditing: true,
			isInputVisible:false,
			tasks: allTasks(date)
		})
	};
// To go to the PREVIOUS dates
	handlePrevious = () => { 
		this.setState ((state) => {
			state.currentDate.setDate(state.currentDate.getDate() - 1);
			const dateTime = getDateTime(getLocaleDateString(state.currentDate));
			const date = dateTime.date;
			const time = dateTime.time;
			return {
				date,
				time,
				tasks: allTasks(date)
			};
		});
	}
// To go to the NEXT dates
	handleNext = () => {
		this.setState((state) => {
			state.currentDate.setDate(state.currentDate.getDate() + 1);
			const dateTime = getDateTime(getLocaleDateString(state.currentDate));
			const date = dateTime.date;
			const time = dateTime.time;

			return {
				date,
				time,
				tasks: allTasks(date)
			};
		});
	}
		
	render() {
		const { isInputVisible, tasks, date } = this.state;
		const unvisitedTasksLength = unVisitedTasks(getItem('tasks') && getItem('tasks')[date] || []).length;

		return (
			<div className="todoList">
				<div className="page">
					<div className='topRow'>
						<div className='previous' onClick={() => this.handlePrevious()}>{'<'}</div>
						<div className='date'>{this.state.date} </div>
						{!isCurrentDate(date) &&
								<div className='next' onClick={() => this.handleNext()}>{'>'}</div>
						}
					</div>
					{
						tasks.map(task => {
							return (
								<div className="row" key={task.id}>
									<input type="checkbox" className='checkbox' value={task.text} checked={task.isVisited} onChange={ (e) => this.checkboxClicked(e)} />
									{
										task.isVisited &&
											<div className='taskText taskText--done'>{task.text}</div> ||
											<div className='taskText'>{task.text}</div>
									}
									<div className='time'>{task.time}</div>
								</div>
							);
						})
					}	
					<div className='footerRow'>
						<div className='numOfTasks'>
								{unvisitedTasksLength} Tasks
						</div>
						<div className="addbutton"> 
							{
								!isInputVisible && isCurrentDate(date) &&
									<p className='addNew' onClick= { () => this.handleClick()}>ADD NEW</p> ||
									isCurrentDate(date) && <input type='text' className='text' id="taskText" placeholder='Enter Todos here...'  />                            
							}
							{ isCurrentDate(date) &&
									<p className='addTask' onClick={() => this.handleSubmit()}>+</p>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default TodoList;