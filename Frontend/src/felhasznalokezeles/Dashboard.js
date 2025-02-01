import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Kijelentkezes from "./Kijelentkezes";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div>
      <h2>Üdvözöllek, {user.nev}!</h2>
      <Kijelentkezes />
    </div>
  );
}

export default Dashboard;
