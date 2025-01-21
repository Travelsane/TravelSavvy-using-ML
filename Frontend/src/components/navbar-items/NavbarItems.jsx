import { Link, useNavigate, useLocation } from 'react-router-dom';
import DropdownButton from 'components/ux/dropdown-button/DropdownButton';
import { networkAdapter } from 'services/NetworkAdapter';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';

/**
 * A component that renders the navigation items for the navbar for both mobile/desktop view.
 *
 * @param {Object} props - The component's props.
 * @param {boolean} props.isAuthenticated - A flag indicating whether the user is authenticated.
 * @param {Function} props.onHamburgerMenuToggle
 */
const NavbarItems = ({ isAuthenticated, onHamburgerMenuToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AuthContext);

  /**
   * Handles the logout action by calling the logout API and updating the authentication state.
   */
  const handleLogout = async () => {
    await networkAdapter.post('api/users/logout');
    context.triggerAuthCheck();
    navigate('/login');
  };

  const dropdownOptions = [
    { name: 'Profile', onClick: () => navigate('/user-profile') },
    { name: 'Logout', onClick: handleLogout },
  ];

  /**
   * Determines if a given path is the current active path.
   *
   * @param {string} path - The path to check.
   * @returns {boolean} - True if the path is active, false otherwise.
   */
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="/"
          className={`uppercase font-medium text-slate-100 hover-underline-animation ${
            isActive('/') && 'active-link'
          }`}
          onClick={onHamburgerMenuToggle}
        >
          Home
        </Link>
      </li>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="/hotels"
          className={`uppercase font-medium text-slate-100 hover-underline-animation ${
            isActive('/hotels') && 'active-link'
          }`}
          onClick={onHamburgerMenuToggle}
        >
          Hotels
        </Link>
      </li>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <a
          href="https://www.skyscanner.co.in/?&utm_source=google&utm_medium=cpc&utm_campaign=IN-Flights-Search-EN-Generics-New&utm_term=flight+booking&associateID=SEM_FLI_19465_00000&campaign_id=19347634260&adgroupid=147703716634&keyword_id=aud-856837802864:kwd-18709060&gad_source=1&gclid=CjwKCAiAgoq7BhBxEiwAVcW0LFu6TAdWL-uY5ctit7dhOPY67QFODtMoGkUAo9LNpzOr9CLub0TRaxoCnvwQAvD_BwE&gclsrc=aw.ds"
          className="uppercase font-medium text-slate-100 hover-underline-animation"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onHamburgerMenuToggle}
        >
          Flight
        </a>
      </li>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="https://ea06-35-243-144-52.ngrok-free.app/"
          className={`uppercase font-medium text-slate-100 hover-underline-animation ${
            isActive('https://ea06-35-243-144-52.ngrok-free.app/') &&
            'active-link'
          }`}
          onClick={onHamburgerMenuToggle}
        >
          Health
        </Link>
      </li>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="https://kaushalsahu07.github.io/weather/index.html"
          className={`uppercase font-medium text-slate-100 hover-underline-animation ${
            isActive('https://ea06-35-243-144-52.ngrok-free.app/') &&
            'active-link'
          }`}
          onClick={onHamburgerMenuToggle}
        >
          Weather
        </Link>
      </li>

      <li
        className={`${!isAuthenticated && 'p-4 hover:bg-blue-900 md:hover:bg-brand'}`}
      >
        {isAuthenticated ? (
          <DropdownButton triggerType="click" options={dropdownOptions} />
        ) : (
          <Link
            to="/login"
            className={`uppercase font-medium text-slate-100 hover-underline-animation ${
              isActive('/login') && 'active-link'
            }`}
            onClick={onHamburgerMenuToggle}
          >
            Login/Register
          </Link>
        )}
      </li>
    </>
  );
};

export default NavbarItems;
