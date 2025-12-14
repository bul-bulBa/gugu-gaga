import '../App.css'
import { NavLink } from "react-router-dom";
import { useAppState } from '../store/StoreConfig';
import { selectAllText } from '../store/reducers/allText';

function Navbar() {
  const text = useAppState(selectAllText)

    return (
        <nav className='z-2 fixed bottom-5 left-5 right-5 flex justify-around items-center backdrop-blur p-3
        md:static md:col-start-1 md:row-start-2 border border-stone-200 rounded-xl md:flex-col md:items-start md:justify-start md:gap-2
        dark:border-stone-900'>
          <div>
            <NavLink to="/profile">
              {text.navigation.profile}
            </NavLink>
          </div>

          <div>
            <NavLink to="/dialogs">
              {text.navigation.messages}
            </NavLink>
          </div>

          <div>
            <NavLink to='/users'>
              {text.navigation.users}
            </NavLink>
          </div>

          <div>
            <NavLink to="/posts">
              {text.navigation.posts}
            </NavLink>
          </div>


      </nav>
    )
}

export default Navbar