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
        public double BProcesszorFrekvencia{get; set;}
        public string Gyarto { get; set; }
        public int AjanlottTapegyseg { get; set; }
        public bool IntegraltVideokartya { get; set; }
        public string Kepnev { get; set; }
    }
    public class ProcesszorController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(ProcesszorModel))]
        public IHttpActionResult Get()
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
                BProcesszorFrekvencia=x.BFrekvencia,
                Gyarto = x.Gyarto,
                AjanlottTapegyseg = x.AjanlottTapegyseg,
                IntegraltVideokartya = x.IntegraltVideokartya,
                Kepnev=x.KepNev
                
            }).ToList();

            return Ok(result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(ProcesszorModel))]
        public IHttpActionResult Get(int id, string name)
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
                BProcesszorFrekvencia = x.BFrekvencia,
                Gyarto = x.Gyarto,
                AjanlottTapegyseg = x.AjanlottTapegyseg,
                IntegraltVideokartya = x.IntegraltVideokartya,
                Kepnev = x.KepNev
            }).FirstOrDefault();
            return Ok(result);
        }

        // POST api/<controller>
        [ResponseType(typeof(ProcesszorModel))]
        public IHttpActionResult Post([FromBody] ProcesszorModel value)
        {
            try
            {
                var result = ctx.Processzorok.Add(new Processzor
                {
                    Nev = value.Nev,
                    AlaplapFoglalat= value.AlaplapFoglalat,
                    SzalakSzama = value.SzalakSzama,
                    TamogatottMemoriatipus = value.TamogatottMemoriatipus,
                    ProcesszormagokSzama=value.ProcesszormagokSzama,
                    ProcesszorFrekvencia=value.ProcesszorFrekvencia,
                    BFrekvencia=value.BProcesszorFrekvencia,
                    Gyarto=value.Gyarto,
                    AjanlottTapegyseg=value.AjanlottTapegyseg,
                    IntegraltVideokartya=value.IntegraltVideokartya,
                    KepNev=value.Kepnev

                });
                ctx.SaveChanges();


                return Content(HttpStatusCode.Created, result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        // PUT api/<controller>/5
        [ResponseType(typeof(ProcesszorModel))]
        public IHttpActionResult Put(int id, string name, [FromBody] ProcesszorModel value)
        {
            try
            {
                var result = ctx.Processzorok.Where(x => x.Nev == name).FirstOrDefault();
                if (result == null) return NotFound();
                if(value.Nev!=null) result.Nev = value.Nev;
                if (value.AlaplapFoglalat!=null) result.AlaplapFoglalat = value.AlaplapFoglalat;
                if (value.SzalakSzama!=0) result.SzalakSzama = value.SzalakSzama;
                if (value.TamogatottMemoriatipus!=null) result.TamogatottMemoriatipus = value.TamogatottMemoriatipus;
                if (value.ProcesszormagokSzama!=0) result.ProcesszormagokSzama = value.ProcesszormagokSzama;
                if (value.ProcesszorFrekvencia!=0) result.ProcesszorFrekvencia = value.ProcesszorFrekvencia;
                if (value.BProcesszorFrekvencia!=0) result.BFrekvencia = value.BProcesszorFrekvencia;
                if(value.Gyarto!=null) result.Gyarto = value.Gyarto;
                if (value.AjanlottTapegyseg!=0) result.AjanlottTapegyseg = value.AjanlottTapegyseg;
                if (value.IntegraltVideokartya!=null) result.IntegraltVideokartya = value.IntegraltVideokartya;
                if (value.Kepnev != null) result.KepNev = value.Kepnev;

                ctx.SaveChanges();
                return Ok("Sikeres Update");
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Content(HttpStatusCode.Conflict, "Ezzel a névvel már létezik processzor");
                return InternalServerError(ex);
            }
        }

        // DELETE api/<controller>/5
        [ResponseType(typeof(ProcesszorModel))]
        public IHttpActionResult Delete(int id, string name)
        {
            var ProcId = ctx.Processzorok.Where(x => x.Nev == name).Select(x => x.Id).FirstOrDefault();
            var set = ctx.Setupok.Where(x => x.ProcId == ProcId).ToList();

            foreach (var item in set)
            {
                item.ProcId = null;
            }


            var result = ctx.Processzorok.Where(x => x.Nev == name).FirstOrDefault();
            if (result != null)
            {
                ctx.Processzorok.Remove(result);
                ctx.SaveChanges();
                return Ok("Törlés sikeresen véghezment");
            }
            ctx.SaveChanges();
            return NotFound();
        }
    }
}