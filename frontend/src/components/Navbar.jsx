import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
        <nav>
            <h2>
                <Link to="/">Memories</Link>
            </h2>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/add-memory">Adicionar Mememória</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar