using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace webapiproj.Models
{
    public class Profil
    {
        public int Id { get; set; }
        public string Felhasznalonev { get; set; }
        public string Email { get; set; }
        public string Jelszo { get; set; }
        public string JelszoUjra { get; set; }
        public int Jogosultsag { get; set; }
        public string Tema { get; set; }
        public string LogoEleresiUtja { get; set; }

    }
}