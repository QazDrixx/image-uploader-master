import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setFilteredImages } from "../../../../redux/submitSlice"

export const FavoritesFilter = () => {
    const images = useSelector(state => state.submit.filteredImages)
    const dispatch = useDispatch()
    const showFavorite = () => {
        const favoriteImages = images.filter((el) => el.favorite)
        console.log(favoriteImages);
        dispatch(setFilteredImages(favoriteImages))
    }

    return (
        <Button variant="outline-primary" 
        onClick={showFavorite}
        >
            Favorite
        </Button>
    )
}
