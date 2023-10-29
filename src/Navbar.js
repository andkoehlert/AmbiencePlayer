import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ isAuthenticated }) {
  return (
    <nav className="text-slate-800 ">
      <ul className="flex p-5 pm flex gap-4">
        <li className="mr-6">
          <Link to="/" className="site-title">
            Home
          </Link>
        </li>
        {isAuthenticated && (
  <li className="mr-6">
          <CustomLink to="/add">Add User</CustomLink>
        </li>
        )}
        <li className="mr-6">
          <CustomLink to="/login">Login</CustomLink>
        </li>

        {isAuthenticated && (
  <li className="mr-6">
          <CustomLink to="/admin">Admin</CustomLink>
        </li>
        )}
      

        {isAuthenticated && (
          <li className="mr-6">
            <CustomLink to="/signout">Sign Out</CustomLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  return (
    <li>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
