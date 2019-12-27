import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';

function App() {
	return (
		<div>
			<Route path="/" component={PostListPage} exact />
			<Route path="/:id" component={PostPage} />
		</div>
	);
}

export default App;
