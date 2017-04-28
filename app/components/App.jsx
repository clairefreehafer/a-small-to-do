import React, { Component } from 'react';
import { Col, PageHeader } from 'react-bootstrap';

import { getTasks } from '../utils/task-management';

import NewTask from './NewTask';
import FilterTasks from './FilterTasks';
import TaskList from './TaskList';

class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			tasks: [],
			filter: 'all'
		};

		this.getTasks = this.getTasks.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}

	componentWillMount () {
		// get all tasks when component mounts
		this.getTasks();
	}

	getTasks () {
		// fetch all of the current tasks as well as
		// update the list when a new task is added or marked complete
		getTasks()
		.then(tasks => {
			// update state so list will re-render
			if (tasks) this.setState({ tasks: tasks });
		})
		.catch(console.error);
	}

	handleFilter (filter) {
		// update state so list will re-render
		this.setState( { filter: filter });
	}

	render () {
		return (
			<div>
				{/* page header */}
				<Col xs={12} md={8} lg={6} mdOffset={2} lgOffset={3}>
					<PageHeader>a small to-do <small>a simple task management app</small></PageHeader>
				</Col>

				{/* add new task & filter tasks */}
				<Col xs={12} md={8} lg={6} mdOffset={2} lgOffset={3}>
					<NewTask callbackParent={this.getTasks} />
					<FilterTasks handleFilter={this.handleFilter} />
				</Col>

				{/* list of tasks */}
				<Col xs={12} md={8} lg={6} mdOffset={2} lgOffset={3}>
					<TaskList
						tasks={this.state.tasks}
						filter={this.state.filter}
						getTasks={this.getTasks}
					/>

					<p id="tips">hover over a task to delete or mark as complete</p>
				</Col>
			</div>
		)
	}
}

export default App;
