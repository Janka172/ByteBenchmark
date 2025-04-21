using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using webapiproj.Models;
using System.Web.Http.Description;
using webapiproj.Database;

namespace webapiproj.Controllers
{
    public class OprendszerModel
    {
        public string Nev { get; set; }
        public string BuildSzam { get; set; }
        public string Verzio { get; set; }
        public string KepNev { get; set; }
    }
    public class OprendszerController : ApiController
    {
        IProjektContext ctx = new ProjektContext();

        public OprendszerController() { }

        public OprendszerController(IProjektContext context)
        {
            ctx = context;
        }
        // GET api/<controller>
        [ResponseType(typeof(OprendszerModel))]
        public IHttpActionResult Get()
        {
            IEnumerable<OprendszerModel> result = null;

            result = ctx.Oprendszerek.Select(x => new OprendszerModel
            {
                Nev = x.Nev,
                BuildSzam = x.BuildSzam,
                Verzio = x.Verzio,
                KepNev=x.KepNev
            }).ToList();

            return Ok(result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(OprendszerModel))]
        public IHttpActionResult Get(int id, string name)
        {
            OprendszerModel result = null;

            result = ctx.Oprendszerek.Where(x => x.Nev == name).Select(x => new OprendszerModel
            {
                Nev = x.Nev,
                BuildSzam = x.BuildSzam,
                Verzio = x.Verzio,
                KepNev=x.KepNev
            }).FirstOrDefault();
            if (result == null) return NotFound();
            return Ok(result);
        }

        // POST api/<controller>
        [ResponseType(typeof(OprendszerModel))]
        public IHttpActionResult Post([FromBody] OprendszerModel value)
        {
            try
            {
                var result = ctx.Oprendszerek.Add(new Operaciosrendszer
                {
                    Nev = value.Nev,
                    BuildSzam=value.BuildSzam,
                    Verzio=value.Verzio,
                    KepNev=value.KepNev
                });
                ctx.SaveChanges();

                return Content(HttpStatusCode.Created, result);
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.")
                    return Content(HttpStatusCode.Conflict, "Ezzel a névvel és buildszámmal már létezik Operácios rendszer.");
                return InternalServerError(ex);
            }

        }

        // PUT api/<controller>/5
        [ResponseType(typeof(OprendszerModel))]
        public IHttpActionResult Patch(int id, string name,string buildszam, [FromBody] OprendszerModel value)
        {
            try
            {
                var result = ctx.Oprendszerek.Where(x => x.Nev == name && x.BuildSzam==buildszam).FirstOrDefault();
                if (result == null) return NotFound();
                if (value.Nev != null) result.Nev = value.Nev;
                if (value.BuildSzam != null) result.BuildSzam = value.BuildSzam;
                if (value.Verzio != null) result.Verzio = value.Verzio;
                if (value.KepNev != null) result.KepNev = value.KepNev;

                ctx.SaveChanges();
                return Ok("Update sikeres");
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.")
                    return Content(HttpStatusCode.Conflict, "Ezzel a névvel és buildszámmal már létezik Operácios rendszer.");
                return InternalServerError(ex);
            }
        }

        // DELETE api/<controller>/5
        [ResponseType(typeof(OprendszerModel))]
        public IHttpActionResult Delete(int id, string name, string buildszam)
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
                return Ok("Törlés sikeresen véghezment");
            }
            ctx.SaveChanges();
            return NotFound();
        }
    }
}