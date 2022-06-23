import React, { useState, useEffect } from 'react';

import { Tabs, Tab } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';

import { Daily, DailySwiper, Employee } from './components';

const mapping = ['image', 'swiper', 'video'];

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [tab, setTab] = useState(0);
    const [activity, setActivity] = useState('image');

    const handleTabChange = (e, newValue) => {
        console.log(newValue);
        setTab(newValue);
    };

    const handleActive = () => {
        fetch('/api/v2/settings', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                enable: mapping[tab]
            })
        })
            .then(response => response.json())
            .then(res => {
                const { status, message } = res;
                if (status === 200) {
                    setActivity(mapping[tab]);
                } else {
                    throw new Error(message);
                }
            })
            .catch(err => {
                console.log('Has an error occurred during change enable function', err);
            });
    };

    useEffect(() => {
        fetch('/api/v2/settings')
            .then(response => response.json())
            .then(res => {
                const { enable } = res;
                setActivity(enable);
                setLoading(false);
            })
            .catch(err => {
                console.log('has an error occurred during fetch the settings', err);
                setLoading(false);
            });
        return () => {};
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen bg-gray-100 relative antialiased">
            <div className="p-4 md:py-8 xl:px-20 md:mx-w-6xl md:mx-auto">
                <div className="hidden lg:flex lg:justify-between lg:items-center">
                    <a href="#" className="flex items-start gap-2 group">
                        <div className="bg-blue-600 text-white p-2 rounded-md group-hover:bg-blue-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <p className="text-sm font-light uppercase">
                            WISTRONITS
                            <span className="text-base block font-bold tracking-widest">SCREEN</span>
                        </p>
                    </a>
                    <ul className="flex items-center gap-6">
                        <li>
                            <a href="#" className="text-sm font-sans text-gray-800 font-semibold tracking-wider">
                                Admin
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:px-20 gap-y-4 md:gap-6">
                <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-sm text-gray-600 font-bold tracking-wide">轮播</h2>
                    </div>
                    <div>
                        <Tabs value={tab} onChange={handleTabChange}>
                            <Tab
                                label={
                                    <span>
                                        {activity === 'image' ? (
                                            <CheckCircle style={{ verticalAlign: 'top', color: 'rgb(74 222 128)' }} />
                                        ) : (
                                            ''
                                        )}
                                        图片
                                    </span>
                                }
                            />
                            <Tab
                                label={
                                    <span>
                                        {activity === 'swiper' ? (
                                            <CheckCircle style={{ verticalAlign: 'top', color: 'rgb(74 222 128)' }} />
                                        ) : (
                                            ''
                                        )}
                                        轮播
                                    </span>
                                }
                            />
                            <Tab
                                label={
                                    <span>
                                        {activity === 'video' ? (
                                            <CheckCircle style={{ verticalAlign: 'top', color: 'rgb(74 222 128)' }} />
                                        ) : (
                                            ''
                                        )}
                                        视频
                                    </span>
                                }
                            />
                        </Tabs>
                        <div hidden={tab !== 0}>
                            <div className="flex items-center justify-start w-full p-2">
                                <Daily />
                            </div>
                        </div>
                        <div hidden={tab !== 1}>
                            <div>
                                <DailySwiper />
                            </div>
                        </div>
                        <div hidden={tab !== 2}></div>
                    </div>
                    <button
                        className="px-4 py-2 text-xs bg-green-300 text-white rounded uppercase tracking-wider font-semibold hover:bg-green-400"
                        onClick={handleActive}
                    >
                        启用
                    </button>
                </div>
                <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-50 flex flex-col">
                    <Employee />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

