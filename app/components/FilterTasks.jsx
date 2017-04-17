'use strict'

import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default class FilterTasks extends Component {
	constructor (props) {
		super(props);

		// defaults to show all
		this.state = { filter: 'all' };

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick (event) {
		event.preventDefault();

		// store what button was clicked
		const clickedButtonValue = event.target.getAttribute('value');

		// update state to re-render list
		this.setState({ filter: clickedButtonValue });

		// function bound to parent component App.
		// this will update App's state so that the task list
		// re-renders when a filter button is clicked
		this.props.handleFilter(clickedButtonValue);
	}

	render () {
		return (
			<ButtonGroup justified>
				{/* href needed for buttons to render correctly */}
				<Button
					href="#"
					value="all"
					onClick={this.handleClick}
					active={this.state.filter === 'all'}
				>
					show all
				</Button>

				<Button
					href="#"
					value="incomplete"
					onClick={this.handleClick}
					active={this.state.filter === 'incomplete'}
				>
					show incomplete
				</Button>

				<Button
					href="#"
					value="complete"
					onClick={this.handleClick}
					active={this.state.filter === 'complete'}
				>
					show complete
				</Button>
			</ButtonGroup>
		)
	}
}
