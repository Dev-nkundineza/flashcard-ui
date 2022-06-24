import { Box, Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { QueryQuery } from '../../generated/graphql';
import styled from '@emotion/styled';
import { colors, mq } from './styles';
import './styles.css';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export interface OwnProps {
  handleIdChange: (newId: number) => void;
}

interface Props extends OwnProps {
  data: QueryQuery;
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
                <CardContainer>
                <CardContent>
                  <CardBody>
                    <CardTitle>{flashcard.question}</CardTitle>
                    
                      <CardTitle> {flashcard.answer}</CardTitle>
                      <AuthorAndTrack>
                        <AuthorName>Posted By:  {flashcard.answer}</AuthorName>
                        <AuthorName>
                          {flashcard.isDone ? <DoneAllIcon sx={{ color: "green"}}/> : <HighlightOffIcon sx={{ color: "red"}}/>}
                        </AuthorName>
                      </AuthorAndTrack>
                    
                  </CardBody>
                </CardContent>
              </CardContainer>
            ),
        )}
    </ol>
  </div>
  <div className='rightSide'>
    <Container>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginBottom: "70px" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search flash card"
        inputProps={{ 'aria-label': 'Search flash card' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
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

const CardContainer = styled.div({
    borderRadius: 6,
    color: colors.text,
    backgroundSize: 'cover',
    backgroundColor: 'white',
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'space-between',
    [mq[0]]: {
      width: '90%',
    },
    [mq[1]]: {
      width: '47%',
    },
    [mq[2]]: {
      width: '31%',
    },
    [mq[3]]: {
        width: '100%',
      },
    height: 280,
    margin: 10,
    overflow: 'hidden',
    position: 'relative',
    ':hover': {
      backgroundColor: 'whitesmoke',
    },
    cursor: 'pointer',
  });
  
  const CardContent = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  });
  
  const CardTitle = styled.h3({
    textAlign: 'center',
    fontSize: '1.4em',
    lineHeight: '1em',
    fontWeight: 700,
    color: colors.text,
    flex: 1,
  });
  
  const CardBody = styled.div({
    padding: 18,
    flex: 1,
    display: 'flex',
    color: colors.textSecondary,
    flexDirection: 'column',
    justifyContent: 'space-around',
  });
  
  
  const AuthorAndTrack = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  });
  
  const AuthorName = styled.div({
    lineHeight: '1em',
    fontSize: '1.1em',
  });
  
  