import React, { useContext, useEffect } from 'react';

import { Pane, Alert } from 'evergreen-ui';
import { ResultTable } from '../ResultTable'

import { NominationContext } from '../../context/nomination';

export const NominationArea = () => {
  const nominationContext = useContext(NominationContext);
  const { nominations } = nominationContext;

  useEffect(() => {
    if (nominations.length === 5){

    }
  }, [nominations])

  return (
    <Pane
      flex={1}
      display="block"
      padding={20}
    >
      <h2>Your Nominations</h2>
      {
        nominations.length === 5 
        ? <Alert
            intent="success"
            title="You've nominated 5 movies!"
            marginY={32}
          />
        : null
      }

      {
        nominations.length === 0 
        ? <h3>Go nominate some movies!</h3>
        : nominations.map((movie, i)=>(
          <Pane
            key={i}
            width="50%"
            float="left"
          >
            <ResultTable isNomination movie={movie}/>
          </Pane>                
        ))
      }
    </Pane>
  )
}