import { BrowserRouter, Route } from 'react-router-dom';
import {
  Lists, SignIn, SignUp, Home, UserProfile, CreateList, SingleList, HostEvent, MyLists, MyEvents, Events,
  Profile, Event, MyLikes, Explore, Inbox
 } from './views/';
 import {
  NavbarIndex, FooterPage
 } from './components/';
 import HOC from './Hoc';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <NavbarIndex/>
        <Route exact path="/" component={HOC(Home)} />
        <Route exact path='/list/:id' exact render={({match}) =><SingleList id={match.params.id}/>}/>
        <Route exact path='/profile/:id' exact render={({match}) =><Profile id={match.params.id}/>}/>
        <Route exact path='/event/:id' exact render={({match}) =><Event id={match.params.id}/>}/>
        <Route exact path="/lists" component={HOC(Lists)} />
        <Route exact path="/events" component={HOC(Events)} />
        <Route exact path="/signin" component={HOC(SignIn)} />
        <Route exact path="/register" component={HOC(SignUp)} />
        <Route exact path="/profile" component={HOC(UserProfile)} />
        <Route exact path="/createlist" component={HOC(CreateList)} />
        <Route exact path="/hostevent" component={HOC(HostEvent)} />
        <Route exact path="/mylists" component={HOC(MyLists)} />
        <Route exact path="/mylikes" component={HOC(MyLikes)} />
        <Route exact path="/myevents" component={HOC(MyEvents)} />
        <Route exact path="/explore" component={HOC(Explore)} />
        <Route exact path="/inbox" component={HOC(Inbox)} />
        <FooterPage/>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
