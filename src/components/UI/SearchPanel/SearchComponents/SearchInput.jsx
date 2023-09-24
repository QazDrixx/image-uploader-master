import classes from '../SearchPanel.module.scss'
import { Form } from "react-bootstrap"

export const SearchInput = () => {
    return (
        <Form.Control placeholder="Find images..." className={classes.SearchInput}/>
    )
}
