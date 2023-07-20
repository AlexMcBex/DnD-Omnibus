import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function SubItemDetail() {
  const [subItem, setSubItem] = useState(null);
  const [level, setLevel] = useState(1);
  const { category, id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://www.dnd5eapi.co/api/${category}/${id}/levels/${level}`);
      console.log('LEVEL: ' + level)
      setSubItem(response.data);
    };

    fetchData();
  }, [category, id, level]);

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  if (!subItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{subItem.class.name} Level {subItem.level}</h1>
      <label>
        Select Level:
        <select value={level} onChange={handleLevelChange}>
          {[...Array(20)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>
      <h2>Ability Score Bonuses: {subItem.ability_score_bonuses}</h2>
      <h2>Proficiency Bonus: {subItem.prof_bonus}</h2>
      {subItem.features.length > 0 && (
        <>
          <h2>Features:</h2>
          <ul>
            {subItem.features.map((feature) => (
              <li key={feature.index}>
                <Link to={`/${feature.url.slice(5)}`}>{feature.name}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {subItem.spellcasting && (
        <div>
          <h2>Spellcasting:</h2>
          <p>Level 1: {subItem.spellcasting.spell_slots_level_1}</p>
          <p>Level 2: {subItem.spellcasting.spell_slots_level_2}</p>
          <p>Level 3: {subItem.spellcasting.spell_slots_level_3}</p>
          <p>Level 4: {subItem.spellcasting.spell_slots_level_4}</p>
          <p>Level 5: {subItem.spellcasting.spell_slots_level_5}</p>
        </div>
      )}
      {subItem.class_specific && (
        <div>
          <h2>Class Specific:</h2>
          {Object.entries(subItem.class_specific).map(([key, value]) => (
            <p key={key}>{key}: {value}</p>
          ))}
        </div>
      )}
      
      <Link to={`/${category}/${id}`}><h4>Go Back to <i>{id}</i></h4></Link>
    </div>
  );
}

export default SubItemDetail;
