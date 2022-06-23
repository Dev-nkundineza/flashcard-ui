import { Box, Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { FlashcardsQuery } from '../../generated/graphql';
import './styles.css';

export interface OwnProps {
  handleIdChange: (newId: number) => void;
}

interface Props extends OwnProps {
  data: FlashcardsQuery;
}

const className = 'LaunchList';

const LaunchList: React.FC<Props> = ({ data, handleIdChange }) => (
  <div className='container'>
  <div className={className}>
    <h3>Flash Cards</h3>
    <ol className={`${className}__list`}>
      {!!data.flashcards.flashcards &&
        data.flashcards.flashcards.map(
          (flashcard, i) =>
            !!flashcard && (
              <li
                key={i}
                className={`${className}__item`}
                onClick={() => handleIdChange(flashcard.id!)}
              >
                {flashcard.question} ({flashcard.answer})
              </li>
            ),
        )}
    </ol>
  </div>
  <div className='rightSide'>
    <Container>
      <Box sx ={{ display: "flex" , flexDirection: "column", justifyContent: "spaceBetween"}}>
      <Typography>
        Enjoy using this flashcard application
      </Typography>
      <Box sx ={{ display:"flex", alignContent:"right"}}>
  
      <Link to="/signin">Sign in / register</Link>
      </Box>
     
      </Box>
     
    </Container>

  </div>
  </div>
);

export default LaunchList;