import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Daily, DailySwiper, Employee } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0),
        backgroundColor: '#f5f5f5',
        height: '100vh'
    }
}));

const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={5} justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item lg={2} sm={6} xl={2} xs={12}>
                    <Daily style={{ padding: 15, backgroundColor: '#fff' }} />
                </Grid>
                <Grid item lg={2} sm={6} xl={2} xs={12}>
                    <Employee style={{ padding: 15, backgroundColor: '#fff' }} />
                </Grid>
                <Grid item lg={2} sm={6} xl={2} xs={12}>
                    <DailySwiper style={{ padding: 15, backgroundColor: '#fff' }} />
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;

