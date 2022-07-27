import React, { useEffect, useState, useRef } from 'react';
import { Button, Typography, Card } from '@material-ui/core';

function VideoManager() {
    const [isLoading, setLoading] = useState(true);
    const inputRef = useRef(null);

    const [playMethod, setPlayMethod] = useState('circulation'); // continuous
    const [videos, setVideos] = useState([]);

    const handleUpload = () => {
        inputRef.current.click();
    };

    const handleFileChange = event => {
        console.log(event);
        const {
            nativeEvent: {
                target: { files }
            }
        } = event;
        const formData = new FormData();
        for (let file of files) {
            formData.append('video', file);
        }
        formData.append(
            'settings',
            JSON.stringify({
                playMethod
            })
        );
        fetch('/api/videos/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.error('upload failed', err);
            });
    };

    useEffect(() => {
        fetch('/api/videos')
            .then(response => response.json())
            .then(response => {
                console.log(response, 99);
                const {
                    settings: { playMethod },
                    videos,
                    error
                } = response;
                if (error) {
                    console.error('uninitialize settings', error);
                }
                setPlayMethod(playMethod);
                setVideos(videos);
                setLoading(false);
            })
            .catch(err => {
                console.log('get videos error', err);
            });
        return () => {};
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <Card style={{ color: '#333' }}>
            <Typography style={{ fontWeight: 700, color: '#000', marginTop: '16px' }} gutterBottom variant="h3">
                视频
            </Typography>
            <div>
                <label>
                    <p>播放方式:</p>
                    <span>循环：</span>
                    <input
                        type="radio"
                        name="open"
                        value="true"
                        checked={playMethod === 'circulation'}
                        onChange={() => {
                            setPlayMethod('circulation');
                        }}
                    />
                    <span>连续：</span>
                    <input
                        type="radio"
                        name="open"
                        value="false"
                        checked={playMethod === 'continuous'}
                        onChange={() => {
                            setPlayMethod('continuous');
                        }}
                    />
                </label>
            </div>
            {videos.map((video, index) => (
                <p key={index}>{video}</p>
            ))}
            <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} />
            <Button onClick={handleUpload}>Upload video</Button>
        </Card>
    );
}

export default VideoManager;
