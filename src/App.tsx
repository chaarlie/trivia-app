import { BrowserRouter, Switch, Route } from "react-router-dom";

import styled from "styled-components";

import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import Results from "./pages/results/Results";

import { QuizProvider } from "./context/QuizContext";

const Container = styled.div`
  display: flex;
  padding: 30px;
  background-color: #e5e5e5;
  width: 420px;
  height: 620px;
  font-size: 180%;
  margin: 0 auto;
  justify-content: center;
`;

function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <Container>
          <Switch>
            <Route exact path="/home" component={Home}></Route>
            <Route path="/quiz" component={Quiz}></Route>
            <Route path="/results" component={Results}></Route>
            <Route exact path="/" component={Home}></Route>
          </Switch>
        </Container>
      </QuizProvider>
    </BrowserRouter>
  );
}

export default App;
