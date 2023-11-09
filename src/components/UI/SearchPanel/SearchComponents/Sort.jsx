import { Dropdown, DropdownButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSort } from '../../../../hooks/useFilter';
import { setImages, setFilteredImages, setSortType } from '../../../../redux/submitSlice';

export const Sort = ({ sortOptions }) => {
    const images = useSelector(state => state.submit.images)
    const sortType = useSelector(state => state.submit.sortType) 
    const isShownFavorites = useSelector(state => state.submit.isShownFavorites)
    const searchValue = useSelector(state => state.submit.searchValue)

    const dispatch = useDispatch()
    const sort = useSort()
    const sortHandle = useCallback((sortOption) => {
        const {imageDataField, isReverse} = sortOption
        const sortedImages = sort(imageDataField, images, isReverse)
        dispatch(setFilteredImages(sortedImages))
        dispatch(setImages(sortedImages))
    }, [dispatch, sort, images]) 

    useEffect(() => {
        if (Object.keys(sortType).length === 0) {
            sortHandle(sortOptions[0])
            dispatch(setSortType(sortOptions[0]))
        }
        else sortHandle(sortType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType, isShownFavorites, searchValue])

    const dropdownItems = sortOptions.map((option) => {
        const {name} = option
        return (
            <Dropdown.Item 
            key={name}
            onClick={() => dispatch(setSortType(option))
            }
            >
                {name}
            </Dropdown.Item>
        );
    });

    return (
        <DropdownButton variant="outline-secondary" title={sortType.name || sortOptions[0].name}>
            {dropdownItems}
        </DropdownButton>
    );
};

Sort.propTypes = {
    sortOptions: PropTypes.array,
};
