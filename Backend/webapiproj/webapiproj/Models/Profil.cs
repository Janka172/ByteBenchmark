using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using webapiproj.UserManager;

namespace webapiproj.Models
{
    public class Profil
    {
        public int Id { get; set; }
        public string Felhasznalonev { get; set; }
        public string Email { get; set; }
        public byte[] Jelszo { get; set; }
        public byte[] JelszoUjra { get; set; }
        public int Jogosultsag { get; set; }
        public string Tema { get; set; }
        public string LogoEleresiUtja { get; set; }

        public Profil() { }
        public Profil(string felhasznalonev,string email,string passwd,int jog,string tema, string logo)
        {
            Felhasznalonev = felhasznalonev;
            Email = email;
            PasswdManager.CreatePasswordHash(passwd, out byte[] hash, out byte[] salt);
            Jelszo = salt;
            JelszoUjra = hash;
            Jogosultsag = jog;
            Tema = tema;
            LogoEleresiUtja = logo;
        }

    }
}