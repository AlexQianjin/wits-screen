import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Daily, DailySwiper, Employee, VideoManager } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0)
    }
}));

const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0} style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
                <Grid item lg={2} sm={6} xl={2} xs={12}>
                    <Daily />
                </Grid>
                <Grid item lg={2} sm={6} xl={2} xs={12}>
                    <Employee />
                </Grid>
                <Grid item lg={2} sm={6} xl={2} xs={12}>
                    <DailySwiper />
                </Grid>
                <Grid item lg={2} sm={6} xl={2} xs={12}>
                    <VideoManager />
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;

