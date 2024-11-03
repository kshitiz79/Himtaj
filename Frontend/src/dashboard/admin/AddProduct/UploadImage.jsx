import React, { useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseURL';

const UploadImage = ({ name, setImage, multiple = false }) => {
    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState([]);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadSingleImage = (base64) => {
        setLoading(true);
        return axios
            .post(`${getBaseUrl()}/api/uploadImage`, { image: base64 })
            .then((res) => {
                const imageUrl = res.data;
                setUrls((prev) => [...prev, imageUrl]);
                setLoading(false);
                return imageUrl;
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const uploadImages = async (event) => {
        const files = event.target.files;
        const uploadedUrls = [];

        for (let i = 0; i < files.length; i++) {
            const base64 = await convertBase64(files[i]);
            const url = await uploadSingleImage(base64);
            if (url) {
                uploadedUrls.push(url);
            }
        }

        setImage(multiple ? uploadedUrls : uploadedUrls[0]);
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {multiple ? 'Upload Additional Images' : 'Upload Main Image'}
            </label>
            <input
                onChange={uploadImages}
                name={name}
                id={name}
                type="file"
                multiple={multiple}
                className="add-product-InputCSS"
            />
            {loading && <p className="mt-2 text-sm text-blue-600">Uploading...</p>}
            {urls.length > 0 && (
                <div className="mt-2 text-sm text-green-600">
                    <p>Images uploaded successfully!</p>
                    <div className="flex gap-2">
                        {urls.map((url, index) => (
                            <img key={index} src={url} alt={`Uploaded ${index + 1}`} className="w-20 h-20 rounded" />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
