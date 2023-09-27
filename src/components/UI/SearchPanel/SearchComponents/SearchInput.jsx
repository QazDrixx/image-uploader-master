import classes from '../SearchPanel.module.scss';
import { Form } from 'react-bootstrap';
import {  useEffect, useState } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredImages } from '../../../../redux/submitSlice';
import { useSearchParams } from 'react-router-dom';


export const SearchInput = () => {
    const [searchValue, setSearchValue] = useState('')
    const [isChangeInput, setChangeInput] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const images = useSelector(state => state.submit.images)
    const debounceValue = useDebounce(searchValue)
    const dispatch = useDispatch()


    useEffect(() => {
        const searchImages = () => {
            const foudnImages = images.filter((image) => {
                return image.imageOriginalName.toLowerCase().includes(debounceValue.trim().toLowerCase())
            })
            console.log(foudnImages, Boolean(searchParams.get('searchValue')));
            if(!debounceValue) {
                if (isChangeInput || !searchParams.get('searchValue')) {
                    searchParams.delete('searchValue')
                    setSearchParams(searchValue)
                } else setSearchValue(searchParams.get('searchValue'))
            } else setSearchParams({'searchValue':debounceValue})


            dispatch(setFilteredImages(foudnImages))
        }
        searchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue])

    return (
        <Form.Control
            placeholder="Find images..."
            className={classes.SearchInput}
            onChange={(e) => {
                setSearchValue(e.target.value)
                setChangeInput(true)
            }}
            value={searchValue}
        />
    );
};
