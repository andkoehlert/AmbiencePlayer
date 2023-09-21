import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-teal-600 text-slate-200	">
    <ul class="flex">
    <li class="mr-6">
    <Link to="/" className="site-title">
Home      </Link>    </li>
    <li class="mr-6">
    <CustomLink to="/about">About</CustomLink>
    </li>
    <li class="mr-6">
    <CustomLink to="/about">About</CustomLink>
    </li>
    <li class="mr-6">
    <CustomLink to="/admin">Admin</CustomLink>
    </li>
  </ul>
  </nav>
  )
}


function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}