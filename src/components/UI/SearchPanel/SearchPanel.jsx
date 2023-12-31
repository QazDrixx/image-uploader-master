import classes from './SearchPanel.module.scss'
import { SearchInput } from './SearchComponents/SearchInput'
import { FavoritesFilter } from './SearchComponents/FavoritesFilter'
import { Sort } from './SearchComponents/Sort'

export const SearchPanel = () => {
    
    return (
        <div className={classes.searchPanelWrap}>
            <SearchInput/>
            <FavoritesFilter/>
            <Sort
                sortOptions={[
                    {name:'Newest', imageDataField:'createdAt', isReverse:true}, 
                    {name:'Oldest', imageDataField:'createdAt'},
                    {name:'Alphabetically', imageDataField:'imageOriginalName'}
                ]}
            />
        </div>
    )
}
