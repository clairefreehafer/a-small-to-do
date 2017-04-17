'use strict';

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class TaskOptions extends Component {
	constructor (props) {
		super(props);

		this.state = {
			completed: props.completed
		};

		this.handleButtonUpdate = this.handleButtonUpdate.bind(this);
	}

	handleButtonUpdate (task) {
		// remove mark complete button when clicked by updating
		// TaskOptions state & render check mark by updating
		// TaskList's state
		this.props.handleUpdate(task)
		.then(this.setState( { completed: true }))
		.catch(console.error);
	}

	render () {
	return (
		<div className="task-options">
			{/* mark complete button */}
			{this.state.completed ? null :
				<Button
					bsStyle="success"
					bsSize="xsmall"
					onClick={() => this.handleButtonUpdate(this.props.content)}
				>
					mark complete
				</Button>}

			&nbsp;

			{/* delete button */}
			<Button
				bsStyle="danger"
				bsSize="xsmall"
				onClick={() => this.props.handleDelete(this.props.content)}
			>
				delete
			</Button>
		</div>
	)
	}
}

