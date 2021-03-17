import NavbarIndex from './components/NavbarIndex';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  Lists, SignIn, SignUp, Home
 } from './views/';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <NavbarIndex/>
        <Route exact path="/" component={Home} />
        <Route exact path="/lists" component={Lists} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
