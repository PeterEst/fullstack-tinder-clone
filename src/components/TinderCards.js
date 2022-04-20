import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import "./TinderCards.css";
import axios from "../axios";

function TinderCards() {
    const [people, setPeople] = useState([]);

    useEffect(()=>{
        const fetchData = async () =>{
            const req = await axios.get('/tinder/data');
            setPeople(req.data);
        }

        fetchData();
    }, []);

    const swiped = (direction, nameToDelete) => {
        console.log("Swiping " + nameToDelete + " to The " + direction);
    };

    const outOfFrame = (name) =>{
        console.log(name + " has Left The Screen!");
    }


  return (
    <div className='tinderCards'>
        <div className='tinderCards__cardContainer'>
            {people.map((person, key) =>
                <TinderCard
                    className='swipe'
                    key={key}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => swiped(dir, person.name)}
                    onCardLeftScreen={() => outOfFrame(person.name)}
                >
                <div className='card' style={{backgroundImage: `url(${person.imgUrl})` }}>
                    <h3>{person.name}</h3>
                </div>
                </TinderCard>
            )}
        </div>  
    </div>
  )
}

export default TinderCards;