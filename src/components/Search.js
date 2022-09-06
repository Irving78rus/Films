import '../App.css';
import Form from './form/Form';
import CategoryFilms from './CategoryFilms';
import { useSelector } from "react-redux";
import { setFilmByFilters } from '../redux/formSlice'
import Preloader from './Preloader';

function Search() {

    const FilmByFilters = useSelector((state) => state.formSlice.FilmByFilters);
    const isLoad = useSelector((state) => state.formSlice.isPreloader);

    return (
        <div className="wrapper">
      
            <Form  />
            {isLoad && <Preloader />}
            {FilmByFilters && <CategoryFilms setFilms={setFilmByFilters} listFilms={FilmByFilters} />}
        </div>
    );
}

export default Search;
