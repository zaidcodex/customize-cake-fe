import logo from './logo.svg';
import './App.css';
import AppContext from './Context/appContext';
import { useContext } from 'react';
import Navbar from './Components/Navbar';

function App() {
  const context = useContext(AppContext)
  const { helloworld } = context
  console.log(helloworld)
  return (
    <div className="App">
     <Navbar/>
    </div>
  );
}

export default App;
