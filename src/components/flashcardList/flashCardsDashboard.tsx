import { Box, Container, ListItemText, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  QueryQuery,
  useQueryQuery,
} from '../../generated/graphql';
import styled from '@emotion/styled';
import { colors, mq } from './styles';
import './styles.css';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

import {
  CREATE_FLASHCARD,
  DELETE_MUTATION,
  SORT_QUERY,
  UPDATE_MUTATION,
  QUERY_LAUNCH_LIST,
} from '../query';
import { useMutation, useLazyQuery } from '@apollo/client';
import SortIcon from '@mui/icons-material/Sort';
import PreviewIcon from '@mui/icons-material/Preview';
import { useDispatch, useSelector } from 'react-redux';
import { ownFlashcards, sorted } from '../../redux/actions/flashcardAction';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Navigate } from 'react-router-dom';



const userToken = localStorage.getItem("auth-token")
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
  const { data, error, loading } = useQueryQuery();
  const dispatch = useDispatch();
  const sortedData = useSelector((state: any) => state.flashcards.sorted);
  const flashcardFetched = useSelector((state: any)=> state.flashcards.myFlashcards);
  const [getMyFlashCards] = useLazyQuery(QUERY_LAUNCH_LIST, {});
  const [formState, setFormState] = React.useState({
    login: true,
    question: '',
    answer: '',
    display: false,
    id: 0,
    rotate: false,
    search: true,
    searchValue: '',
    update: false,
    oldQuestion: '',
    oldAnswer: '',
    updateFlashcardId: 0,
    createCard: false,
    deleteCard: false,
    editCard: false,
  });
  const [open, setOpen] = React.useState(false);
  const [sort, setSort] = React.useState(false);
  const [logged, setLogged] = React.useState(false);

  // const [executeSearch, { data }] = useLazyQuery(
  //   FILTER_QUERY
  // );

  

  const handleClick = () => {
    setOpen(!open);
  };
  const [getSortedFlashCards] = useLazyQuery(SORT_QUERY, {

  });
  const [createFlashcard] = useMutation(CREATE_FLASHCARD, {
    variables: {
      question: formState.question,
      answer: formState.answer,
    },
    onError: (err) => {
      console.dir(err);
    },
    onCompleted: ({ createFlashcard }) => {
      setFormState({
        ...formState,
        createCard: !formState.createCard,
        login: false,
      });
    },
  });

  const [updateCard] = useMutation(UPDATE_MUTATION, {
    variables: {
      updateFlashcardId: formState.updateFlashcardId,
      question: formState.question,
      answer: formState.answer,
    },
    onError: (err) => {
      console.dir(err);
    },
    onCompleted: ({ updateCard }) => {
      setFormState({
        ...formState,
        login: false,
        editCard: !formState.editCard,
      });
    },
  });

  const [deleteFlashcard] = useMutation(DELETE_MUTATION, {
    variables: {
      deleteFlashcardId: 0,
    },
    onError: (err) => {
      console.dir(err);
    },
    onCompleted: ({ deleteFlashcard }) => {
      setFormState({
        ...formState,
        login: false,
        deleteCard: !formState.deleteCard,
      });
    },
  });
 
  interface FormElements extends HTMLFormControlsCollection {
    usernameInput: HTMLInputElement;
  }
  interface UsernameFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault();
    // eslint-disable-next-line no-lone-blocks
    {
      formState.update ? updateCard() : createFlashcard();
      setFormState({
        ...formState,
        display: false,
        question: '',
        answer: '',
      })
    }
  }

  function handleSubmitOnSearch(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault();
    // searchFlashcard();
  }

    const fetchSortedFlashCards = (order: any)=>{
      getSortedFlashCards({
        fetchPolicy: 'network-only',
        variables: {
          "orderBy": [
            {
              "question": order
            }
          ]
        },
        onCompleted: ( data1 ) => {
        const filtered = data1.flashcards.flashcards
        setSort(true);
        setOpen(!open);
         data && dispatch(
        sorted(
          filtered
        )
      )
      setFormState({
        ...formState,
        editCard: true,
      });
      },onError:(error)=>{
        console.log(error,'my error')
      }})
    }
  
    React.useEffect(():any=>{
      if(userToken){
        <Navigate to='/dashboard'/>
      }
      getMyFlashCards({
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
          // console.log(data.flashcards.flashcards);
          data && dispatch(ownFlashcards(data.flashcards.flashcards));
         
        },
        onError: (error) => {
          console.log(error, 'error');
        },
      });
      }, [formState.createCard, formState.editCard, formState.deleteCard, getMyFlashCards, dispatch])
 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

const dataToReturn = ()=>{
  return sort ? (
<>
    <ol className={`${className}__list`}>
          {!!sortedData &&
            sortedData.map(
              (flashcard: any, i: any) =>
                !!flashcard && (
                  <CardContainer>
                    <CardContent>
                      <CardBodyFront>
                        <CardTitle>{flashcard.question}</CardTitle>
                        <AuthorAndTrack>
                          <AuthorName>Posted By: {flashcard.postedBy.name}</AuthorName>
                        </AuthorAndTrack>
                        <PreviewIcon
                          sx={{ color: 'blue' }}
                          onClick={() => {
                            setFormState({
                              ...formState,
                              rotate: true,
                            });
                          }}
                        />{' '}
                        hover to view Answer
                      </CardBodyFront>

                      <CardBodyBack>
                        <CardTitle> {flashcard.answer}</CardTitle>
                        <AuthorAndTrack>
                          <AuthorName>Posted By: {flashcard.postedBy.name}</AuthorName>
                        </AuthorAndTrack>
                      </CardBodyBack>
                    </CardContent>
                  </CardContainer>
                )
            )}
        </ol>
        </>
  ): (
    <>
    <ol className={`${className}__list`}>
          {!!flashcardFetched &&
            flashcardFetched?.map(
              (flashcard: any, i: any) =>
                !!flashcard && (
                  <CardContainer>
                    <CardContent>
                      <CardBodyFront>
                        <CardTitle>{flashcard.question}</CardTitle>
                        <AuthorAndTrack>
                          <AuthorName>Posted By: {flashcard.postedBy.name}</AuthorName>
                        </AuthorAndTrack>
                        <PreviewIcon
                          sx={{ color: 'blue' }}
                          onClick={() => {
                            setFormState({
                              ...formState,
                              rotate: true,
                            });
                          }}
                        />{' '}
                        hover to view Answer
                      </CardBodyFront>

                      <CardBodyBack>
                        <CardTitle> {flashcard.answer}</CardTitle>
                        <AuthorAndTrack>
                          <AuthorName>Posted By: {flashcard.postedBy.name}</AuthorName>
                        </AuthorAndTrack>
                      </CardBodyBack>
                    </CardContent>

                  </CardContainer>
                )
            )}
        </ol>
        </>
  );
}
  return (
    <div className="container">
      <div className={className}>
        <h3>Flash Cards</h3>
        Click to Sort:
        <SortIcon onClick={handleClick}/>
        <List>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ArrowDropUpIcon />
                </ListItemIcon>
                <ListItemText primary="Ascending" onClick={()=>fetchSortedFlashCards("asc")}/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ArrowDropDownIcon />
                </ListItemIcon>
                <ListItemText primary="Descending" onClick={()=>
                  fetchSortedFlashCards("desc") }/>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        {dataToReturn()}
      </div>
      <div className="rightSide">
        <Container>
          {/* <Paper
            component="form"
            onSubmit={handleSubmitOnSearch}
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
              // required
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'spaceBetween',
            }}
          >
            <Typography>
        Enjoy using this flashcard application
      </Typography>
      <Box sx ={{ display:"flex", alignContent:"right"}}>
  
      <Link to="/signin">
            signin / register  
        </Link>
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
            onSubmit={handleSubmit}
          >
            <Input
             value= { formState.question } 
             placeholder= { formState.update? formState.oldQuestion : "Question" } 
              inputProps={ariaLabel}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  question: e.target.value,
                })
              }
            />
            <Input
              value={formState.answer}
              placeholder={formState.update ? formState.oldAnswer : 'Answer'}
              inputProps={ariaLabel}
              sx={{ marginTop: '40px' }}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  answer: e.target.value,
                })
              }
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: '40px', backgroundColor: '#4169e1' }}
            >
              {formState.update ? 'Update card' : 'Add flashcard '}
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
  // ':hover': { transform: 'rotateY(360deg)'},
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
  height: 300,
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
  transition: 'transform 4s',
  transformStyle: 'preserve-3d',
  ':hover': { transform: 'rotateY(180deg)' },
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
  WebkitBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden',
});

const CardBodyBack = styled.div({
  padding: 18,
  flex: 1,
  display: 'flex',
  color: colors.textSecondary,
  flexDirection: 'column',
  justifyContent: 'space-around',
  WebkitBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden',
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
