using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
namespace webapiproj.Models
{
    public class Operaciosrendszer
    {
        public int Id { get; set; }
        public string Nev { get; set; }
        public string BuildSzam { get; set; }
        public string Verzio { get; set; }
        public string KepNev { get; set; }
    }
}