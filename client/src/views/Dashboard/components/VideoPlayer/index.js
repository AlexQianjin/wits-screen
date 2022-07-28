import React, { useEffect, useState, useRef } from 'react';

function VideoPlayer() {
    const [isLoading, setLoading] = useState(true);
    const [currentPlay, setCurrentPlay] = useState(1);
    const [playMethod, setPlayMethod] = useState('');
    const [videos, setVideos] = useState([]);
    const videoRef = useRef(null);
    useEffect(() => {
        fetch('/api/videos')
            .then(response => response.json())
            .then(response => {
                console.log(response);
                const { settings, videos } = response;
                const { playMethod } = JSON.parse(settings);
                setPlayMethod(playMethod);
                setVideos(videos);
                setLoading(false);
            });
        return () => {};
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleEnded = () => {
        console.log('0-0909');
        videoRef.current.src = `./videos/${videos[currentPlay]}`;
        videoRef.current.load();
        videoRef.current.play();
        setCurrentPlay(old => {
            if (old >= videos.length - 1) {
                return 0;
            }
            return old + 1;
        });
    };

    const displayVideo = () => {
        if (playMethod === 'circulation') {
            return (
                <video
                    width="100%"
                    height={550}
                    style={{ border: '1px solid white' }}
                    autoPlay="autoplay"
                    src={`./videos/${videos[0]}`}
                    loop
                    muted
                    ref={videoRef}
                ></video>
            );
        }
        if (playMethod === 'continuous') {
            return (
                <video
                    width="100%"
                    height={550}
                    style={{ border: '1px solid white' }}
                    autoPlay="autoplay"
                    src={`./videos/${videos[currentPlay]}`}
                    onEnded={handleEnded}
                    muted
                    ref={videoRef}
                ></video>
            );
        }
        return <div>Please select play method</div>;
    };
    return <div>{displayVideo()}</div>;
}

export default VideoPlayer;
