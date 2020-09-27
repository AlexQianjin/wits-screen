import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import AuthService from '../../helpers/AuthService';
// import { AuthApi } from '../../api-client/src';

import useInterval from '../../helpers/useInterval';

const PrivateRouteWithLayout = props => {
	const { layout: Layout, component: Component, ...rest } = props;

	// let auth = new AuthService();
	let auth = {};
	const refreshToken = () => {
		// const apiInstance = new AuthApi();
		// apiInstance.apiClient.authentications.apiKey.apiKey = auth.getRefreshToken();
		// apiInstance.refreshToken()
		// 	.then(data => {
		// 		auth.setToken(data.accessToken);
		// 		auth.setRefreshToken(data.refreshToken);
		// 	})
		// 	.catch(error => {
		// 		console.log(error, 18);
		// 	});
	};

	useInterval(refreshToken, 4 * 60 * 1000);

	return (
		<Route
			{...rest}
			render={({ location }) => auth.loggedIn() ? (
				<Layout>
					<Component {...rest} />
				</Layout>
			) : (
				<Redirect
					to={{
						pathname: '/sign-in',
						state: {from: location}
					}}
				/>
			)}
		/>
	);
};

PrivateRouteWithLayout.propTypes = {
	component: PropTypes.any.isRequired,
	layout: PropTypes.any.isRequired,
	path: PropTypes.string
};

export default PrivateRouteWithLayout;
