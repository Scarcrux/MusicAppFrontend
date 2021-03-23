import { BrowserRouter, Route } from 'react-router-dom';
import {
  Lists, SignIn, SignUp, Home, UserProfile, CreateList, List
 } from './views/';
 import {
  NavbarIndex, FooterPage
 } from './components/';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <NavbarIndex/>
        <Route exact path="/" component={Home} />
        <Route exact path='/list/:id' exact render={({match}) =><List id={match.params.id}/>}/>
        <Route exact path="/lists" component={Lists} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/createlist" component={CreateList} />
        <FooterPage/>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
