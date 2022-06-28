import { Box, Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { QueryQuery } from '../generated/graphql';
import { useQueryQuery } from '../generated/graphql';
import styled from '@emotion/styled';
import { colors, mq } from './flashcardList/styles';
import './flashcardList/styles.css';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { CREATE_FLASHCARD, DELETE_MUTATION  } from './query';
import { useMutation } from '@apollo/client';
import SortIcon from '@mui/icons-material/Sort';
import PreviewIcon from '@mui/icons-material/Preview';

export interface OwnProps {
  handleIdChange: (newId: number) => void;
}

interface Props extends OwnProps {
  data: QueryQuery;
}

const className = 'LaunchList';
const ariaLabel = { 'aria-label': 'description' };


const Dashboard: React.FC<Props> = ({ handleIdChange }) => {
  // state management

  const [formState, setFormState] = React.useState({
    login: true,
    question: '',
    answer: '',
    display: false,
    id: 0,
    rotate: false
  });


  const [createFlashcard] = useMutation(CREATE_FLASHCARD, {
      variables: {
        question: formState.question,
        answer: formState.answer,
      },
      onError: (err)=>{
         console.dir(err)
      },
      onCompleted: ({ createFlashcard }) => {
        setFormState({
          ...formState,
          login: false
        });
      }
    });

    
       const [deleteFlashcard]=  useMutation(DELETE_MUTATION, {
        variables: {
          deleteFlashcardId: 0,
          
        },
        onError: (err)=>{
           console.dir(err)
        },
        onCompleted: ({ deleteFlashcard }) => {
          setFormState({
            ...formState,
            login: false
          });
        }
      });

    interface FormElements extends HTMLFormControlsCollection {
      usernameInput: HTMLInputElement
    }
    interface UsernameFormElement extends HTMLFormElement {
      readonly elements: FormElements
    }

    function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
      event.preventDefault()
      createFlashcard();
    }

  const { data, error, loading } = useQueryQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return (
    <div className="container">
      <Box
        className="sideMenu"
        onClick={() => {
          setFormState({ ...formState, display: !formState.display });
          console.log(formState.display);
        }}
      >
        <AddCircleTwoToneIcon
          sx={{
            marginLeft: '20px',
            color: 'blue',
            width: '40px',
            height: '50px',
          }}
        />
        <Typography>Create a card</Typography>
      </Box>
      <div className={className}>
        <h3>Flash Cards</h3>
        <SortIcon/>
        <ol className={`${className}__list`}>
          {!!data.flashcards.flashcards &&
            data.flashcards.flashcards.map(
              (flashcard, i) =>
                !!flashcard && (
                  <CardContainer>
                    <CardContent>
                      <CardBodyFront>
                        <CardTitle>{flashcard.question}</CardTitle>
                        <AuthorAndTrack>
                          <AuthorName>Posted By: {flashcard.answer}</AuthorName>
                          <Icons>
                            {flashcard.isDone ? (
                              <DoneAllIcon sx={{ color: 'green' }} />
                            ) : (
                              <HighlightOffIcon sx={{ color: 'red' }} />
                            )}
                            
                            <ModeEditTwoToneIcon sx={{ marginLeft: '10px', color: "blue"}}/> <Typography> Edit</Typography> 
                            
                            
                            <DeleteTwoToneIcon sx={{ marginLeft: '10px', color: "red"}}/> <Typography onClick={()=>deleteFlashcard({
                               variables: {
                                deleteFlashcardId: flashcard.id,                               
                              },
                            }) }
                            >  Delete</Typography> 
                            
                          </Icons>
                          
                        </AuthorAndTrack>
                        <PreviewIcon sx={{ color: "blue"}}  onClick={()=>{
                          setFormState({
                            ...formState,
                            rotate: true
                          })
                          console.log(formState.rotate)
                        }} /> hover to view Answer
                      </CardBodyFront>
                      
                      <CardBodyBack>

                        <CardTitle> {flashcard.answer}</CardTitle>
                        <AuthorAndTrack>
                          <AuthorName>Posted By: {flashcard.answer}</AuthorName>
                          <Icons>
                            {flashcard.isDone ? (
                              <DoneAllIcon sx={{ color: 'green' }} />
                            ) : (
                              <HighlightOffIcon sx={{ color: 'red' }} />
                            )}
                            
                            <ModeEditTwoToneIcon sx={{ marginLeft: '10px'}}/> <Typography> Edit</Typography> 
                            
                            
                            <DeleteTwoToneIcon sx={{ marginLeft: '10px'}}/> <Typography onClick={()=>deleteFlashcard({
                               variables: {
                                deleteFlashcardId: flashcard.id,                               
                              },
                            }) }
                            >  Delete</Typography> 
                            
                          </Icons>
                          
                        </AuthorAndTrack>
                      </CardBodyBack>

                    </CardContent>
                  </CardContainer>
                )
            )}
        </ol>
      </div>
      <div className="rightSide">
        <Container>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
              marginBottom: '70px',
            }}
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'spaceBetween',
            }}
          >
            <Typography>Enjoy using this flashcard application</Typography>
            <Box sx={{ display: 'flex', alignContent: 'right' }}>
              <Link to="/signin" onClick={()=> {
                localStorage.removeItem("auth-token")}}>Sign out</Link>
            </Box>
          </Box>

          <Box
            component="form"
            sx={{
              marginTop: '40px',
              display: `${formState.display ? 'flex' : 'none'}`,
              flexDirection: 'column',
              border: '2px solid #4169e1',
              padding: '40px',
              borderRadius: '10px',
            }}
            onSubmit={ handleSubmit }
          >
            <Input
             value= { formState.question} 
             placeholder="question"
             inputProps={ariaLabel} 
             onChange={(e) =>
              setFormState({
                ...formState,
                question: e.target.value
              })}
            />
            <Input
              value = {formState.answer}
              placeholder="answer"
              inputProps={ariaLabel}
              sx={{ marginTop: '40px' }}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  answer: e.target.value
                })}
            />
            <Button
              variant="contained"
              type='submit'
              sx={{ marginTop: '40px', backgroundColor: '#4169e1' }}
            >
              Add Flashcard
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

const CardContainer = styled.div({
  borderRadius: 6,
  color: colors.text,
  backgroundSize: 'cover',
  backgroundColor: 'white',
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  ':hover': { transform: 'rotateY(360deg)'},
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
  cursor: 'pointer',
});

const CardContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
  transition: 'transform 15s',
  transformStyle: 'preserve-3d',
  // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  ':hover': { transform: 'rotateY(360deg)'} ,
  position: 'relative',
});

const CardTitle = styled.h3({
  textAlign: 'center',
  fontSize: '1.4em',
  lineHeight: '1em',
  fontWeight: 700,
  color: colors.text,
  flex: 1,
});

const CardBodyFront = styled.div({
  padding: 18,
  flex: 1,
  display: 'flex',
  color: colors.textSecondary,
  flexDirection: 'column',
  justifyContent: 'space-around',
  WebkitBackfaceVisibility : 'hidden',
  backfaceVisibility:'hidden',
});

const CardBodyBack= styled.div({
  padding: 18,
  flex: 1,
  display: 'flex',
  color: colors.textSecondary,
  flexDirection: 'column',
  justifyContent: 'space-around',
  WebkitBackfaceVisibility : 'hidden',
  backfaceVisibility:'hidden',
  transform: 'rotateY(180deg)',
  // position: 'absolute',
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

const Icons = styled.div({
    lineHeight: '1em',
    fontSize: '1.1em',
    display: 'flex',
    justifyContent: 'right',
  });




export default Dashboard;

