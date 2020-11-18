import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { Sidebar } from './components';

const useStyles = makeStyles(theme => ({
	root: {
		background: '#FFF',
		paddingTop: 56,
		height: '100%',
		[theme.breakpoints.up('sm')]: {
			paddingTop: 45
		}
	},
	shiftContent: {
		paddingLeft: 240
	},
	content: {
		height: '100%'
	}
}));

const Main = props => {
	const { children } = props;

	const classes = useStyles();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
		defaultMatches: true
	});

	const [openSidebar, setOpenSidebar] = useState(false);

	// const handleSidebarOpen = () => {
	// 	setOpenSidebar(true);
	// };

	const handleSidebarClose = () => {
		setOpenSidebar(false);
	};

	// const handleFullScreen = () => {
	// 	let element = document.documentElement;
	// 	if (element.requestFullscreen) {
	// 		element.requestFullscreen();
	// 	} else if (element.mozRequestFullScreen) {
	// 		element.mozRequestFullScreen();
	// 	} else if (element.webkitRequestFullscreen) {
	// 		element.webkitRequestFullscreen();
	// 	} else if (element.msRequestFullscreen) {
	// 		element.msRequestFullscreen();
	// 	}
	// };

	const shouldOpenSidebar = isDesktop ? true : openSidebar;

	return (
		<div
			className={clsx({
				[classes.root]: true,
				[classes.shiftContent]: isDesktop
			})}
		>
			{/* <Topbar
				onSidebarOpen={handleSidebarOpen}
				onFullScreen={handleFullScreen}
			/> */}
			<Sidebar
				onClose={handleSidebarClose}
				open={shouldOpenSidebar}
				variant={isDesktop ? 'persistent' : 'temporary'}
			/>
			<main className={classes.content}>
				{children}
			</main>
		</div>
	);
};

Main.propTypes = {
	children: PropTypes.node
};

export default Main;
