using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace webapiproj.Models
{
    public class Processzor
    {
        public int Id { get; set; }
        public string Nev { get; set; }
        public string AlaplapFoglalat { get; set; }
        public int SzalakSzama { get; set; }
        public string TamogatottMemoriatipus { get; set; }
        public int ProcesszormagokSzama { get; set; }
        public string Gyarto { get; set; }
        public int AjanlottTapegyseg { get; set; }
        public bool IntegraltVideokartya { get; set; }
        public double ProcesszorFrekvencia { get; set; }
    }
}