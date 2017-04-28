import axios from 'axios';

// fetch tasks from database, used in App component
export const getTasks = () => {
	return axios.get('/api')
		.then(res => res.data)
		.catch(console.error);
}

// add new task, used in NewTask component
export const addTask = task => {
	return axios.post('/api', { content: task })
		.catch(console.error);
}

// delete task, used in TaskOptions
export const deleteTask = task => {
	return axios.delete('/api', { params: { content: task } })
		.catch(console.error);
}

// mark task complete, used in TaskOptions
export const updateTask = task => {
	return axios.put('/api', { content: task })
		.catch(console.error);
}
