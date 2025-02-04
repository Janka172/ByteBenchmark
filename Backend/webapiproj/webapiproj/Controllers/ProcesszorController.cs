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
    public class ProcesszorModel
    {
        public string Nev { get; set; }
        public string AlaplapFoglalat { get; set; }
        public int SzalakSzama { get; set; }
        public string TamogatottMemoriatipus { get; set; }
        public int ProcesszormagokSzama { get; set; }
        public double ProcesszorFrekvencia { get; set; }
        public string Gyarto { get; set; }
        public int AjanlottTapegyseg { get; set; }
        public bool IntegraltVideokartya { get; set; }
    }
    public class ProcesszorController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(ProcesszorModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<ProcesszorModel> result = null;

            result = ctx.Processzorok.Select(x => new ProcesszorModel
            {
                Nev = x.Nev,
                AlaplapFoglalat = x.AlaplapFoglalat,
                SzalakSzama = x.SzalakSzama,
                TamogatottMemoriatipus = x.TamogatottMemoriatipus,
                ProcesszormagokSzama = x.ProcesszormagokSzama,
                ProcesszorFrekvencia = x.ProcesszorFrekvencia,
                Gyarto = x.Gyarto,
                AjanlottTapegyseg = x.AjanlottTapegyseg,
                IntegraltVideokartya = x.IntegraltVideokartya
            }).ToList();

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(ProcesszorModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            ProcesszorModel result = null;

            result = ctx.Processzorok.Where(x => x.Nev == name).Select(x => new ProcesszorModel
            {
                Nev = x.Nev,
                AlaplapFoglalat = x.AlaplapFoglalat,
                SzalakSzama = x.SzalakSzama,
                TamogatottMemoriatipus = x.TamogatottMemoriatipus,
                ProcesszormagokSzama = x.ProcesszormagokSzama,
                ProcesszorFrekvencia = x.ProcesszorFrekvencia,
                Gyarto = x.Gyarto,
                AjanlottTapegyseg = x.AjanlottTapegyseg,
                IntegraltVideokartya = x.IntegraltVideokartya
            }).FirstOrDefault();
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