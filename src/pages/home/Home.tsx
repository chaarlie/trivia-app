import { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";

import {
  StyledButton,
  StyledHeading,
  StyledPageContainer,
} from "../../common-components";

const Home: FunctionComponent = () => {
  const history = useHistory();

  const handleBegin = () => {
    history.push("/quiz");
  };

  return (
    <StyledPageContainer>
      <StyledHeading>Welcome to the Trivia Challange!</StyledHeading>

      <p>You will be presented with 10 True or False questions.</p>

      <p>Can you score 100%?</p>

      <StyledButton onClick={handleBegin}>begin</StyledButton>
    </StyledPageContainer>
  );
};

export default Home;
