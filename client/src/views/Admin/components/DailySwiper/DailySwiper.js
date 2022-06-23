import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';

import Upload from '../Upload';

const DailySwiper = () => {
    const [isLoading, setLoading] = useState(true);
    const [imagesLoading, setImagesLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [swiperInterval, setSwiperInterval] = useState(3);
    const [swiperType, setSwiperType] = useState('horizontal');
    const [swiperCurrent, setSwiperCurrent] = useState([]);

    useEffect(() => {
        fetch('/api/v2/swiper')
            .then(response => response.json())
            .then(res => {
                console.log(res);
                const { interval, type, current } = res;
                setSwiperInterval(interval / 1000);
                setSwiperType(type);
                setSwiperCurrent(current);
                setLoading(false);
            })
            .catch(err => {
                console.log('An error has occurred on swiper config ', err);
                setLoading(false);
            });
        fetch('/api/v2/resource/images')
            .then(response => response.json())
            .then(res => {
                setImages(res);
                setImagesLoading(false);
            })
            .catch(err => {
                console.log('An error has occurred on swiper config ', err);
                setImagesLoading(false);
            });
        return () => {};
    }, []);

    const submit = e => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('interval', swiperInterval * 1000);
        formData.append('current', swiperCurrent);
        formData.append('type', swiperType);

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
        setSwiperInterval(e.target.value);
    };

    const handleScrollTypeChange = e => {
        console.log(e);
        setSwiperType(e.target.value);
    };

    const handleCurrentChange = image => {
        const { id } = image;
        if (swiperCurrent.includes(id)) {
            setSwiperCurrent(swiperCurrent.filter(item => item !== id));
        } else {
            setSwiperCurrent([...swiperCurrent, id]);
        }
    };

    if (isLoading || imagesLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-2 mt-2 flex flex-col space-y-5">
            <TextField
                value={swiperInterval}
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
                <RadioGroup row value={swiperType} onChange={handleScrollTypeChange}>
                    <FormControlLabel value="horizontal" control={<Radio />} label="水平" />
                    <FormControlLabel value="vertical" control={<Radio />} label="垂直" />
                </RadioGroup>
            </FormControl>
            <div className="grid grid-cols-4 gap-4">
                <div className="h-24 w-24">
                    <Upload />
                </div>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="h-24 w-24 relative border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-100 cursor-pointer select-none"
                        onClick={() => handleCurrentChange(image)}
                    >
                        <img src={image.src} className="absolute top-1/2 -translate-y-1/2"></img>
                        <div hidden={!swiperCurrent.includes(image.id)} className="absolute right-0.5 top-0.5">
                            <CheckCircle style={{ verticalAlign: 'top', color: 'rgb(74 222 128)' }} />
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={submit}>更新</button>
        </div>
    );
};

export default DailySwiper;

