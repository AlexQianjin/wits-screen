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

export default function LittleRain(props) {
	const classes = useStyles(props);
	return (
		<SvgIcon
			{...props}
			viewBox="0 0 1000 1000"
			className={classes.root}
		>
			<path d="M752,297h-2.12C734.24,179.6,633.71,89,512,89S289.76,179.6,274.12,297H272C157.12,297,64,390.12,64,505s93.12,208,208,208H752c114.88,0,208-93.12,208-208S866.88,297,752,297Zm0,352H272A144,144,0,1,1,416,505a32,32,0,0,0,64,0c0-92.06-59.81-170.14-142.69-197.53A176,176,0,0,1,688,329v2.63a31.88,31.88,0,0,0,31.44,32.31,31.45,31.45,0,0,0,6.13-.51,144.72,144.72,0,0,1,24.3-2.43H752a144,144,0,0,1,0,288Z"/><path d="M400,809a48,48,0,1,0,48-48A48,48,0,0,0,400,809Z"/><path d="M608,889a48,48,0,1,0,48-48,48,48,0,0,0-48,48Z" />
		</SvgIcon>
	);
}
