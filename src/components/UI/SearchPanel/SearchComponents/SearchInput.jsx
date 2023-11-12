import classes from '../SearchPanel.module.scss';
import { Form } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchFilter } from '../../../../hooks/useFilter';
import { setFilteredImages, setSearchValue } from '../../../../redux/submitSlice';


export const SearchInput = () => {
    const searchValue = useSelector(state => state.submit.searchValue)
    const images = useSelector(state => state.submit.images)
    const isShownFavorites = useSelector(state => state.submit.isShownFavorites)
    const search = useSearchFilter()
    const dispatch = useDispatch()

    useEffect(() => {
        const foundImages = search(searchValue, images)
        dispatch(setFilteredImages(foundImages))
    }, [searchValue, images, search, dispatch, isShownFavorites])
    
    return (
        <Form.Control
            type='text'
            placeholder="Find images..."
            className={classes.SearchInput}
            onChange={(e) => {
                dispatch(setSearchValue(e.target.value))
            }}
            value={searchValue}
            id='searchInput'
        />
    );
};
