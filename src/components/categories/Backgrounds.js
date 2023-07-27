import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';

function Backgrounds() {
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

    return (
        <div>
        <h1>{item.name || ''}</h1>
        <h2>Starting Proficiencies:</h2>
        <ul>
            {item.starting_proficiencies && item.starting_proficiencies.map((proficiency) => (
                <li key={proficiency.index}>
                    <Link to={`/${proficiency.url.slice(5)}`}>{proficiency.name}</Link>
                </li>
            ))}
        </ul>
        <h2>Starting Equipment:</h2>
        <ul>
            {item.starting_equipment && item.starting_equipment.map((equipment) => (
                <li key={equipment.equipment.index}>
                    <Link to={`/${equipment.equipment.url.slice(5)}`}>{equipment.equipment.name}</Link> (Quantity: {equipment.quantity})
                </li>
            ))}
        </ul>
        <h2>Feature:</h2>
        <p>{item.feature ? item.feature.name : ''}</p>
        <p>{item.feature && item.feature.desc ? item.feature.desc.join(' ') : ''}</p>
        <Link to={`/${category}`}><h4>Go Back to <i>{category}</i></h4></Link>
    </div>
    )

}

export default Backgrounds;
