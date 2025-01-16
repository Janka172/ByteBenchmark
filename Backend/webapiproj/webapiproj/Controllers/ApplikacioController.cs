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
    public class ApplikacioModel
    {
        public string Nev { get; set; }
        public string KategoriaNev { get; set; }
        public string KepeleresiUtja { get; set; }

    }
    public class ApplikacioController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(ApplikacioModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<ApplikacioModel> result = null;
            result = ctx.Applikaciok.Include(x => x.Kategoria).Select(x => new ApplikacioModel
            {
                Nev = x.Nev,
                KategoriaNev = x.Kategoria.Nev,
                KepeleresiUtja = x.Kepeleresiutja

            }).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(ApplikacioModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            ApplikacioModel result = null;
            result = ctx.Applikaciok.Include(x => x.Kategoria).Where(x => x.Nev == name).Select(x => new ApplikacioModel
            {
                Nev = x.Nev,
                KategoriaNev = x.Kategoria.Nev,
                KepeleresiUtja = x.Kepeleresiutja
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