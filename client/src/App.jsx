import Router from './components/Router'
import NavBar from './components/NavBar'
import { Container, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss'

function App() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <NavBar />

      <div className="main-content">
        <Router />
      </div>

      {/* Footer */}
      <footer className="footer">
        <Container maxWidth="lg">
          <Typography variant="body2">© 2024 החנות שלנו - כל הזכויות שמורות</Typography>
        </Container>
      </footer>
      
    </div>
  )
}

export default App