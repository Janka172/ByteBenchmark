using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace webapiproj.Models
{
    public class Applikacio
    {
        public int Id { get; set; }
        public string Nev { get; set; }
        public int Tarhely { get; set; }
        public string Kepeleresiutja { get; set; }

        //Kategoria kapcsolat
        public int? KatId { get; set; }
        [ForeignKey("KatId")]
        public virtual Kategoria Kategoria { get; set; }

    }
}