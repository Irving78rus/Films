import "../App.css";
import { NavLink } from "react-router-dom";
import top250 from "../img/top250.png";
import awaitFilms from "../img/awaitFilms.png";
function Films() {
  const categories = [
    {
      img: top250,
      title: "250 лучших фильмов",
      link: "Top250",
      id: 1,
    },
    {
      img: awaitFilms,
      title: "Самые ожидаемые фильмы",
      link: "Premiries",
      id: 2,
    },
  ];
  return (
    <div className="mainWrapper">
      {categories.map((category) => (
        <NavLink key={category.id} to={category.link} className="mainCard">
          <img src={category.img} alt="" />
          {category.title}
        </NavLink>
      ))}
    </div>
  );
}

export default Films;
