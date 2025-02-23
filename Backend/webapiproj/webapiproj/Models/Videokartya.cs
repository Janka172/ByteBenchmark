using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace webapiproj.Models
{
    public class Videokartya
    {
        [Key]
        public int Id { get; set; }
        public string Nev { get; set; }
        public string AlaplapiCsatlakozas { get; set; }
        public int AjanlottTapegyseg { get; set; }
        public string MonitorCsatlakozas { get; set; }
        public int Vram { get; set; }
        public string ChipGyartoja { get; set; }
        public string KepNev { get; set; }
    }
}