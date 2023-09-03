import axios from 'axios';
import React, {useState, useEffect} from 'react';

const useFetchDetail = (id) => {
    const apiKey = '3a167bb1fe8943639f38c85d6c042a73'

    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const  [error, setError] = useState();

    //define async function that fetches data from API
    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            alert(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    //useEffect to fetch data when query changes
    useEffect(() => {
        fetchData(url);
    }, []);

    //define refetch function
    const refetch = (id) => {
        const newURL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
        setLoading(true);
        fetchData(newURL);
    }

    return {data, loading, error, refetch};
}
export default useFetchDetail