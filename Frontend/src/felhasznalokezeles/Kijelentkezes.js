import { useNavigate } from "react-router-dom";

function Kijelentkezes() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return <button onClick={handleLogout}>Kijelentkezés</button>;
}

export default Kijelentkezes;
