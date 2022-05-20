import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, CardMedia } from '@material-ui/core';
import Swiper from './../Swiper';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700,
        marginTop: '16px'
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

const Daily = props => {
    const { className, ...rest } = props;
    let [singlePic, setSinglePic] = useState('./recommanded-image.png');
    let [isSwiper, setIsSwiper] = useState();
    // let [rollPicType, setRollPicType] = useState('leftright');
    const classes = useStyles();

    useEffect(() => {
        fetch('/api/swiperImages/isopen', {})
            .then(res => res.json())
            .then(data => {
                console.log('isopen:', data);
                if (data.status === 200) {
                    setIsSwiper(data.isopen ? true : false);
                } else {
                    setIsSwiper(false);
                }
            });

        // fetch('/api/swiperImages/getRollPicType', {})
        // 	.then(res => res.json())
        // 	.then(data => {
        // 		if (data.status === 200) {
        // 			setRollPicType(data.roll_pic_type);
        // 		} else {
        // 			console.log("roll type err");
        // 			setRollPicType('leftright');
        // 		}
        // 	});

        fetch('/api/images', {})
            .then(res => res.json())
            .then(data => {
                console.log('imagedata:', data);
                data = data.data;
                setSinglePic('data:image/png;base64,' + data.file);
            });
        // setIsSwiper(true);
    }, []);

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent style={{ paddingBottom: '0px' }}>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <div style={{ width: '48px', height: '8px', marginTop: '26px', backgroundColor: '#ef3246' }}></div>
                        <Typography className={classes.title} gutterBottom variant="h3">
                            每日推荐
                        </Typography>
                    </Grid>
                    <Grid item>
                        <div
                            style={{
                                width: '480px',
                                height: '61px',
                                marginTop: '30px',
                                marginRight: '5px',
                                backgroundImage: 'url("./images/img_rightblock.png")'
                            }}
                        ></div>
                    </Grid>
                </Grid>
                {
                    // type={rollPicType}
                    isSwiper ? (
                        <Swiper />
                    ) : (
                        <CardMedia component="img" alt="Daily" image={singlePic} title="Daily" style={{ marginTop: '35px' }}></CardMedia>
                    )
                }
            </CardContent>
        </Card>
    );
};

Daily.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string
};

export default Daily;

