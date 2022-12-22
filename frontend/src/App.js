import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/ConTexT';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import NavBar from './components/NavBar';
import LogIn from './pages/LogIn';

import LoginRouting from './specialFunctions/LoginRouting';
import Addapost from './pages/Addapost';
import YourPosts from './pages/YourPosts';
import FooteR from './pages/FooteR';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <NavBar />

          <Routes>
            <Route element={<LoginRouting />}>
              <Route path='/' element={<Home />} />
              <Route path='/posts' element={<YourPosts/>} />
              <Route path='/add' element={<Addapost />} />
            </Route>
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignIn />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <FooteR />
    </div>
  );
}

export default App;
