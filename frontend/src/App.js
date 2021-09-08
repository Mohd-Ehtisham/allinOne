import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Admin from './Components/Admin';
import DelPost from './Components/DelPost';
import Deluser from './Components/DelUser';
import Login from './Components/Login';
import Myprofile from './Components/Myprofile';
import Register from './Components/Register';
import ViewPost from './Components/ViewPost';

function App() {
  return (
    <div className="">
      <BrowserRouter>
          <Route exact path="/" component={Login}/>
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/Adduser" component={Register}/>
          <Route exact path="/DelUser" component={Deluser}/>
          <Route exact path="/Viewpost" component={ViewPost}/>
          <Route exact path="/DelPost" component={DelPost}/>
          <Route exact path="/myprofile" component={Myprofile}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
