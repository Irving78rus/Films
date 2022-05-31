import '../App.css';
import Form from './Form';
import CategoryFilms from './CategoryFilms';
import { useSelector } from "react-redux";
import { setFilmByFilters } from '../redux/toolkitSlice'
import Preloader from './Preloader';

function Search() {

    const FilmByFilters = useSelector((state) => state.toolkitSlice.FilmByFilters);
    const isLoad = useSelector((state) => state.toolkitSlice.isPreloader);

    return (
        <div className="mainWrapper">
            Search
            <Form  />
            {isLoad && <Preloader />}
            {FilmByFilters && <CategoryFilms setFilms={setFilmByFilters} listFilms={FilmByFilters} />}
        </div>
    );
}

export default Search;
