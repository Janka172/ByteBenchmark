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
    public class RamModel
    {
        public string Nev { get; set; }
        public string MemoriaTipus { get; set; }
        public double Frekvencia { get; set; }
        public int Meret { get; set; }
    }
    public class RamController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(RamModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<RamModel> result = null;
            result = ctx.Ramok.Select(x => new RamModel
            {
                Nev = x.Nev,
                MemoriaTipus = x.MemoriaTipus,
                Frekvencia = x.Frekvencia,
                Meret = x.Meret
            }).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(RamModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            RamModel result = null;
            result = ctx.Ramok.Where(x => x.Nev == name).Select(x => new RamModel
            {
                Nev = x.Nev,
                MemoriaTipus = x.MemoriaTipus,
                Frekvencia = x.Frekvencia,
                Meret = x.Meret
            }).FirstOrDefault();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // POST api/<controller>
        [ResponseType(typeof(RamModel))]
        public HttpResponseMessage Post([FromBody] RamModel value)
        {
            try
            {
                var result = ctx.Ramok.Add(new Ram
                {
                    Nev = value.Nev,
                    MemoriaTipus=value.MemoriaTipus,
                    Frekvencia=value.Frekvencia,
                    Meret=value.Meret
                });
                ctx.SaveChanges();


                return Request.CreateResponse(HttpStatusCode.Created, result);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { error = "RAM feltoltése sikertelen." });
            }

        }

        // PUT api/<controller>/5
        [ResponseType(typeof(RamModel))]
        public HttpResponseMessage Put(int id, string name,[FromBody] RamModel value)
        {
            try
            {
                var result = ctx.Ramok.Where(x => x.Nev == name).FirstOrDefault();
                if (result == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Nem található ilyen Ram");
                result.Nev = value.Nev;
                result.MemoriaTipus = value.MemoriaTipus;
                result.Frekvencia = value.Frekvencia;
                result.Meret = value.Meret;

                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Update sikeres");
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Request.CreateResponse(HttpStatusCode.Conflict, "Ezzel a névvel már létezik Ram");
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // DELETE api/<controller>/5
        public HttpResponseMessage Delete(int id,string name)
        {
            var ramId = ctx.Videokartyak.Where(x => x.Nev == name).Select(x => x.Id).FirstOrDefault();
            var set = ctx.Setupok.Where(x => x.RamId == ramId).ToList();

            foreach (var item in set)
            {
                item.RamId = null;
            }


            var result = ctx.Ramok.Where(x => x.Nev == name).FirstOrDefault();
            if (result != null)
            {
                ctx.Ramok.Remove(result);
                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Törlés sikeresen véghezment");
            }
            ctx.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.NotFound, "Nem található");
        }
    }
}