import classes from './Layout.module.scss'
import { CreatedBy } from '../UI/CreatedBy/CreatedBy';
import { NavBar } from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    const preventDefaultDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'none';
    };
    return (
        <div className={classes.App} onDrop={preventDefaultDrop} onDragOver={preventDefaultDrop}>
            <header className={classes.Header}>
                <NavBar />
            </header>

            <main className={classes.Main}>
                <Outlet/>
            </main>

            <footer className={classes.Footer}>
                <CreatedBy />
            </footer>
        </div>
    );
};


