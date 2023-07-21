import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';

function ItemDetail() {
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
                <h1>{item.full_name || ''} ({item.name || ''})</h1>
                <p>{item.desc ? item.desc.join(' ') : ''}</p>
                <h2>Skills:</h2>
                <ul>
                    {item.skills && item.skills.map((skill) => (
                        <li key={skill.index}>
                            <Link to={`/skills/${skill.index}`}>{skill.name}</Link>
                        </li>
                    ))}
                </ul>
                <Link to={`/${category}`}><h4>Go Back to <i>{category}</i></h4></Link>
            </div>
        );
    } else if (category === 'alignments') {
        return (
            <div>
                <h1>{item.name || ''} ({item.abbreviation || ''})</h1>
                <p>{item.desc || ''}</p>
                <Link to={`/${category}`}><h4>Go Back to <i>{category}</i></h4></Link>
            </div>
        );
    }  else if (category === 'backgrounds') {
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
        );
    }else if (category === 'classes') {
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
        );
    } else if (category === 'conditions' || category === 'damage-types' || category === 'weapon-properties') {
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
        );
    }else if (category === 'equipment') {
        return (
            <div>
                <h1>{item.name || ''}</h1>
                <h2>Category: <Link to={`/${item.equipment_category.url.slice(5)}`}><h4>{item.equipment_category.name}</h4></Link></h2>
                <h2>Cost: {item.cost ? item.cost.quantity : ''} {item.cost ? item.cost.unit : ''}</h2>
                {item.damage && <h2>Damage: {item.damage.damage_dice} {item.damage.damage_type.name}</h2>}
                <h2>Weight: {item.weight || ''}</h2>
                {item.properties && item.properties.length > 0 && (
                    <div>
                        <h2>Properties:</h2>
                        <ul>
                            {item.properties.map((property, index) => (
                                <li key={index}>{property.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <Link to={`/${category}`}><h4>Go Back to Equipment</h4></Link>
            </div>
        );
    } else if (category === 'equipment-categories') {
        return (
            <div>
                {item ? (
                    <>
                        <h2>{item.name || ''}</h2>
                        <h3>Equipment:</h3>
                        {item.equipment && item.equipment.map((equipmentItem, index) => (
                            <div key={index}>
                                {equipmentItem.url ? (
                                    <Link to={`/${equipmentItem.url.slice(5)}`}><h4>{equipmentItem.name}</h4></Link>
                                ) : (
                                    <h4>{equipmentItem.name}</h4>
                                )}
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
    } else if (category === 'feats') {
        return (
            <div>
                <h2>{item.name || ''}</h2>
                {item.prerequisites && (
                    <div>
                        <h3>Prerequisites:</h3>
                        {item.prerequisites.map((prerequisite, index) => (
                            <p key={index}>{prerequisite.ability_score.name}: {prerequisite.minimum_score}</p>
                        ))}
                    </div>
                )}
                <h3>Description:</h3>
                {item.desc && item.desc.map((desc, index) => (
                    <p key={index}>{desc}</p>
                ))}
            </div>
        );
    }else if (category === 'languages') {
        return (
            <div>
                <h2>{item.name || ''}</h2>
                <p>{item.desc || ''}</p>
                <p>Type: {item.type || ''}</p>
                <p>Typical Speakers: {item.typical_speakers ? item.typical_speakers.join(', ') : ''}</p>
                <p>Script: {item.script || ''}</p>
            </div>
        );
    } else if (category === 'magic-items') {
        return (
            <div>
                <h2>{item.name || ''}</h2>
                {item.desc && <p>{item.desc.join(' ')}</p>}
                {item.equipment_category && <p>Equipment Category: {item.equipment_category.name}</p>}
                {item.rarity && <p>Rarity: {item.rarity}</p>}
                {item.variants && item.variants.length > 0 && (
                    <div>
                        <h3>Variants:</h3>
                        {item.variants.map((variant, index) => (
                            <div key={index}>
                                <Link to={`/${variant.url.slice(5)}`}><h4>{variant.name}</h4></Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }else if (category === 'monsters') {
        return (
            <div>
                <h2>{item.name || ''}</h2>
                <p>Size: {item.size || ''}</p>
                <p>Type: {item.type || ''}</p>
                <p>Alignment: {item.alignment || ''}</p>
                <p>Armor Class: {item.armor_class ? item.armor_class.map(ac => ac.value).join(', ') : ''}</p>
                <p>Hit Points: {item.hit_points || ''}</p>
                <p>Hit Dice: {item.hit_dice || ''}</p>
                <p>Speed: {item.speed ? Object.entries(item.speed).map(([key, value]) => `${key}: ${value}`).join(', ') : ''}</p>
                <p>Strength: {item.strength || ''}</p>
                <p>Dexterity: {item.dexterity || ''}</p>
                <p>Constitution: {item.constitution || ''}</p>
                <p>Intelligence: {item.intelligence || ''}</p>
                <p>Wisdom: {item.wisdom || ''}</p>
                <p>Charisma: {item.charisma || ''}</p>
                <p>Proficiencies: {item.proficiencies ? item.proficiencies.map(prof => prof.proficiency.name).join(', ') : ''}</p>
                <p>Damage Immunities: {item.damage_immunities ? item.damage_immunities.join(', ') : 'None'}</p>
                <p>Senses: {item.senses ? Object.entries(item.senses).map(([key, value]) => `${key}: ${value}`).join(', ') : ''}</p>
                <p>Languages: {item.languages || ''}</p>
                <p>Challenge Rating: {item.challenge_rating || ''}</p>
                <p>XP: {item.xp || ''}</p>
                <h3>Special Abilities:</h3>
                {item.special_abilities && item.special_abilities.map((ability, index) => (
                    <div key={index}>
                        <h4>{ability.name}</h4>
                        <p>{ability.desc}</p>
                    </div>
                ))}
                <h3>Actions:</h3>
                {item.actions && item.actions.map((action, index) => (
                    <div key={index}>
                        <h4>{action.name}</h4>
                        <p>{action.desc}</p>
                    </div>
                ))}
                <h3>Legendary Actions:</h3>
                {item.legendary_actions && item.legendary_actions.map((action, index) => (
                    <div key={index}>
                        <h4>{action.name}</h4>
                        <p>{action.desc}</p>
                    </div>
                ))}
            </div>
        );
    }else if (category === 'proficiencies') {
        return (
            <div>
                <h2>{item.name || ''}</h2>
                <p>Type: {item.type || ''}</p>
                {item.classes && item.classes.length > 0 && <p>Classes: {item.classes.map(cls => cls.name).join(', ')}</p>}
                {item.races && item.races.length > 0 && <p>Races: {item.races.map(race => race.name).join(', ')}</p>}
                {item.reference && 
                    <div>
                        <h3>Reference:</h3>
                        <Link to={`/${item.reference.url.slice(5)}`}><h4>{item.reference.name}</h4></Link>
                    </div>
                }
            </div>
        );
    }else if (category === 'races') {
        return (
            <div>
                <h2>{item.name || ''}</h2>
                <p>Speed: {item.speed || ''}</p>
                <p>Ability Bonuses: {item.ability_bonuses ? item.ability_bonuses.map(ab => `${ab.ability_score.name}: ${ab.bonus}`).join(', ') : ''}</p>
                <p>Alignment: {item.alignment || ''}</p>
                <p>Age: {item.age || ''}</p>
                <p>Size: {item.size || ''}</p>
                <p>Size Description: {item.size_description || ''}</p>
                <p>Languages: {item.languages ? item.languages.map(lang => lang.name).join(', ') : ''}</p>
                <p>Language Description: {item.language_desc || ''}</p>
                <p>Traits: {item.traits ? item.traits.map(trait => trait.name).join(', ') : ''}</p>
                {item.subraces && item.subraces.length > 0 && <p>Subraces: {item.subraces.map(subrace => subrace.name).join(', ')}</p>}
            </div>
        );
    }else if (category === 'rules') {
        return (
            <div>
                <h2>{item.name || ''}</h2>
                <p>{item.desc || ''}</p>
                <h3>Subsections:</h3>
                {item.subsections && item.subsections.map((subsection, index) => (
                    <div key={index}>
                        <Link to={`/${subsection.url.slice(5)}`}><h4>{subsection.name}</h4></Link>
                    </div>
                ))}
            </div>
        );
    }else if (category === 'rule-sections') {
        return (
            <div>
                <h2>{item.name || ''}</h2>
                <ReactMarkdown>{item.desc || ''}</ReactMarkdown>
            </div>
        );
    }else if (category === 'skills') {
        return (
            <div>
                <h2>{item.name || ''}</h2>
                <p>{item.desc ? item.desc[0] : ''}</p>
                <p>Ability Score: {item.ability_score && <Link to={`/${item.ability_score.url.slice(5)}`}>{item.ability_score.name}</Link>}</p>
            </div>
        );
    }else if (category === 'spells') {
        return (
            <div>
                <h1>{item.name || ''}</h1>
                <p>{item.desc ? item.desc.join(' ') : ''}</p>
                {item.higher_level && <p>Higher Level: {item.higher_level.join(' ')}</p>}
                <p>Range: {item.range || ''}</p>
                <p>Components: {item.components ? item.components.join(', ') : ''}</p>
                {item.material && <p>Material: {item.material}</p>}
                <p>Ritual: {item.ritual ? 'Yes' : 'No'}</p>
                <p>Duration: {item.duration || ''}</p>
                <p>Concentration: {item.concentration ? 'Yes' : 'No'}</p>
                <p>Casting Time: {item.casting_time || ''}</p>
                <p>Level: {item.level || ''}</p>
                {item.attack_type && <p>Attack Type: {item.attack_type}</p>}
                {item.damage && <p>Damage: {item.damage.damage_at_slot_level['2']} {item.damage.damage_type.name}</p>}
                <p>School: {item.school && <Link to={`/${item.school.url.slice(5)}`}>{item.school.name}</Link>}</p>
                <h2>Classes:</h2>
                <ul>
                    {item.classes && item.classes.map((cls) => (
                        <li key={cls.index}>
                            <Link to={`/classes/${cls.index}`}>{cls.name}</Link>
                        </li>
                    ))}
                </ul>
                <h2>Subclasses:</h2>
                <ul>
                    {item.subclasses && item.subclasses.map((subclass) => (
                        <li key={subclass.index}>
                            <Link to={`/subclasses/${subclass.index}`}>{subclass.name}</Link>
                        </li>
                    ))}
                </ul>
                <Link to={`/${category}`}><h4>Go Back to <i>{category}</i></h4></Link>
            </div>
        );
    }else if (category === 'subclasses') {
        return (
            <div>
                <h1>{item.name || ''}</h1>
                <p>{item.desc ? item.desc.join(' ') : ''}</p>
                <h2>Class: {item.class && <Link to={`/${item.class.url.slice(5)}`}>{item.class.name}</Link>}</h2>
                <h2>Subclass Flavor: {item.subclass_flavor || ''}</h2>
                <h2>Spells:</h2>
                <ul>
                    {item.spells && item.spells.map((spell) => (
                        <li key={spell.spell.index}>
                            <Link to={`/spells/${spell.spell.index}`}>{spell.spell.name}</Link>
                        </li>
                    ))}
                </ul>
                {item.subclass_levels && <Link to={`/${item.subclass_levels.slice(5)}`}>Subclass Levels</Link>}
                <Link to={`/${category}`}><h4>Go Back to <i>{category}</i></h4></Link>
            </div>
        );
    }else if (category === 'subraces') {
        return (
            <div>
                <h1>{item.name || ''}</h1>
                <p>{item.desc || ''}</p>
                <h2>Race: {item.race && <Link to={`/${item.race.url.slice(5)}`}>{item.race.name}</Link>}</h2>
                <h2>Ability Bonuses:</h2>
                <ul>
                    {item.ability_bonuses && item.ability_bonuses.map((bonus) => (
                        <li key={bonus.ability_score.index}>
                            <Link to={`/ability-scores/${bonus.ability_score.index}`}>{bonus.ability_score.name}</Link>: {bonus.bonus}
                        </li>
                    ))}
                </ul>
                <h2>Racial Traits:</h2>
                <ul>
                    {item.racial_traits && item.racial_traits.map((trait) => (
                        <li key={trait.index}>
                            <Link to={`/traits/${trait.index}`}>{trait.name}</Link>
                        </li>
                    ))}
                </ul>
                <Link to={`/${category}`}><h4>Go Back to <i>{category}</i></h4></Link>
            </div>
        );
    }else if (category === 'traits') {
        return (
            <div>
                <h1>{item.name || ''}</h1>
                <p>{item.desc ? item.desc.join(' ') : ''}</p>
                <h2>Races:</h2>
                <ul>
                    {item.races && item.races.map((race) => (
                        <li key={race.index}>
                            <Link to={`/races/${race.index}`}>{race.name}</Link>
                        </li>
                    ))}
                </ul>
                <h2>Subraces:</h2>
                <ul>
                    {item.subraces && item.subraces.map((subrace) => (
                        <li key={subrace.index}>
                            <Link to={`/subraces/${subrace.index}`}>{subrace.name}</Link>
                        </li>
                    ))}
                </ul>
                <Link to={`/${category}`}><h4>Go Back to <i>{category}</i></h4></Link>
            </div>
        );
    }else if (category === "magic-schools") {
        return (
            <div>
                <h1>{item.name || ''}</h1>
                <p>{item.desc || ''}</p>
            </div>
        );
    }else {
        return (
            <div>
                <h1>{item.name || ''}</h1>
                <Link to={`/${category}`}><h4>Go Back to {category}</h4></Link>
            </div>
        );
    }

}

export default ItemDetail;
