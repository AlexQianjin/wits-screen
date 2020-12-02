import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Minimal as MinimalLayout } from './layouts';
import {
	Dashboard as DashboardView,
	Admin as AdminView,
	NotFound as NotFoundView
} from './views';

const Routes = () => {
	return (
		<Switch>
			{/* <Redirect
				exact
				from="/"
				to="/dashboard"
			/> */}
			<RouteWithLayout
				component={DashboardView}
				exact
				layout={MinimalLayout}
				path="/"
			/>
			<RouteWithLayout
				component={DashboardView}
				exact
				layout={MinimalLayout}
				path="/dashboard"
			/>
			<RouteWithLayout
				component={AdminView}
				exact
				layout={MinimalLayout}
				path="/admin"
			/>
			<RouteWithLayout
				component={NotFoundView}
				exact
				layout={MinimalLayout}
				path="/not-found"
			/>
			<Redirect to="/not-found" />
		</Switch>
	);
};

export default Routes;
