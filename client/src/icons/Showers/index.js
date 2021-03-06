import React from 'react';

// Material components
import { SvgIcon } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => createStyles({
	root: {
		color: theme.palette.white,
		width: '4em',
		height: '4em'
	}
}));

export default function Showers(props) {
	const classes = useStyles(props);
	return (
		<SvgIcon
			{...props}
			viewBox="0 0 1000 1000"
			className={classes.root}
		>
			<path d="M646.14,929.36a37.46,37.46,0,0,1-10.26-51.82L736.28,727.6a37.35,37.35,0,0,1,62.08,41.55L698,919.1a37.47,37.47,0,0,1-51.82,10.26ZM600.65,333.5,312.16,724H446.1V935.64l234-316.78h-156ZM124,929.36a37.45,37.45,0,0,1-10.26-51.82L214.1,727.6a37.35,37.35,0,0,1,62.08,41.55l-100.4,150A37.47,37.47,0,0,1,124,929.36Z"/><path d="M757,263.43C713.4,160.92,611.81,89,493.38,89c-137.08,0-251.52,96.39-279.6,225.05a174.33,174.33,0,0,0,18.15,347.66h76.44L363.55,587H231.93a99.6,99.6,0,0,1-10.46-198.65l53.76-5.58L286.76,330c21-96.34,107.92-166.26,206.62-166.26A211.47,211.47,0,0,1,688.25,292.66l19.1,44.95,48.83.52c67.93.75,123.15,56.55,123.15,124.4A124.64,124.64,0,0,1,754.83,587h-9l-55.18,74.71h64.14c110,0,199.2-89.19,199.2-199.21C954,353.25,866,264.63,757,263.43Z" />
		</SvgIcon>
	);
}
