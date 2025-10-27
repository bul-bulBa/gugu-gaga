import '../App.css'
import { NavLink } from "react-router-dom";
function Navbar() {

    return (
        <nav className='col-start-1 row-start-2 border-2 border-stone-300 rounded-xl flex flex-col items-start p-[10px] gap-2'>
        <div>
          <NavLink to="/profile">
            Profile
          </NavLink>
        </div>

        <div>
          <NavLink to="/dialogs">
            Messages
          </NavLink>
        </div>

        <div>
          <NavLink to='/users'>
            Users
          </NavLink>
        </div>

        <div>
          <NavLink to="/posts">
            Posts
          </NavLink>
        </div>


      </nav>
    )
}

export default Navbar