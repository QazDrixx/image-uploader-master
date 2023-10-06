import classes from '../SearchPanel.module.scss';
import { Form } from 'react-bootstrap';
import {  useEffect, useState } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredImages } from '../../../../redux/submitSlice';
import { useSearchFilter, useGETqueries } from '../../../../hooks/useFilter';


export const SearchInput = () => {
    const [searchValue, setSearchValue] = useState('')
    const [isChangeInput, setChangeInput] = useState(false)
    // const [searchParams, setSearchParams] = useSearchParams();
    const searchImages = useSearchFilter()
    const setGETqueries = useGETqueries()
    const images = useSelector(state => state.submit.images)
    const sortType = useSelector(state => state.submit.sortType)
    const debounceValue = useDebounce(searchValue, 250)
    const dispatch = useDispatch()


    useEffect(() => {
        const foudnImages = searchImages(debounceValue, [...images], sortType)
        // console.log(foudnImages);
        setGETqueries(debounceValue, 'searchValue', setSearchValue, isChangeInput)
        dispatch(setFilteredImages(foudnImages))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue, isChangeInput])

    return (
        <Form.Control
            type='text'
            placeholder="Find images..."
            className={classes.SearchInput}
            onChange={(e) => {
                setSearchValue(e.target.value)
                if (!isChangeInput) setChangeInput(true)
            }}
            value={searchValue}
            id='searchInput'
        />
    );
};
