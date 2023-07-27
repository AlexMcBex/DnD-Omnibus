import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';

function Default() {
    const [item, setItem] = useState(null);
    const { category, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await axios.get(`https://www.dnd5eapi.co/api/${category}/${id}`);
            setItem(response.data);
            setIsLoading(false);
        };

        fetchData();
    }, [category, id]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div>
                <h1>{item.name || ''}</h1>
                <h2>Description:</h2>
                <ul>
                    {item.desc && item.desc.map((desc, index) => (
                        <li key={index}>{desc}</li>
                    ))}
                </ul>
                <Link to={`/${category}`}><h4>Go Back to Conditions</h4></Link>
            </div>
    )

}

export default Default;
