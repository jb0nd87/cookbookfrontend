import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Display from './Display';
import Form from './Form';

function App() {
	const url = 'http://localhost:3000';
	
	const [cookbooks, setCookbooks] = React.useState([]);
	
	const emptyCookbook = {
		title: '',
		yearPublished: '',
	};

	
	const [selectedCookbook, setSelectedCookbook] = React.useState(emptyCookbook);

	
	const getCookbooks = () => {
		fetch(url + '/cookbook/')
			.then((response) => response.json())
			.then((data) => {
				setCookbooks(data);
			});
	};

	
	React.useEffect(() => getCookbooks(), []);


	const handleCreate = (newCookbook) => {
		fetch(url + '/cookbook/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCookbook),
		}).then((response) => getCookbooks());
	};

	
	const handleUpdate = (cookbook) => {
		fetch(url + '/cookbook/' + cookbook._id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cookbook),
		}).then((response) => getCookbooks());
	};

	
	const selectCookbook = (cookbook) => {
		setSelectedCookbook(cookbook);
	};

	
	const deleteCookbook = (cookbook) => {
		fetch(url + '/cookbook/' + cookbook._id, {
			method: 'delete',
		}).then((response) => getCookbooks());
	};

	return (
		<div className='App'>
			<h1>COOKBOOKS</h1>
			<hr />
			<Link to='/create'>
				<button>Add Author</button>
			</Link>
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => (
							<Display
								{...rp}
								cookbooks={cookbooks}
								selectCookbook={selectCookbook}
								deleteCookbook={deleteCookbook}
							/>
						)}
					/>
					<Route
						exact
						path='/create'
						render={(rp) => (
							<Form
								{...rp}
								label='create'
								cookbook={emptyCookbook}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form
								{...rp}
								label='update'
								cookbook={selectedCookbook}
								handleSubmit={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}
export default App;
