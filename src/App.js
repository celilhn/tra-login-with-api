import './App.css';

import {Home} from './Home';
import {Department} from './Department';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
    <br/><br/><br/>

     <Navigation/>

     <Switch>
        <Route path='/' component={Home} exact/>
       <Route path='/department' component={Department}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
