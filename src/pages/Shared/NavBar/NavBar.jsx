import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [cart] = useCart();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><Link to="/order/salad">Order Food</Link></li>
        {
            // user ? 'true': 'false'
            // user ? condition ? 'double true' : 'one true' : 'false' 
        }
        {
            user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        }
         {!isAdmin && user && (
            <li>
                <Link to="/dashboard/cart">
                    <button className="btn gap-2 -mt-3">
                        <FaShoppingCart className="mr-4"></FaShoppingCart>
                        <div className="badge badge-secondary">+{cart.length}</div>
                    </button>
                </Link>
            </li>
        )}
        {
            user ? <>
            
                
             
              
                <Link to="/dashboard/cart">
                    <div className="flex items-center -ml-6 lg:ml-0">
                        <img
                            src={user?.photoURL}
                            alt="User"
                            className="rounded-full h-9 w-9 mr-2 ml-8"
                        />
                        <span className="font-bold text-xl text-white-400 mt-1">{user?.displayName}</span>
       
                     
                     
                    </div>
                </Link>
    <button onClick={handleLogOut} className="btn btn-outline btn-error lg:-mt-2 lg:ml-5 mt-7 ">LogOut</button>
                
            </> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        }

        
    </>

    return (
        <>
            <div className="navbar lg:fixed lg:z-10 bg-opacity-30 max-w-screen-xl bg-black text-white -mt-2 lg:mt-0">
                <div className="navbar-start ">
                <div className={`dropdown from-neutral-50 -mt-4 z-12 ${isDropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                {isDropdownOpen && (
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-6 -ml-3 shadow bg-base-100 rounded-box w-52 text-black z-10 font-bold">
                        {navOptions}
                    </ul>
                )}
            </div>
                    <a href="/" className="-mt-2 ml-24 -mr-20 lg:ml-0 lg:mr-0 md:ml-64  "><img src="https://i.ibb.co/52gRF6p/rsz-food-removebg-preview.png" alt="" /></a>
                </div>
                <div className="navbar-center hidden lg:flex  mt-4 mr-32 ">
                    <ul className="menu menu-horizontal px-1 text-lg ">
                        {navOptions}
                    </ul>
                </div>
                
            </div>
        </>
    );
};

export default NavBar;