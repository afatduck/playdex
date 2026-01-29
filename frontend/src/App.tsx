import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Page404 from './pages/404';
import GamesPage from './pages/Games';
import FavoritesPage from './pages/Favorites';
import Nav from './components/Nav';
import { UserProvider } from './UserState';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import GamePage from './pages/Game';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/game/:gameId" element={<GamePage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
