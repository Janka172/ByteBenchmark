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
        public int Tarhely { get; set; }

    }
    public class ApplikacioController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(ApplikacioModel))]
        public IHttpActionResult Get()
        {
            IEnumerable<ApplikacioModel> result = null;
            result = ctx.Applikaciok.Include(x => x.Kategoria).Select(x => new ApplikacioModel
            {
                Nev = x.Nev,
                KategoriaNev = x.Kategoria.Nev,
                KepeleresiUtja = x.Kepeleresiutja,
                Tarhely=x.Tarhely

            }).ToList();
            return Ok(result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(ApplikacioModel))]
        public IHttpActionResult Get(int id, string name)
        {
            ApplikacioModel result = null;
            result = ctx.Applikaciok.Include(x => x.Kategoria).Where(x => x.Nev == name).Select(x => new ApplikacioModel
            {
                Nev = x.Nev,
                KategoriaNev = x.Kategoria.Nev,
                KepeleresiUtja = x.Kepeleresiutja,
                Tarhely = x.Tarhely
            }).FirstOrDefault();
            return Ok( result);
        }

        // POST api/<controller>
        public IHttpActionResult Post([FromBody] ApplikacioModel value)
        {
            var katId = ctx.Kategoriak.Where(x => x.Nev == value.KategoriaNev).Select(x => x.Id).FirstOrDefault();
            try
            {
                var result = ctx.Applikaciok.Add(new Applikacio
                {
                    Nev=value.Nev,
                    Tarhely=value.Tarhely,
                    KatId=katId,
                    Kepeleresiutja=value.KepeleresiUtja
                });
                ctx.SaveChanges();

                return Created($"api/Applikacio/{result}", result);
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Content(HttpStatusCode.Conflict, "már szerepel ez az applikáció");
                return BadRequest("Applikacio feltoltese sikertelen");
            }
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