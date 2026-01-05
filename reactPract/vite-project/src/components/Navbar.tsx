import { NavLink } from "react-router-dom";
import { useAppState } from '../store/StoreConfig';
import { selectNavigation } from '../store/reducers/allText';

function Navbar() {
  const text = useAppState(selectNavigation)

    return (
        <nav className='z-2 fixed bottom-5 left-5 right-5 flex justify-around items-center backdrop-blur p-3
        md:static md:col-start-1 md:row-start-2 rounded-xl md:flex-col md:items-start md:justify-start md:gap-2 border'>
          <div>
            <NavLink to="/profile">
              {text.profile}
            </NavLink>
          </div>

          <div>
            <NavLink to="/dialogs">
              {text.messages}
            </NavLink>
          </div>

          <div>
            <NavLink to='/users'>
              {text.users}
            </NavLink>
          </div>

          <div>
            <NavLink to="/posts">
              {text.posts}
            </NavLink>
          </div>


      </nav>
    )
}

export default Navbar