import { useCallback } from 'react';


export const useSearchFilter = () => {
    return useCallback((searchValue, images )  => {
        return images.filter((image) => {
            return image.imageOriginalName.toLowerCase().includes(searchValue.trim().toLowerCase())
        })
    }, [])}

export const useSort = () => {
    return useCallback((imageDataField, images, isReverse=false) => {
        const sortedImages = [...images].sort((a, b) => a[imageDataField].localeCompare(b[imageDataField]))
        if (isReverse) return sortedImages.reverse()
        return sortedImages
    }, [])
}
