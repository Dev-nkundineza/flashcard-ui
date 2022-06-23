import React from 'react';
import styled from '@emotion/styled';

/**
 * Footer is useless component to make our app look a little closer to a real website!
 */
const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <LogoContainer>
      2022 ©
        Developer: David
      </LogoContainer>
    </FooterContainer>
  );
};

export default Footer;

/** Footer styled components */
const FooterContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'blue',
  marginTop: 30,
  height: 200,
  padding: 20,
  backgroundColor: '#4169e1',
  borderTop: `solid 1px pink`,
});

const LogoContainer = styled.div({
  height: 40,
  marginLeft: 5,
  color: "whitesmoke"
});
