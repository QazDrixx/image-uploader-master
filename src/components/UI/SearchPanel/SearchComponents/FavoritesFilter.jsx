import { Button } from "react-bootstrap"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setShownFavorites, setFilteredImages } from "../../../../redux/submitSlice"
import { useSearchFilter } from "../../../../hooks/useFilter"

export const FavoritesFilter = () => {
    const searchValue = useSelector(state => state.submit.searchValue)
    const isShownFavorites = useSelector(state => state.submit.isShownFavorites)
    const images = useSelector(state => state.submit.images)
    const search = useSearchFilter()

    const dispatch = useDispatch()
    
    useEffect(() => {
        if (isShownFavorites) {
            dispatch(setFilteredImages(search(searchValue, images.filter((image) => image.favorite))))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShownFavorites, dispatch, searchValue, images])

    return (
        <Button 
        variant={isShownFavorites?'primary':'outline-primary'} 
        onClick={() => dispatch(setShownFavorites(!isShownFavorites))}
        >
            Favorite
        </Button>
    )
}
