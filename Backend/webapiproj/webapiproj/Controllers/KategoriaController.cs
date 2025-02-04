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
    public class KategoriaModel
    {
        public string Nev { get; set; }
    }
    public class KategoriaController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(KategoriaModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<KategoriaModel> result = null;
            result = ctx.Kategoriak.Select(x => new KategoriaModel
            {
                Nev = x.Nev
            }).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(KategoriaModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            KategoriaModel result = null;
            result = ctx.Kategoriak.Where(x => x.Nev == name).Select(x => new KategoriaModel
            {
                Nev = x.Nev
            }).FirstOrDefault();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // POST api/<controller>
        [ResponseType(typeof(KategoriaModel))]
        public HttpResponseMessage Post([FromBody] KategoriaModel value)
        {
            try
            {
                var result = ctx.Kategoriak.Add(new Kategoria
                {
                    Nev=value.Nev
                });
                ctx.SaveChanges();


                return Request.CreateResponse(HttpStatusCode.Created, result);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { error = "Kategoria feltoltése sikertelen." });
            }

        }

        // PUT api/<controller>/5
        [ResponseType(typeof(KategoriaModel))]
        public HttpResponseMessage Patch(int id, string name, [FromBody] KategoriaModel value)
        {
            try
            {
                var result = ctx.Kategoriak.Where(x => x.Nev == name).FirstOrDefault();
                if (result == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Nem található ilyen Kategoria");
                if (value.Nev != null) result.Nev = value.Nev;

                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Update sikeres");
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Request.CreateResponse(HttpStatusCode.Conflict, "Ezzel a névvel már létezik Kategoria rendszer.");
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // DELETE api/<controller>/5
        [ResponseType(typeof(KategoriaModel))]
        public HttpResponseMessage Delete(int id, string name)
        {
            var KatdId = ctx.Kategoriak.Where(x => x.Nev == name).Select(x => x.Id).FirstOrDefault();
            var set = ctx.Applikaciok.Where(x => x.KatId == KatdId).ToList();

            foreach (var item in set)
            {
                item.KatId = null;
            }


            var result = ctx.Kategoriak.Where(x => x.Nev == name).FirstOrDefault();
            if (result != null)
            {
                ctx.Kategoriak.Remove(result);
                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Törlés sikeresen véghezment");
            }
            ctx.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.NotFound, "Nem található");
        }
    }
}