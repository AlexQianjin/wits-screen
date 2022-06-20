import React, { useState, useEffect } from 'react';
import Upload from '../Upload';

const Daily = () => {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    // const handleFileUpload = e => {
    //     console.log(e.target.files[0]);
    //     setSeletedFile(e.target.files[0]);
    // };

    // const handleSubmit = e => {
    //     e.preventDefault();

    //     let formData = new FormData();
    //     formData.append('image', seletedFile);
    //     fetch('/api/images', { method: 'POST', body: formData })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             if (data.status) {
    //                 setUploadStatus('Update Successfully!');
    //             } else {
    //                 setUploadStatus('Update Failed!');
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setUploadStatus('Update Failed!');
    //         });
    // };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setImages([]);
        }, 1000);
        return () => {};
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="h-24 w-24">
                <Upload />
            </div>
            {images.map((image, index) => (
                <img key={index} className="h-24 w-24" src={image}></img>
            ))}
        </div>
    );
};

export default Daily;

