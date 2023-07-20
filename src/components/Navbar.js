import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const endpoints = {
    "Ability Scores": "ability-scores",
    "Alignments": "alignments",
    "Backgrounds": "backgrounds",
    "Classes": "classes",
    "Conditions": "conditions",
    "Damage Types": "damage-types",
    "Equipment": "equipment",
    "Equipment Categories": "equipment-categories",
    "Feats": "feats",
    "Features": "features",
    "Languages": "languages",
    "Magic Items": "magic-items",
    "Magic Schools": "magic-schools",
    "Monsters": "monsters",
    "Proficiencies": "proficiencies",
    "Races": "races",
    "Rule Sections": "rule-sections",
    "Rules": "rules",
    "Skills": "skills",
    "Spells": "spells",
    "Subclasses": "subclasses",
    "Subraces": "subraces",
    "Traits": "traits",
    "Weapon Properties": "weapon-properties"
  };

  return (
    <nav>
      {Object.entries(endpoints).map(([name, endpoint]) => (
        <Link key={endpoint} to={`/${endpoint}`}>{name}</Link> 
      ))}
    </nav>
  );
}

export default Navbar;
