import React, { useEffect, useState, useRef } from 'react';
import { Button, Typography, Card, Switch } from '@material-ui/core';

function VideoManager() {
    const [isLoading, setLoading] = useState(true);
    const inputRef = useRef(null);

    const [playMethod, setPlayMethod] = useState('circulation'); // continuous
    const [enabled, setEnabled] = useState(false);
    const [videos, setVideos] = useState([]);
    const [message, setMessage] = useState('');
    // const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const handleUpload = () => {
        inputRef.current.click();
    };

    const handleEnableChange = (event, value) => {
        setDisabled(true);
        let formData = new FormData();
        formData.append('enabled', value);
        fetch('/api/videos/setEnabled', {
            method: 'PUT',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setEnabled(value);
                setDisabled(false);
            })
            .catch(err => {
                setDisabled(false);
                console.error('enable/disable videos error', err);
            });
    };

    const handleFileChange = event => {
        const {
            nativeEvent: {
                target: { files }
            }
        } = event;
        const formData = new FormData();
        for (let file of files) {
            formData.append('videos', file);
        }
        formData.append(
            'settings',
            JSON.stringify({
                enabled,
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
                setMessage(response.message);
            })
            .catch(err => {
                console.error('upload failed', err);
                setMessage('Upload failed');
            });
    };

    useEffect(() => {
        fetch('/api/videos')
            .then(response => response.json())
            .then(response => {
                console.log(response, 99);
                const { settings, videos, error } = response;
                if (error) {
                    console.error('uninitialize settings', error);
                } else {
                    const { enabled, playMethod } = JSON.parse(settings);
                    setEnabled(enabled);
                    setPlayMethod(playMethod);
                    setVideos(videos);
                }
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
                    <span>启用:</span>
                    <Switch
                        checked={enabled}
                        disabled={disabled}
                        onChange={handleEnableChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </label>
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
            <p>{message}</p>
            <input type="file" ref={inputRef} onChange={handleFileChange} multiple style={{ display: 'none' }} />
            <Button onClick={handleUpload}>Upload video</Button>
        </Card>
    );
}

export default VideoManager;
