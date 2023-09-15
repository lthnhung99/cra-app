import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import CountAppJS from './components/CountAppJS';
import CountAppUseState from './components/CountAppUseState';
import Register from './components/Register';
import PlayList from './components/PlayList';
import Login from './components/login';

function App() {
  return (
    <div>
      {/* <CountAppJS/>
      <CountAppUseState/> */}
      {/* <Register/> */}
      {/* <Login/> */}
      <PlayList/>
    </div>
  );
}

export default App;
