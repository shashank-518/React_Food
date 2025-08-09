import { useCallback, useEffect, useState } from "react";

async function sendhttprequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(
            resData.message || "Something went wrong. Failed to send a request"
        );
    }

    return resData;
}

export default function usehttp(url, config, initialData) {
    const [error, setError] = useState(null);
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async (data) => {
        setIsLoading(true);
        setError(null); // Reset error before sending a new request
        try {
            const resData = await sendhttprequest(url, {...config,  body: data});
            setData(resData);
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if (!config || config.method === 'GET' || !config.method) {
            sendRequest();
        }
    }, [sendRequest]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
    };
}
