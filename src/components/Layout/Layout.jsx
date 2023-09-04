import classes from './Layout.module.scss'
import { CreatedBy } from '../UI/CreatedBy/CreatedBy';
import { NavBar } from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { useSelector } from 'react-redux';

export const Layout = () => {
    const preventDefaultDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'none';
    };
    const isLoading = useSelector((state) => state.submit.isLoading)
    return (
        <div className={classes.App} onDrop={preventDefaultDrop} onDragOver={preventDefaultDrop}>
            <header className={classes.Header}>
                <NavBar />
            </header>

            <main className={classes.Main}>
                {
                    isLoading
                    ?
                    <Loading/>
                    :
                    <Outlet/>
                }

            </main>

            <footer className={classes.Footer}>
                <CreatedBy />
            </footer>
        </div>
    );
};


