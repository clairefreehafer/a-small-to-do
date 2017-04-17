'use strict';

import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { deleteTask, updateTask } from '../utils/task-management';

import TaskOptions from './TaskOptions';

class TaskList extends Component {
	constructor(props) {
		super(props);

		this.state = { tasks: this.props.tasks };

		this.listTasks = this.listTasks.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	listTasks (tasks, filter) {
		// this function lists and filters tasks by changing
		// each task's class

		let completeClass = 'show-task',
			incompleteClass = 'show-task'

		if (filter === 'incomplete') 	completeClass = 'hide-task';
		else if (filter === 'complete') incompleteClass = 'hide-task';

		// if there are tasks, show em
		if (tasks.length > 0) {
			return tasks.map(task => {
				return (
					<ListGroupItem
						key={task.id}
						className={task.completed ? completeClass : incompleteClass}
					>

					{/* if task is completed, render check mark */}
						{task.completed ? <span style={{ paddingRight: '10px' }}>{'\u{2705}'}</span> : null}

						{task.content}

						{/* mark complete and delete buttons */}
						<TaskOptions
							complete={task.completed}
							content={task.content}
							handleDelete={this.handleDelete}
							handleUpdate={this.handleUpdate}
						/>
					</ListGroupItem>
				);
			});
		} else {
			// if there aren't any tasks yet
			return (
				<ListGroupItem>{'\u{270D}'}&nbsp; add a task above!</ListGroupItem>
			)
		}
	}

	handleUpdate (task) {
		// handles when a task is marked complete.
		// bound to TaskList & passed down to TaskOptions
		// so the list will re-render with the checkmark
		// and remove the button
		return updateTask(task)
			.then(this.props.getTasks)
			.catch(console.error);
	}

	handleDelete (task) {
		// bound to TaskList so the list will update with
		// removed task
		deleteTask(task)
		.then(() => {
			return this.props.getTasks();
		})
		.catch(console.error);
	}

	render () {
		return (
			<ListGroup>
				{this.listTasks(this.props.tasks, this.props.filter)}
			</ListGroup>
		)
	}
}

export default TaskList;
