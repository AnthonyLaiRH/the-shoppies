import React, { useState, useEffect } from "react";

const NominationContext = React.createContext();

const NominationProvider = (props) => {
  // Look in local storage for nominations or empty array
  const [nominations, setNominations] = useState(JSON.parse(localStorage.nominations || "null") ||  []);
  
  const nominate = (movie) => {
    const found = nominations.some(el => el.imdbID === movie.imdbID);
    
    // Add to nominations only if not already nominated and there are less than 5 nominations
    if (!found && nominations.length < 5) {
      setNominations([
        ...nominations,
        {
          poster: movie.poster,
          title: movie.title,
          type: movie.type,
          year: movie.year,
          imdbID: movie.imdbID
        }
      ]);
    } 
  }

  const withdrawNomination = (id) => {
    setNominations([
      ...nominations.filter(nominee => nominee.imdbID !== id)
    ])
  }

  // update nominations storage 
  useEffect(() => {
    localStorage.setItem('nominations', JSON.stringify(nominations));
  },[nominations])

  return (
    <NominationContext.Provider
      value={{
        nominations,
        nominate,
        withdrawNomination,
      }}
    >
      {props.children}
    </NominationContext.Provider>
  );
};

export { NominationContext, NominationProvider };