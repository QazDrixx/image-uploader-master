// import classes from '../SearchPanel.module.scss'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSort } from '../../../../hooks/useFilter';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredImages, setSortTypeGlobal } from '../../../../redux/submitSlice';
import { useCallback, useEffect, useState } from 'react';


export const Sort = ({ sortOpions }) => {
    const [sortType, setSortTypeLocal] = useState(sortOpions[0])
    const dispatch = useDispatch()
    const images = useSelector((state) => state.submit.filteredImages);
    const sort = useSort();
    

    const sortImages = useCallback((imageDataField, images, isReverse) => {
        const sortedImages = sort(imageDataField, [...images], isReverse)
        // console.log(sortedImages);
        dispatch(setFilteredImages(sortedImages))
        dispatch(setSortTypeGlobal(sortType))
    }, [dispatch, sort, sortType])

    useEffect(() => {
        const { imageDataField, isReverse } = sortType
        sortImages(imageDataField, [...images], isReverse)
        console.log(imageDataField, isReverse);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType])

    const dropdownItems = sortOpions.map((option) => {
        const {name} = option
        return (
            <Dropdown.Item
                key={name}
                onClick={() => {setSortTypeLocal(option)}}
            >
                {name}
            </Dropdown.Item>
        );
    });

    return (
        <DropdownButton variant="outline-secondary" title={sortType.name}>
            {dropdownItems}
        </DropdownButton>
    );
};

Sort.propTypes = {
    sortOpions: PropTypes.array,
};
