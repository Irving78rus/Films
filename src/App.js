import "./App.css";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import CategoryFilms from "./components/CategoryFilms";
import Films from "./components/Films";
 
import Search from "./components/Search";
import InfoAboutFilm from "./components/InfoAboutFilm";
import Serials from "./components/Serials";
import { useSelector, useDispatch } from "react-redux";
 
import {setTop250,setPremieres,setFilmById} from './redux/toolkitSlice'
function App() {
  const indicators = [
    {
      title: "Подборки",
      link: "Films",
      id: 1,
    },
    {
      title: "Поиск",
      link: "Search",
      id: 2,
    },
     {
      title: "Избранное",
      link: "Selected",
      id: 4,
    },
  ];
  const categoryTop250 = useSelector((state) => state.toolkitSlice.top250 );
  const categoryAwaitFilms = useSelector((state) => state.toolkitSlice.awaitFilms );
  const selectedFilms = useSelector((state) => state.toolkitSlice.selectedFilm );
  
  
  return (
    <div className="App">
      <div className="header">
      {indicators.map((indicator, index) => (
        <NavLink className="header-link" key={indicator.id} to={indicator.link}>
          {indicator.title}
        </NavLink>
      ))}

      </div>
     

      <Routes>
        <Route path="Films" element={<Films />} />
        <Route path="Search" element={<Search />} />
        <Route path="Serials" element={<Serials />} />
        <Route path="Selected" element={<CategoryFilms setFilms={setFilmById} listFilms={selectedFilms} />} />
        <Route path="Films/Top250" element={<CategoryFilms setFilms={setTop250} listFilms={categoryTop250} />} />
        <Route path="Films/Premiries" element={<CategoryFilms setFilms={setPremieres} listFilms={categoryAwaitFilms}/>} />
        
        <Route path="Films/:id" element={<InfoAboutFilm />} />
        
      </Routes>
    </div>
  );
}

export default App;
