import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';


export const useSearchFilter = () => {
    const sort = useSort()
    return useCallback((searchValue, images, sortType)  => {
        const {imageDataField, isReverse} = sortType
        console.log(sortType);
        const sortedImages = sort(imageDataField, [...images], isReverse)
        return sortedImages.filter((image) => {
            return image.imageOriginalName.toLowerCase().includes(searchValue.trim().toLowerCase())
        })
    }, [sort])}

export const useSort = () => {
    return useCallback((imageDataField, images, isReverse=false) => {
        const sortedImages = [...images].sort((a, b) => a[imageDataField].localeCompare(b[imageDataField]))
        if (isReverse) return sortedImages.reverse()
        return sortedImages
    }, [])
}

export const useGETqueries = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (value, valueName, setComponentState, isComponentChange=false) => {
        if(!value) {
            if (isComponentChange || !searchParams.get(valueName)) {
                searchParams.delete(valueName)
                setSearchParams(searchParams)
            } else setComponentState(searchParams.get(valueName))
        } else setSearchParams({[`${valueName}`]:value})
    }
}
