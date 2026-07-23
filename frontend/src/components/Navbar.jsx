import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                background: "#222",
                color: "#fff"
            }}
        >

            <h2>Task Manager</h2>

            <div>

                Welcome {user?.name}

                <button
                    style={{ marginLeft: "20px" }}
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;