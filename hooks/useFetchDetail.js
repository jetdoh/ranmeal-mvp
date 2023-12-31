//we don't use this custom hook anymore

import axios from 'axios';
import React, {useState, useEffect} from 'react';

const useFetchDetail = (id) => {
    const apiKey = '207f6e05209e4a6eba9308ec98be4692'

    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const  [error, setError] = useState();

    console.log("detail is fetched!")

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