import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Felh.css";

function Regisztr() {
  const [felhasznaloNev, setFelhasznaloNev] = useState("");
  const [email, setEmail] = useState("");
  const [tema, setTema] = useState("dark");
  const [jelszo, setJelszo] = useState("");
  const [jelszoUjra, setJelszoUjra] = useState("");
  const [error, setError] = useState("");
  const [hibaUzenet, setHibaUzenet] = useState("");
  const [vanHiba, setVanHiba] = useState(false);
  const [jelszoInfoNyitva, setJelszoInfoNyitva] = useState("none");
  const navigate = useNavigate();

  function regisztralas(e) {
    e.preventDefault();
    let atmHibaUzenet=[];
    setVanHiba(false);
    setHibaUzenet([]);

    // Felhasználók lekérése a localStorage-ból
    const felhasznalok = JSON.parse(localStorage.getItem("users")) || [];

    // Hiba: felhasználónév
    let foglaltNev = false;
    felhasznalok.map(felh => {
      if(felh.Felhasznalonev == felhasznaloNev) foglaltNev=true;
      else foglaltNev=false;
    });
    if (foglaltNev) {
      atmHibaUzenet.push(
        <p className="hibaSor" key='fh'>Ez az felhasználónév már foglalt !</p>
      );
    }

    // Hiba: e-mail
    var foglaltEmail = false;
    felhasznalok.map(felh => {
      if(felh.Email == email) foglaltEmail=true;
      else foglaltEmail=false;
    });
    if (foglaltEmail) {
      atmHibaUzenet.push(
        <p className="hibaSor" key='eh'>Ez az e-mail cím már foglalt !</p>
      );
    }

    // Hiba: jelszó: nem egyezik
    if (jelszo != jelszoUjra) {
      atmHibaUzenet.push(
        <p className="hibaSor" key='jh'>A két jelszó nem egyezik meg !</p>
      );
    }
    // Hiba: jelszó: erősség
    const minta = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~`\-=\|])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;  
    if (!minta.test(jelszo)) {
      atmHibaUzenet.push(
        <p className="hibaSor" key='jh'>A jelszó nem elég erős !</p>
      );
      setJelszoInfoNyitva('grid');
    }

    if (atmHibaUzenet.length > 0) {
      setVanHiba(true);
      setHibaUzenet(atmHibaUzenet);
      return;
    }

    var ujFelh = {
      'Felhasznalonev': felhasznaloNev,
      'Email': email,
      'Jogosultsag': 0,
      'Tema': tema,
      'Jelszo': jelszo,
      'LogoEleresiUtja': 'profil.hiany.jpg'
    };
    rogzites(ujFelh);

    navigate("/");
  };

  function jelszoInfoMegnyitasa(){
    if(jelszoInfoNyitva == 'none') setJelszoInfoNyitva('grid');
    else setJelszoInfoNyitva('none');
  }

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

      <div className="regHiba" style={{display: vanHiba ? 'grid' : 'none'}}>
        {vanHiba ? hibaUzenet : console.log()}
      </div>

      <form onSubmit={regisztralas}>
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
          <div className="jelszoMenu">
            <p className="bevitelNeve">Jelszó:</p>
            <div className="jelszoInfoGomb" onClick={jelszoInfoMegnyitasa}>I</div>
          </div>

          <div className="jelszoInfoSzoveg" style={{display: jelszoInfoNyitva}}>
            A regisztrációhoz erős jelszóra van szükség.<br/>
            - Legalább 8 karakeres hosszúság,<br/>
            - Legalább 1 nagy betűt-<br/>
            - Legalább egy speciális karaktert-<br/>
            - Legalább egy számot<br/>
            tartalmaznia kell !<br/>
          </div>

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
