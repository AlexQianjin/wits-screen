import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {
		boxShadow: 'none'
	},
	toolBar: {
		paddingLeft: 10,
		paddingRight: 10,
		minHeight: 45,
		backgroundColor: '#484644'
	},
	logo: {
		color: '#FFFFFF'
	}
}));

const Topbar = props => {
	const { className, ...rest } = props;

	const classes = useStyles();

	return (
		<AppBar
			{...rest}
			className={clsx(classes.root, className)}
			color="primary"
			position="fixed"
		>
			<Toolbar className={classes.toolBar}>
				<RouterLink to="/">
					<div className={clsx(classes.logo, className)}>MIS</div>

					{/* <img
						alt="Logo"
						src="/images/logos/logo--white.svg" /> */}
				</RouterLink>
			</Toolbar>
		</AppBar>
	);
};

Topbar.propTypes = {
	className: PropTypes.string
};

export default Topbar;
