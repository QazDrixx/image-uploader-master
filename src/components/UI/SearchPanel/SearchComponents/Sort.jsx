// import classes from '../SearchPanel.module.scss'
import { Dropdown, DropdownButton } from 'react-bootstrap'

export const Sort = () => {
    return (
        <DropdownButton variant='outline-secondary' title="Sort by">
            <Dropdown.Item>Newest</Dropdown.Item>
            <Dropdown.Item>Latest</Dropdown.Item>
            <Dropdown.Item>Alphabet</Dropdown.Item>
        </DropdownButton>
    )
}
