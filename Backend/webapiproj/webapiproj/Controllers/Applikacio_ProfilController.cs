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
    public class ApplikacioProfilModel
    {
        public string UserName { get; set; }
        public string ApplikacioNeve { get; set; }
    }
    public class Applikacio_ProfilController : ApiController
    {
        IProjektContext ctx = new ProjektContext();

        public Applikacio_ProfilController() { }

        public Applikacio_ProfilController(IProjektContext context)
        {
            ctx = context;
        }
        // GET api/<controller>
        [ResponseType(typeof(AlaplapModel))]
        public IHttpActionResult Get()
        {
            IEnumerable<ApplikacioProfilModel> result = null;
            result = ctx.Applikacio_Profilok.Include(x => x.Applikacio).Include(x => x.Profil).Select(x => new ApplikacioProfilModel
            {
                UserName = x.Profil.Felhasznalonev,
                ApplikacioNeve = x.Applikacio.Nev
            }).ToList();
            return Ok(result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(AlaplapModel))]
        public IHttpActionResult Get(int id, string name)
        {
            ApplikacioProfilModel result = null;
            result = ctx.Applikacio_Profilok.Include(x => x.Applikacio).Include(x => x.Profil).Where(x => x.Applikacio.Nev == name).Select(x => new ApplikacioProfilModel
            {
                UserName = x.Profil.Felhasznalonev,
                ApplikacioNeve = x.Applikacio.Nev
            }).FirstOrDefault();
            if (result == null) return NotFound();
            return Ok(result);
        }

        // POST api/<controller>
        [ResponseType(typeof(ApplikacioProfilModel))]
        public IHttpActionResult Post([FromBody] ApplikacioProfilModel value)
        {
            return StatusCode(HttpStatusCode.NotImplemented);
        }

        // PUT api/<controller>/5
        [ResponseType(typeof(ApplikacioProfilModel))]
        public IHttpActionResult Put(int id, [FromBody] string value)
        {
           return  StatusCode(HttpStatusCode.NotImplemented);
        }

        // DELETE api/<controller>/5
        [ResponseType(typeof(ApplikacioProfilModel))]
        public IHttpActionResult Delete(int id)
        {
            return StatusCode(HttpStatusCode.NotImplemented);
        }
    }
}
