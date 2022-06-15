import React, { useState } from 'react';

import { Tabs, Tab } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';

// import { Daily, DailySwiper, Employee } from './components';

const Dashboard = () => {
    const [tab, setTab] = useState(0);

    const handleTabChange = (e, newValue) => {
        console.log(newValue);
        setTab(newValue);
    };
    return (
        <div className="h-screen bg-gray-100 relative antialiased">
            {/* <Grid container spacing={0}>
                <Grid item lg={2} sm={6} xl={2} xs={12}>
                    <Daily />
                </Grid>
                <Grid item lg={2} sm={6} xl={2} xs={12}>
                    <Employee />
                </Grid>
                <Grid item lg={2} sm={6} xl={2} xs={12}>
                    <DailySwiper />
                </Grid>
            </Grid> */}
            <div className="p-4 md:py-8 xl:px-20 md:container md:mx-w-6xl md:mx-auto">
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
                                        <CheckCircle style={{ verticalAlign: 'top', color: 'rgb(74 222 128)' }} /> 图片
                                    </span>
                                }
                            />
                            <Tab label="轮播" />
                            <Tab label="视频" />
                        </Tabs>
                        <div hidden={tab !== 0}>
                            <div className="flex items-center justify-center w-full p-2">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-10 h-10 mb-3 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            ></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">点击上传</span>或者将文件拖拽到此区域
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">图片格式支持PNG, JPG</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                        <div hidden={tab !== 1}>轮播设置</div>
                        <div hidden={tab !== 2}>视频设置</div>
                    </div>
                    <button className="px-4 py-2 text-xs bg-green-300 text-white rounded uppercase tracking-wider font-semibold hover:bg-green-400">
                        启用
                    </button>
                </div>
                <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-sm text-gray-600 font-bold tracking-wide">员工信息</h2>
                        <button className="px-4 py-2 text-xs bg-green-300 text-white rounded uppercase tracking-wider font-semibold hover:bg-green-400">
                            上传
                        </button>
                    </div>
                    <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p className="px-4 font-semibold">Today</p>
                            <p className="px-4 text-gray-600">McDonald</p>
                            <p className="px-4 tracking-wider">Cash</p>
                            <p className="px-4 text-blue-600">Food</p>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p className="px-4 font-semibold">Today</p>
                            <p className="px-4 text-gray-600">McDonald</p>
                            <p className="px-4 tracking-wider">Cash</p>
                            <p className="px-4 text-blue-600">Food</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

