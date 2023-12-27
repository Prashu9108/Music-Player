import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layouts/Header';
import Music from './components/music/Music';
import Footer from './components/layouts/Footer';

function App() {
  return (
     <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`/`} element={<Music/>}/>
        <Route path={`music`} element={<Music/>}/>
      </Routes>
      <Footer/>
     </BrowserRouter>
  );
}

export default App;
