using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using webapiproj.Models;
using System.Web.Http.Description;

namespace webapiproj.Controllers
{
    public class SetupModel
    {
        public string ApplikacioNeve { get; set; }
        public string Gepigeny { get; set; }
        public string VidekortyaNev { get; set; }
        public int VideokartyaVram { get; set; }
        public string ProcesszorNev { get; set; }
        public int ProcesszorSzalakSzama { get; set; }
        public int ProcesszorMagokSzama { get; set; }
        public double ProcesszorFrekvencia { get; set; }
        public double RamFrekvencia { get; set; }
        public int RamMeret { get; set; }
        public string OprendszerNev { get; set; }
        public int Tarhely { get; set; }
    }
    public class SetupController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(SetupModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<SetupModel> result = null;
            result = ctx.Setupok.Include(x => x.Alaplap).Include(x => x.Oprendszer).Include(x => x.Processzor).Include(x => x.Ram).Include(x => x.Videokartya).Include(x => x.Applikacio).Select(x => new SetupModel
            {
                ApplikacioNeve = x.Applikacio.Nev,
                Gepigeny = x.Gp,
                VidekortyaNev = x.Videokartya.Nev,
                VideokartyaVram = x.Videokartya.Vram,
                ProcesszorNev = x.Processzor.Nev,
                ProcesszorSzalakSzama = x.Processzor.SzalakSzama,
                ProcesszorMagokSzama = x.Processzor.ProcesszormagokSzama,
                ProcesszorFrekvencia = x.Processzor.ProcesszorFrekvencia,
                RamMeret = x.Ram.Meret,
                RamFrekvencia = x.Ram.Frekvencia,
                OprendszerNev = x.Oprendszer.Nev,
                Tarhely = x.Applikacio.Tarhely
            }).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(SetupModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            IEnumerable<SetupModel> result = null;
            result = ctx.Setupok.Include(x => x.Alaplap).Include(x => x.Oprendszer).Include(x => x.Processzor).Include(x => x.Ram).Include(x => x.Videokartya).Include(x => x.Applikacio).Where(x => x.Applikacio.Nev == name).Select(x => new SetupModel
            {
                ApplikacioNeve = x.Applikacio.Nev,
                Gepigeny = x.Gp,
                VidekortyaNev = x.Videokartya.Nev,
                VideokartyaVram = x.Videokartya.Vram,
                ProcesszorNev = x.Processzor.Nev,
                ProcesszorSzalakSzama = x.Processzor.SzalakSzama,
                ProcesszorMagokSzama = x.Processzor.ProcesszormagokSzama,
                ProcesszorFrekvencia = x.Processzor.ProcesszorFrekvencia,
                RamMeret = x.Ram.Meret,
                RamFrekvencia = x.Ram.Frekvencia,
                OprendszerNev = x.Oprendszer.Nev,
                Tarhely = x.Applikacio.Tarhely
            }).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // POST api/<controller>
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}
