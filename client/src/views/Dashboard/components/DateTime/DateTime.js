import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';

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
		height: 32,
		width: 32
	},
	difference: {
		marginTop: theme.spacing(2),
		display: 'flex',
		alignItems: 'center'
	},
	differenceIcon: {
		color: theme.palette.error.dark
	},
	differenceValue: {
		color: theme.palette.error.dark,
		marginRight: theme.spacing(1)
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
			<CardContent>
				<Grid
					container
					justify="space-between"
				>
					<Grid item>
						<CardMedia
							component="img"
							alt="Wistron ITS"
							image="./images/img_logo.png"
							title="Wistron ITS"
						></CardMedia>
					</Grid>
				</Grid>
				<div className={classes.difference}>
					<Typography
						className={classes.title}
						variant="h3"
					>
						<Time />
					</Typography>
				</div>
				<div className={classes.difference}>
					<Typography
						className={classes.title}
						variant="h3"
					>
						<Date/>
					</Typography>
				</div>
				<Grid
					container
					justify="space-between"
				>
					<Grid item>
						<CardMedia
							component="img"
							alt="Beijing Time"
							image="./images/img_leftblock.png"
							title="Beijing Time"
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