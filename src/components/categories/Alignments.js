import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';

function Alignments() {
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

    if (category === 'ability-scores') {
        return (
            <div>
                <h1>{item.name || ''} ({item.abbreviation || ''})</h1>
                <p>{item.desc || ''}</p>
                <Link to={`/${category}`}><h4>Go Back to <i>{category}</i></h4></Link>
            </div>
        )
}
}

export default Alignments;
