import React, { Component } from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import { addTask } from '../utils/task-management';

class NewTask extends Component {
	constructor (props) {
		super(props);

		this.state = { task: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange (event) {
		// updates the state with the content of the new task
		// to be added, retrieved from the text box
		this.setState({ task: event.target.value })
	}

	handleSubmit (event) {
		event.preventDefault();

		// adds task to the database, resets state
		addTask(this.state.task)
		.then(() => this.setState({ task: '' }));

		// update App component state, which will trigger
		// the task list to update
		this.props.callbackParent();
	}

	render () {
		return (
			<Form horizontal onSubmit={this.handleSubmit}>
				<FormGroup>

					<Col componentClass={ControlLabel} sm={2}>
						add new task
					</Col>

					<Col sm={8}>
						<FormControl
							type="text"
							placeholder={'\u{1f4dd}'}
							name="task"
							value={this.state.task}
							onChange={this.handleChange}
						/>
					</Col>

					<Col sm={2}>
						<Button type="submit" bsStyle="primary">
							submit
						</Button>
					</Col>

				</FormGroup>
			</Form>
		)
	}
}

export default NewTask;
