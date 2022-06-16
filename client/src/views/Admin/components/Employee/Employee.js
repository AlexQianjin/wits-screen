import React, { useState, useEffect, useRef } from 'react';
import { Snackbar } from '@material-ui/core';

const Employee = props => {
    const [loading, setLoading] = useState(true);
    const [empolyees, setEmpolyees] = useState([]);
    const uploadRef = useRef(null);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');

    const getAllEmployees = () => {
        setLoading(true);
        return fetch('/api/employees/getall')
            .then(response => response.json())
            .then(response => {
                const { result } = response;
                console.log(result);
                setEmpolyees(result);
                setLoading(false);
            });
    };

    const alertMessage = message => {
        setSnackMessage(message);
        setSnackOpen(true);
    };

    const handleSnackClose = () => {
        setSnackMessage('');
        setSnackOpen(false);
    };

    const handleFileChange = event => {
        const {
            target: { files }
        } = event;
        let formData = new FormData();
        formData.append('excel', files[0]);
        fetch('/api/employees', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    alertMessage('Update Successfully!');
                    getAllEmployees();
                } else {
                    alertMessage('Update Failed!');
                }
            })
            .catch(err => {
                console.log(err);
                alertMessage('Update Failed!');
            });
    };

    const handleUpload = () => {
        uploadRef.current.click();
    };

    useEffect(() => {
        getAllEmployees();
        // let interval = setInterval(() => {
        // 	getAllEmployees();
        // }, 30000);
        // return () => {
        // 	clearInterval(interval);
        // };
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-sm text-gray-600 font-bold tracking-wide">员工信息({empolyees.length})</h2>
                <button
                    className="px-4 py-2 text-xs bg-green-300 text-white rounded uppercase tracking-wider font-semibold hover:bg-green-400"
                    onClick={handleUpload}
                >
                    上传
                </button>
                <input
                    hidden
                    type="file"
                    onChange={handleFileChange}
                    ref={uploadRef}
                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
            </div>
            {loading ? (
                'loading...'
            ) : (
                <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full max-h-56">
                    {empolyees.length === 0
                        ? 'There is empty.'
                        : empolyees.map((empolyee, index) => (
                              <li key={index} className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                                  <p className="px-4 font-semibold">{empolyee[0]}</p>
                                  <p className="px-4 text-gray-600">{empolyee[2]}</p>
                                  <p className="px-4 tracking-wider">{empolyee[4]}</p>
                              </li>
                          ))}
                </ul>
            )}
            <Snackbar open={snackOpen} message={snackMessage} onClose={handleSnackClose} autoHideDuration={3000} />
        </div>
    );
};

export default Employee;

