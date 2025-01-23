using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace webapiproj.Models
{
    public class Setup
    {
        public int Id { get; set; }
        public string Gp { get; set; }
        //videokartya kapcsoalt
        public int? VidkaId { get; set; }
        [ForeignKey("VidkaId")]
        public virtual Videokartya Videokartya { get; set; }
        //processzor kapcsolat
        public int? ProcId { get; set; }
        [ForeignKey("ProcId")]
        public virtual Processzor Processzor { get; set; }
        //ram kapcsolat
        public int? RamId { get; set; }
        [ForeignKey("RamId")]
        public virtual Ram Ram { get; set; }
        //operácios kapcsolat
        public int? OpId { get; set; }
        [ForeignKey("OpId")]
        public virtual Operaciosrendszer Oprendszer { get; set; }
        //alaplap kapcsolat
        public int? AlaplId { get; set; }
        [ForeignKey("AlaplId")]
        public virtual Alaplap Alaplap { get; set; }

        public int? ApplikacioId { get; set; }
        [ForeignKey("ApplikacioId")]
        public virtual Applikacio Applikacio { get; set; }


    }
}