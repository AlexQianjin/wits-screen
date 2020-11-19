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

export default function TorrentialRain(props) {
	const classes = useStyles(props);
	return (
		<SvgIcon
			{...props}
			viewBox="0 0 1000 1000"
			className={classes.root}
		>
			<path d="M777.13,342.6l-43.74-7.48-14.26-42c-40.21-117.32-167.7-179.77-284.77-139.47A224.37,224.37,0,0,0,295.2,293.14l-14.26,42L237.2,342.6c-67.59,12-112.64,76.68-100.64,144.41A124.35,124.35,0,0,0,258.38,589.79H756.06c68.64-.29,124-56.3,123.75-125.09A124.48,124.48,0,0,0,777.25,342.6ZM955,465.32c-.09,110.08-89.2,199.25-199,199.17H258.24c-109.74.3-199-88.61-199.26-198.6C58.71,368.53,128.72,285.24,224.5,269,278.22,112.57,448.28,29.42,604.34,83.25A299.2,299.2,0,0,1,789.66,269C885.1,285.38,954.89,368.27,955,465.32ZM191.76,727.38A37.33,37.33,0,1,1,262.6,751L225.28,863a37.33,37.33,0,1,1-70.84-23.6ZM378,728.46a37.33,37.33,0,0,1,71.52,21.44l-56,186.74a37.33,37.33,0,0,1-71.52-21.44Zm187-1.08A37.33,37.33,0,1,1,635.84,751h0L598.51,863a37.33,37.33,0,1,1-70.84-23.6Zm186.28,1.08a37.33,37.33,0,0,1,71.51,21.44l-56,186.74a37.33,37.33,0,0,1-71.51-21.44Z" />
		</SvgIcon>
	);
}
