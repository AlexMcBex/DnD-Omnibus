import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';

function Classes() {
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
                <h2>Life: {item.hit_die || ''}</h2>
                <h2>Proficiencies:</h2>
                <ul>
                    {item.proficiencies && item.proficiencies.map((proficiency) => (
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
                <Link to={`/${item.class_levels.slice(5)}`}>{item.name}'s Levels</Link>

                <Link to={`/${category}`}><h4>Go Back to <i>{category}</i></h4></Link>
            </div>
    )

}

export default Classes;
