import "./App.css";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import CategoryFilms from "./components/CategoryFilms";
import Films from "./components/Films";
import Search from "./components/Search";
import InfoAboutFilm from "./components/InfoAboutFilm/InfoAboutFilm";
import { useSelector } from "react-redux";
import { setTop250, setPremieres, setFilmById } from './redux/toolkitSlice'
import { useEffect, useState } from 'react'
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
  const categoryTop250 = useSelector((state) => state.toolkitSlice.top250);
  const categoryAwaitFilms = useSelector((state) => state.toolkitSlice.awaitFilms);
  const selectedFilms = useSelector((state) => state.toolkitSlice.selectedFilm);
  const [siteLoad, setSiteLoad] = useState(false)
  useEffect(() => {
    setSiteLoad(true)


  }, [])





  return (
    <div className="App">
      <div className="header">
        {indicators.map((indicator) => (
          <NavLink className="header-link" key={indicator.id} to={indicator.link}>
            {indicator.title}
          </NavLink>
        ))}
      </div>
      {/* {!siteLoad && <Navigate to="/Films" />} */}
      <Routes>
      <Route path="/" element={<Films />} />
        <Route path="Films" element={<Films />} />
        <Route path="Search" element={<Search />} />

        <Route path="Selected" element={
          <CategoryFilms listFilms={selectedFilms} />} />

        <Route path="Films/Top250" element={
          <CategoryFilms setFilms={setTop250} listFilms={categoryTop250} />} />

        <Route path="Films/Premiries" element={
          <CategoryFilms setFilms={setPremieres} listFilms={categoryAwaitFilms} />} />

        <Route path="Films/:id" element={<InfoAboutFilm />} />
        <Route  path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
