import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardMedia, Grid } from '@material-ui/core';

import Time from './Time';
import Date from './Date';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	content: {
		alignItems: 'center',
		display: 'flex'
	},
	title: {
		fontWeight: 700
	},
	avatar: {
		backgroundColor: theme.palette.error.main,
		height: 56,
		width: 56
	},
	icon: {
		marginTop: 34,
		marginLeft: 48
	},
	difference: {
		marginTop: theme.spacing(2),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		height: 'auto'
	},
	differenceIcon: {
		color: theme.palette.error.dark
	},
	differenceValue: {
		color: theme.palette.error.dark,
		marginRight: theme.spacing(1)
	},
	beijingTime: {
		marginTop: 48,
		marginLeft: 40
	}
}));

const DateTime = props => {
	const { className, ...rest } = props;

	const classes = useStyles();

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}
		>
			<CardContent style={{padding: 0}}>
				<Grid
					container
					justifyContent="space-between"
				>
					<Grid item>
						<CardMedia
							component="img"
							alt="Wistron ITS"
							image="./images/img_logo.png"
							title="Wistron ITS"
							className={classes.icon}
						></CardMedia>
					</Grid>
				</Grid>
				<div
					className={classes.difference}
					style={{width: '553px', height: '358px', backgroundImage: 'url("./images/img_bg_time.png")', marginTop: '78px', marginLeft: '104px'}}
				>
					<Time />
					<div>
						<Date/>
					</div>
				</div>
				<Grid
					container
					justifyContent="space-between"
				>
					<Grid item>
						<CardMedia
							component="img"
							alt="Beijing Time"
							image="./images/img_leftblock.png"
							title="Beijing Time"
							className={classes.beijingTime}
						></CardMedia>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

DateTime.propTypes = {
	className: PropTypes.string
};

export default DateTime;
