import { useCallback } from 'react';
// import { useSearchParams } from 'react-router-dom';


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

// export const useGETqueries = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     return (value, valueName, setComponentState, isComponentChange=false) => {
//         if(!value) {
//             if (isComponentChange || !searchParams.get(valueName)) {
//                 searchParams.delete(valueName)
//                 setSearchParams(searchParams)
//             } else setComponentState(searchParams.get(valueName))
//         } else setSearchParams({[`${valueName}`]:value})
//     }
// }
