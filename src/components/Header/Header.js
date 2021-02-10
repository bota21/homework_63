import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return <header className="Header">
        <div className='logo'>Static Pages</div>
        <nav className="menu">
            <NavLink to='/pages/home' activeClassName="active">Home</NavLink>
            <NavLink to='/pages/about' activeClassName="active">About</NavLink>
            <NavLink to='/pages/contacts' activeClassName="active">Contacts</NavLink>
            <NavLink to='/pages/divisions' activeClassName="active">Divisions</NavLink>
            <NavLink to='/pages/admin' activeClassName="active">Admin</NavLink>
        </nav>
    </header>
}

export default Header