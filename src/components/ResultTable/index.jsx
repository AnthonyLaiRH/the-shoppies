import React, { useContext } from 'react';
import { Badge, IconButton, AddIcon, RemoveIcon } from 'evergreen-ui';
import {
  Container,
  Poster,
  TextWrapper,
} from './styled';

import { NominationContext } from '../../context/nomination';

export const ResultTable = (props) => {
  const nominationContext = useContext(NominationContext);
  const { nominations, nominate, withdrawNomination } = nominationContext;

  const { movie, isNomination } = props;
  const { poster, title, type, year, imdbID: id } = movie;

  const nominated = nominations.some(el => el.imdbID === id);

  const handleAdd = () => {
    nominate(movie);
  }

  const handleRemove = () => {
    withdrawNomination(id)
  }

  return (
    <Container>
      <Poster src={poster} alt={title}/>
      <TextWrapper>
        <h3>{title}</h3>
        <Badge color="teal">{type}</Badge>
        <h4>{year}</h4>
        <h4>IMDB ID: {id}</h4>

        {
          isNomination 
          ? <IconButton
              icon={RemoveIcon}
              intent="danger"
              appearance="minimal"
              iconSize={18}
              marginTop={10}
              onClick={handleRemove}
            />
          : <IconButton
              icon={AddIcon}
              intent="success"
              appearance="minimal"
              disabled={nominated}
              iconSize={18}
              marginTop={10}
              onClick={handleAdd}
            />
        }
        
      </TextWrapper>
    </Container>
  )
}
