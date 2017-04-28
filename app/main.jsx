import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';

import App from './components/App';

render(
	<Router>
		<Route path="/" component={App} />
	</Router>,
	document.getElementById('main')
);
