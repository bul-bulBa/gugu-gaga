import '../App.css'
import { NavLink } from "react-router-dom";
function Navbar() {

    return (
        <nav className='z-2 fixed bottom-5 left-5 right-5 flex justify-around items-center backdrop-blur p-3
        md:static md:col-start-1 md:row-start-2 border border-stone-200 rounded-xl md:flex-col md:items-start md:justify-start md:gap-2'>
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