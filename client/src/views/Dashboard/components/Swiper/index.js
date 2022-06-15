import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Scrollbar, Pagination } from 'swiper';

import 'swiper/css';

function ImageSwiper() {
    const [isLoading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [scrollInterval, setScrollInterval] = useState(3000);
    const [scrollType, setScrollType] = useState('horizontal');
    useEffect(() => {
        fetch('/api/swiperImages')
            .then(response => response.json())
            .then(res => {
                const { file, scroll_type, setting_time } = res.data;
                setImages([...file]);
                setScrollType(scroll_type);
                setScrollInterval(setting_time);
                setLoading(false);
            })
            .catch(err => {
                console.log('An error has occurred on fetch images', err);
                setLoading(false);
            });
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ maxHeight: 550, overflow: 'hidden', marginTop: 35 }}>
            <Swiper
                modules={[Autoplay, Scrollbar, Pagination]}
                initialSlide={0}
                speed={scrollInterval}
                direction={scrollType}
                loop={true}
                spaceBetween={0}
                slidesPerView={1}
                height={550}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img style={{ height: '100%', width: '100%', objectFit: 'fill' }} src={`data:image/png;base64,${image}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ImageSwiper;
