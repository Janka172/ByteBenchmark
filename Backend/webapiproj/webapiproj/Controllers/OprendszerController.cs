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
    public class OprendszerModel
    {
        public string Nev { get; set; }
        public string BuildSzam { get; set; }
        public string Verzio { get; set; }
    }
    public class OprendszerController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(OprendszerModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<OprendszerModel> result = null;

            result = ctx.Oprendszerek.Select(x => new OprendszerModel
            {
                Nev = x.Nev,
                BuildSzam = x.BuildSzam,
                Verzio = x.Verzio
            }).ToList();

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(OprendszerModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            OprendszerModel result = null;

            result = ctx.Oprendszerek.Where(x => x.Nev == name).Select(x => new OprendszerModel
            {
                Nev = x.Nev,
                BuildSzam = x.BuildSzam,
                Verzio = x.Verzio
            }).FirstOrDefault();

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // POST api/<controller>
        [ResponseType(typeof(OprendszerModel))]
        public HttpResponseMessage Post([FromBody] OprendszerModel value)
        {
            try
            {
                var result = ctx.Oprendszerek.Add(new Operaciosrendszer
                {
                    Nev = value.Nev,
                    BuildSzam=value.BuildSzam,
                    Verzio=value.Verzio,

                });
                ctx.SaveChanges();


                return Request.CreateResponse(HttpStatusCode.Created, result);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { error = "Operácios rendszer feltoltése sikertelen." });
            }

        }

        // PUT api/<controller>/5
        [ResponseType(typeof(OprendszerModel))]
        public HttpResponseMessage Patch(int id, string name,string buildszam, [FromBody] OprendszerModel value)
        {
            try
            {
                var result = ctx.Oprendszerek.Where(x => x.Nev == name && x.BuildSzam==buildszam).FirstOrDefault();
                if (result == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Nem található ilyen Operácios rendszer");
                if (value.Nev != null) result.Nev = value.Nev;
                if (value.BuildSzam != null) result.BuildSzam = value.BuildSzam;
                if (value.Verzio != null) result.Verzio = value.Verzio;

                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Update sikeres");
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Request.CreateResponse(HttpStatusCode.Conflict, "Ezzel a névvel már létezik Operácios rendszer.");
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // DELETE api/<controller>/5
        [ResponseType(typeof(OprendszerModel))]
        public HttpResponseMessage Delete(int id, string name, string buildszam)
        {
            var OpId = ctx.Oprendszerek.Where(x => x.Nev == name && x.BuildSzam==buildszam).Select(x => x.Id).FirstOrDefault();
            var set = ctx.Setupok.Where(x => x.OpId == OpId).ToList();

            foreach (var item in set)
            {
                item.OpId = null;
            }


            var result = ctx.Oprendszerek.Where(x => x.Nev == name).FirstOrDefault();
            if (result != null)
            {
                ctx.Oprendszerek.Remove(result);
                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Törlés sikeresen véghezment");
            }
            ctx.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.NotFound, "Nem található");
        }
    }
}