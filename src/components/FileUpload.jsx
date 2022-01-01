import React from 'react';
import { IKUpload, IKContext } from 'imagekitio-react';
import configKeys from '../config/keys';
import { useState } from 'react';
import { useEffect } from 'react';


const urlEndpoint = `https://ik.imagekit.io/${configKeys.REACT_APP_IMAGEKIT_ID}`;

const TestFileUpload = (props) => {
    const setFileUploadLink = props.setFileUploadLink;

    const [tempFolderName, setTempFolderName] = useState('');
    const [tempFilerName, setTempFilerName] = useState('');

    const [fileUploadLoading, setFileUploadLoading] = useState(false);
    const [fileUploadSuccess, setFileUploadSuccess] = useState('');
    const [fileUploadError, setFileUploadError] = useState('');

    useEffect(() => {
        getFolderName();
    }, []);

    const getFolderName = () => {
        const currentDate = new Date();

        console.log(configKeys);
        let curEnv = configKeys.REACT_APP_CUSTOM_ENV;
        if (curEnv === 'production') {
        } else {
            curEnv = 'development';
        }

        const curYear = currentDate.getFullYear();
        const curMonth = currentDate.getMonth();
        const curDate = currentDate.getDate();
        const curHours = currentDate.getHours();
        const curMinutes = currentDate.getMinutes();

        const temp = `/userUpload/${curEnv}/${curYear}/${curMonth}/${curDate}/${curHours}/${curMinutes}`;
        setTempFolderName(temp);

        const tempFile = `${curYear}_${curMonth}_${curDate}_${curHours}_${curMinutes}`;
        setTempFilerName(tempFile);
    };

    const fileUploading = () => {
        setFileUploadLoading(true);
        setFileUploadSuccess('');
        setFileUploadError('');
    };

    const fileUploadSuccessFunc = (e) => {
        setFileUploadLink(e.url);

        setFileUploadLoading(false);
        setFileUploadSuccess('File Uploaded Successfully');
        setFileUploadError('');
    };

    const fileUploadErrorFunc = (e) => {
        setFileUploadLoading(false);
        setFileUploadSuccess('');
        setFileUploadError('Some unexpected Error occur. Please try again');
    };

    return (
        <div>
            <IKContext
                publicKey={configKeys.REACT_APP_IMAGEKIT_PUBLICKEY}
                urlEndpoint={urlEndpoint}
                transformationPosition="path"
                authenticationEndpoint={`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/common/fileUpload/getImageKitAuth`}
            >
                <IKUpload
                    fileName={`userUpload_${tempFilerName}.jpg`}
                    folder={tempFolderName}
                    onChange={() => {
                        fileUploading();
                    }}
                    onSuccess={(e) => {
                        fileUploadSuccessFunc(e);
                    }}
                    onError={(e) => {
                        fileUploadErrorFunc(e);
                    }}
                />
            </IKContext>
            {fileUploadLoading && <div className="text-info">Uploading...</div>}
            {fileUploadSuccess && (
                <div className="text-success">{fileUploadSuccess}</div>
            )}
            {fileUploadError && (
                <div className="text-danger">{fileUploadError}</div>
            )}
        </div>
    );
};

export default TestFileUpload;
