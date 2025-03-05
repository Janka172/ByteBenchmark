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
            if (result == null) return NotFound();
            return Ok( result);
        }

        // POST api/<controller>
        [ResponseType(typeof(ApplikacioModel))]
        public IHttpActionResult Post([FromBody] ApplikacioModel value)
        {
            var katId = ctx.Kategoriak.Where(x => x.Nev == value.KategoriaNev).Select(x => x.Id).FirstOrDefault();
            if (katId == 0) return Content(HttpStatusCode.NotFound, "Nem szerepel ez a kategoria");
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

                return Ok();
                //return Created($"api/Applikacio/{result}", result);
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Content(HttpStatusCode.Conflict, "már szerepel ez az applikáció");
                return BadRequest("Applikacio feltoltese sikertelen");
            }
        }

        // PUT api/<controller>/5
        [ResponseType(typeof(ApplikacioModel))]
        public IHttpActionResult Patch(int id,string name, [FromBody] ApplikacioModel value)
        {
            try
            {
                var result = ctx.Applikaciok.Where(x => x.Nev == name).FirstOrDefault();
                var katresult = ctx.Kategoriak.Where(x => x.Nev == value.KategoriaNev).Select(x=>x.Id).FirstOrDefault();
                if (katresult == null) return Content(HttpStatusCode.NotFound, "Nincs ilyen kategoria");
                if (result == null) return Content(HttpStatusCode.NotFound, "Nincs ilyen Alkalmazás"); ;
                if (value.Nev != null) result.Nev = value.Nev;
                if (value.Tarhely != null) result.Tarhely=value.Tarhely;
                if (value.KepeleresiUtja != null) result.Kepeleresiutja = value.KepeleresiUtja;
                if (value.KategoriaNev != null) result.KatId = katresult;

                ctx.SaveChanges();
                return Ok(result);
                //return Ok(result);
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Content(HttpStatusCode.Conflict, "üttközés van a videokartyanal");
                return InternalServerError(ex);
            }
        }

        // DELETE api/<controller>/5
        [ResponseType(typeof(ApplikacioModel))]
        public IHttpActionResult Delete(int id, string name)
        {
            var applikaciok = ctx.Applikaciok.Where(x => x.Nev == name).FirstOrDefault();
            if (applikaciok == null) return NotFound();
            int ApplikacioId = applikaciok.Id;          
            var set = ctx.Setupok.Where(x => x.ApplikacioId == ApplikacioId).ToList();
            ctx.Setupok.RemoveRange(set);
            var prof = ctx.Applikacio_Profilok.Where(x => x.AppId == ApplikacioId).ToList();
            ctx.Applikacio_Profilok.RemoveRange(prof);

            ctx.Applikaciok.Remove(applikaciok);
            ctx.SaveChanges();
            return Ok("Törlés sikeres");
        }
    }
}