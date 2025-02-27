import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Felh.css";

function Regisztr() {
  const [felhasznaloNev, setFelhasznaloNev] = useState("");
  const [jogosultsag, setJogosultsag] = useState("");
  const [email, setEmail] = useState("");
  const [tema, setTema] = useState("dark");
  const [jelszo, setJelszo] = useState("");
  const [jelszoUjra, setJelszoUjra] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    // Felhasználók lekérése a localStorage-ból
    const felhasznalok = JSON.parse(localStorage.getItem("users")) || [];

    // Hiba: felhasználónév
    var foglaltNev = felhasznalok.find(user => user.felhasznaloNev == felhasznaloNev);
    if (foglaltNev) {
      setError("Ez az név cím már foglalt!");
      return;
    }

    // Hiba: jog

    // Hiba: e-mail
    var foglaltEmail = felhasznalok.find(user => user.email == email);
    if (foglaltEmail) {
      setError("Ez az email cím már foglalt!");
      return;
    }

    // Hiba: jelszó
    if (jelszo !== jelszoUjra) {
      setError("A két jelszó nem egyezik meg!");
      return;
    }

    var ujFelh = {
      'Felhasznalonev': felhasznaloNev,
      'Email': email,
      'Jogosultsag': jogosultsag,
      'Tema': tema,
      'Jelszo': jelszo,
      'LogoEleresiUtja': 'kep.jpg'
    };
    rogzites(ujFelh);

    navigate("/");
  };

  async function rogzites(uj) {
    try {
      const response = await fetch('https://localhost:44316/api/Profil', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(uj)
      });

      if (!response.ok) {
          throw new Error(`Hiba: ${response.status}`);
      }

      const data = await response.json();
      console.log('Sikeres regisztráció:', data);
    } catch (error) {
        console.error('Hiba történt:', error);
    }
  }

  return (
    <div className="regForm">
      <div className="regCim">Regisztráció</div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="menuElem">
          <p className="bevitelNeve">Felhasználónév:</p>
          <input type="text" value={felhasznaloNev} onChange={(e) => setFelhasznaloNev(e.target.value)} required />
        </div>

        <div className="menuElem">
          <p className="bevitelNeve">E-mail cím:</p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="menuElem">
          <p className="bevitelNeve">Téma:</p>
          <select value={tema} onChange={(e) => setTema(e.target.value)}>
            <option value="dark">Sötét</option>
            <option value="light">Világos</option>
          </select>
        </div>
        
        <div className="menuElem jelszoegy">
          <p className="bevitelNeve">Jelszó:</p>
          <input type="password" value={jelszo} onChange={(e) => setJelszo(e.target.value)} required />
        </div>
        <div className="menuElem jelszoketto">
          <p className="bevitelNeve">Jelszó újra:</p>
          <input type="password" value={jelszoUjra} onChange={(e) => setJelszoUjra(e.target.value)} required />
        </div>
        
        <div className="gombDiv">
          <button type="submit" className="submitGomb">Regisztráció</button>
        </div>
      </form>
    </div>
  );
}

export default Regisztr;
