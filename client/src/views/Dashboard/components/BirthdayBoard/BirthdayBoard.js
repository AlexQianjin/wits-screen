import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

import Birthday from './Birthday';

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
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		height: 56,
		width: 56
	},
	icon: {
		height: 32,
		width: 32
	},
	progress: {
		marginTop: theme.spacing(3)
	}
}));

const BirthdayBoard = props => {
	const { className, ...rest } = props;

	const classes = useStyles();

	const employees = [
		{name: 'Alex', department: 'IC3422'},
		{name: 'Alex', department: 'IC3422'},
		{name: 'Alex', department: 'IC3422'},
		{name: 'Alex', department: 'IC3422'},
		{name: 'Alex', department: 'IC3422'},
		{name: 'Alex', department: 'IC3422'}
	];

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
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
							variant="h3"
						>
							今日寿星
						</Typography>
					</Grid>
				</Grid>
				<Grid
					container
					justify="space-between"
				>
					{employees.map((e, index) => {
						return (
							<Grid
								key={index}
								item
							>
								<Birthday
									name={e.name}
									department={e.department}
								>
								</Birthday>
							</Grid>
						);
					})}
				</Grid>
			</CardContent>
		</Card>
	);
};

BirthdayBoard.propTypes = {
	className: PropTypes.string
};

export default BirthdayBoard;
