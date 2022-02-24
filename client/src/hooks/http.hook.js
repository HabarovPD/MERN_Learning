// тут нихрена не понятно нужно разбираться 

import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback (async ( url, metod = "GET", body = null, headers = {} ) => {
        
        setLoading(true);
        
        try {
            const response = await fetch(url, { metod, body, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error( data.message || 'Что-то пошло не так');
            }
            return data;

        } catch (error) {
            setError(error.message);
            throw error;

        } finally {
            setLoading(false);

        }

    }, []);

    const clearError = () => setError(null);

    return {loading, request, error, clearError};
}