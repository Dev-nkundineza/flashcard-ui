import React from 'react';
// import { colors, widths } from '../styles';
import styled from '@emotion/styled';
import logo from '../assets/flashcard.jpeg';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {
  return (
    <HeaderBar>
      <Container>
        <HomeButtonContainer>
          <HomeLink to="/">
            <HomeButton>
              <LogoContainer>
                <Logo src={logo} />
              </LogoContainer>
              <Title>
                <h3>FlashCard App</h3>
                <div>Questions and Answers updated</div>
              </Title>
            </HomeButton>
          </HomeLink>
        </HomeButtonContainer>
      </Container>
    </HeaderBar>
  );
};



const HeaderBar = styled.div({
  display: 'flex',
  flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
  borderBottom: `solid 1px pink`,
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
  padding: '5px 30px',
  minHeight: 80,
  backgroundColor: 'white',
});

const Container = styled.div({
  width: `100px`,
});

const HomeLink = styled(Link)({
  textDecoration: 'none',
});

const HomeButtonContainer = styled.div({
  display: 'flex',
  flex: 1,
});

const HomeButton = styled.div({
  display: 'flex',
  flexDirection: 'row',
  color: '#4169e1',
  alignItems: 'Left',
  ':hover': {
    color: 'green',
  },
});

const LogoContainer = styled.div({ display: 'flex', alignSelf: 'left' });

const Logo = styled.img({
  height: 60,
  width: 60,
  marginRight: 8,
});

const Title = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  h3: {
    lineHeight: '1em',
    marginBottom: 0,
  },
  div: {
    fontSize: '0.9em',
    lineHeight: '0.8em',
    paddingLeft: 2,
  },
});

export default Header;
