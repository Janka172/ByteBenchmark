using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace webapiproj.Models
{
    public class Ram
    {
        public int Id { get; set; }
        public string Nev { get; set; }
        public string MemoriaTipus { get; set; }
        public int Frekvencia { get; set; }
        public int Meret { get; set; }
        public string KepNev { get; set; }
    }
}