import axios from 'axios';
import React, {useState, useEffect} from 'react';

const useFetch = (query) => {
    let url = `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${query.maxCalories}&number=${query.number}&apiKey=46cbcdcfbf4f4023a15365db9560c056`;
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
    const refetch = (newQuery) => {
        let newURL = `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${newQuery.maxCalories}&number=3&apiKey=46cbcdcfbf4f4023a15365db9560c056`;
        setLoading(true);
        fetchData(newURL);
    }

    return {data, loading, error, refetch};
}
export default useFetch