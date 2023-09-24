import classes from './SearchPanel.module.scss'
import { SearchInput } from './SearchComponents/SearchInput'
import { FavoritesFilter } from './SearchComponents/FavoritesFilter'
import { Sort } from './SearchComponents/Sort'

export const SearchPanel = () => {
    return (
        <div className={classes.searchPanelWrap}>
            <SearchInput/>
            <FavoritesFilter/>
            <Sort/>
        </div>
    )
}
