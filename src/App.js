// import './App.css';

import { routes } from './routes';
import { useRoutes } from 'react-router-dom';

import { Drawer } from '@mui/material';
import { useState } from 'react';


import './styles/index.scss';
import Header from './components/header/header';
import NavBar from './components/nav-bar/nav-bar';

function App() {

  const [toogleDrawer, setToogleDrawer] = useState(false);
  
  const element = useRoutes(routes);
  
  
  return (
    <>
      <Header
        onOpenMenu={() => setToogleDrawer(true)} />
      <Drawer
        anchor='left'
        PaperProps={{
          sx: {
            backgroundColor: "rgba(214, 214, 214, 1)",
            width: 300
          }
        }}
        open={toogleDrawer}
        onClose={() => setToogleDrawer(false)}>
        <NavBar onSelectedMenu={() => setToogleDrawer(false)} />
      </Drawer>
      <div className="App">
        {element}
      </div>
    </>
  );
}

export default App;
