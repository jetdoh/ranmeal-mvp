import axios from 'axios';
import React, {useState, useEffect} from 'react';

const useFetch = (query) => {
    const rangeCalories = 200;
    const rangeProtein = 10;
    const rangeFat = 10;

    const maxCalories = query.calories + rangeCalories;
    const minCalories = query.calories - rangeCalories;
    const maxProtein = query.protein + rangeProtein;
    const minProtein = query.protein - rangeProtein;
    const maxFat = query.fat + rangeFat;
    const minFat = query.fat - rangeFat;
    const number = query.number;   

    const url = `https://api.spoonacular.com/recipes/findByNutrients?minProtein=${minProtein}&maxProtein=${maxProtein}&random=true&minCalories=${minCalories}&maxCalories=${maxCalories}&minFat=${minFat}&maxFat=${maxFat}&number=${number}&apiKey=46cbcdcfbf4f4023a15365db9560c056`;

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
    const refetch = (query) => {
        const maxCalories = query.calories + rangeCalories;
        const minCalories = query.calories - rangeCalories;
        const maxProtein = query.protein + rangeProtein;
        const minProtein = query.protein - rangeProtein;
        const maxFat = query.fat + rangeFat;
        const minFat = query.fat - rangeFat;
        const number = query.number;   
        const newURL = `https://api.spoonacular.com/recipes/findByNutrients?minProtein=${minProtein}&maxProtein=${maxProtein}&random=true&minCalories=${minCalories}&maxCalories=${maxCalories}&minFat=${minFat}&maxFat=${maxFat}&number=${number}&apiKey=46cbcdcfbf4f4023a15365db9560c056`;
        setLoading(true);
        fetchData(newURL);
    }

    return {data, loading, error, refetch};
}
export default useFetch