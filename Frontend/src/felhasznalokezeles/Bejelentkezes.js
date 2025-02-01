import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Bejelentkezes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:44316/api/Profil/Authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Email: email,
          Jelszo: password
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("loggedInUser", JSON.stringify(data));
        navigate("/");
      } else {
        const errorMessage = await response.text(); // A szerver által visszaadott hibaüzenet
        setError(errorMessage);
      }
    } catch (err) {
      setError("Hálózati hiba történt!");
      console.error("Hiba:", err);
    }
  };

  return (
    <div>
      <h2 className="bejCim">Bejelentkezés</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>

        <div className="elemSor">
            <div className="bevitelNeve">E-mail cím:</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>       

        <div className="elemSor">
            <div className="bevitelNeve">Jelszó:</div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="subGomb">Bejelentkezés</button>
      </form>
    </div>
  );
}

export default Bejelentkezes;
