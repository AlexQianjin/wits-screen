import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Router history={browserHistory}>
					<Routes />
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;
