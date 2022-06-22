import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import Upload from '../Upload';

const DailySwiper = () => {
    const [isLoading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [swiperInterval, setSwiperInterval] = useState(3);
    const [swiperType, setSwiperType] = useState('horizontal');
    const [swiperCurrent, setSwiperCurrent] = useState([]);

    useEffect(() => {
        fetch('/api/v2/swiper')
            .then(response => response.json())
            .then(res => {
                console.log(res);
                const { interval, type, current } = res.data;
                setSwiperInterval(interval / 1000);
                setSwiperType(type);
                setSwiperCurrent(current);
                setImages([]);
                setLoading(false);
            })
            .catch(err => {
                console.log('An error has occurred on swiper config ', err);
                setLoading(false);
            });
        return () => {};
    }, []);

    const submit = e => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('swiperTime', scrollTime * 1000);
        formData.append('isopen', isOpen);
        formData.append('scrollType', scrollType);

        fetch('/api/swiperImages', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    // setUploadStatus('Update Successfully!');
                } else {
                    // setUploadStatus('Update Failed!');
                }
            })
            .catch(err => {
                console.log(err);
                // setUploadStatus('Update Failed!');
            });
    };

    const handleScrollTimeChange = e => {
        setScrollTime(e.target.value);
    };

    const handleScrollTypeChange = e => {
        console.log(e);
        setScrollType(e.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-2 mt-2 flex flex-col space-y-5">
            <TextField
                value={scrollTime}
                onChange={handleScrollTimeChange}
                label="滚动间隔"
                variant="outlined"
                type="number"
                inputProps={{
                    min: 1,
                    max: 150
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">秒</InputAdornment>
                }}
            />
            <FormControl>
                <FormLabel>滚动方向</FormLabel>
                <RadioGroup row value={scrollType} onChange={handleScrollTypeChange}>
                    <FormControlLabel value="horizontal" control={<Radio />} label="水平" />
                    <FormControlLabel value="vertical" control={<Radio />} label="垂直" />
                </RadioGroup>
            </FormControl>
            <div className="grid grid-cols-4 gap-4">
                <div className="h-24 w-24">
                    <Upload />
                </div>
                {images.map((image, index) => (
                    <img key={index} className="h-24 w-24" src={image}></img>
                ))}
            </div>
            <button onClick={submit}>更新</button>
        </div>
    );
};

export default DailySwiper;

