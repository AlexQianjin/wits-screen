import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
	Budget,
	TotalUsers,
	TasksProgress,
	TotalProfit
} from './components';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}));

const Dashboard = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}
			>
				<Grid
					item
					lg={2}
					sm={6}
					xl={2}
					xs={12}
				>
					<Budget />
				</Grid>
				<Grid
					item
					lg={2}
					sm={6}
					xl={2}
					xs={12}
				>
					<TotalUsers />
				</Grid>
				<Grid
					item
					lg={2}
					sm={6}
					xl={2}
					xs={12}
				>
					<TasksProgress />
				</Grid>
				<Grid
					item
					lg={6}
					sm={6}
					xl={6}
					xs={12}
				>
					<TotalProfit />
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
