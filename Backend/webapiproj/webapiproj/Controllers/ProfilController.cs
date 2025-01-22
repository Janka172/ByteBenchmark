using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using webapiproj.Models;
using System.Web.Http.Description;
using webapiproj.UserManager;

namespace webapiproj.Controllers
{
    public class ProfilResponseModel
    {
        public string Felhasznalonev { get; set; }
        public string Email { get; set; }
        public int Jogosultsag { get; set; }
        public string Tema { get; set; }
        public string LogoEleresiUtja { get; set; }
    }
    public class ProfilPostModel
    {
        public string Felhasznalonev { get; set; }
        public string Email { get; set; }
        public string Jelszo { get; set; }
        public int Jogosultsag { get; set; }
        public string Tema { get; set; }
        public string LogoEleresiUtja { get; set; }
    }

    public class Authenticate
    {
        public string Email { get; set; }
        public string Jelszo { get; set; }
    }
    public class ProfilController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(ProfilResponseModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<ProfilResponseModel> result = null;

            result = ctx.Profilok.Select(x => new ProfilResponseModel
            {
                Felhasznalonev = x.Felhasznalonev,
                Email = x.Email,
                Jogosultsag = x.Jogosultsag,
                Tema = x.Tema,
                LogoEleresiUtja = x.LogoEleresiUtja
            }).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(ProfilResponseModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            ProfilResponseModel result = null;

            result = ctx.Profilok.Where(x => x.Felhasznalonev == name).Select(x => new ProfilResponseModel
            {
                Felhasznalonev = x.Felhasznalonev,
                Email = x.Email,
                Jogosultsag = x.Jogosultsag,
                Tema = x.Tema,
                LogoEleresiUtja = x.LogoEleresiUtja
            }).FirstOrDefault();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // POST api/<controller>
        [ResponseType(typeof(ProfilResponseModel))]
        public HttpResponseMessage Post([FromBody] ProfilPostModel value)
        {
            try
            {
                var email = ctx.Profilok.Where(x => x.Email == value.Email).FirstOrDefault();
                var felhasz = ctx.Profilok.Where(x => x.Felhasznalonev == value.Felhasznalonev).FirstOrDefault();
                if (email != null) return Request.CreateResponse(HttpStatusCode.Conflict, "Ezzel az email-lal már regisztráltak");
                if (felhasz != null) return Request.CreateResponse(HttpStatusCode.Conflict, "Ezzel az email-lal már regisztráltak");

                ctx.Profilok.Add(new Profil(value.Felhasznalonev, value.Email, value.Jelszo, value.Jogosultsag, value.Tema, value.LogoEleresiUtja));
                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Regisztráció sikeres");
            }
            catch (Exception ex)
            {
                throw;
                //return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // PUT api/<controller>/5
        [ResponseType(typeof(ProfilResponseModel))]
        public HttpResponseMessage Put(int id,string name, [FromBody] ProfilPostModel value)
        {
            try
            {
                var email = ctx.Profilok.Where(x => x.Email == value.Email).FirstOrDefault();
                var felhasz = ctx.Profilok.Where(x => x.Felhasznalonev == name).FirstOrDefault();
                if (email != null) return Request.CreateResponse(HttpStatusCode.Conflict, "Ezzel az email-lal már regisztráltak");
                if (felhasz != null) return Request.CreateResponse(HttpStatusCode.Conflict, "Ezzel az email-lal már regisztráltak");

                var result = ctx.Profilok.Where(x => x.Felhasznalonev == value.Felhasznalonev).FirstOrDefault();
                if (result != null) return Request.CreateResponse(HttpStatusCode.NotFound, "Nem talalhato ilyen felhasználó");

                result.Felhasznalonev = value.Felhasznalonev;
                result.Email = value.Email;
                PasswdManager.CreatePasswordHash(value.Jelszo, out byte[] hash, out byte[] salt);
                result.Jelszo = salt;
                result.JelszoUjra = hash;
                result.Tema = value.Tema;
                result.LogoEleresiUtja = value.LogoEleresiUtja;
                ctx.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // DELETE api/<controller>/5
        public HttpResponseMessage Delete(int id,string name)
        {
            var felhasznalo = ctx.Profilok.Where(x=>x.Felhasznalonev==name).FirstOrDefault();

            if (felhasznalo != null)
            {
                ctx.Profilok.Remove(felhasznalo);
                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK,"Törlés sikeres volt");
            }
            return Request.CreateResponse(HttpStatusCode.NotFound, "Törlés sikertelen volt");
        }

        [HttpPost]
        [Route("api/Profil/Authenticate")]
        [ResponseType(typeof(ProfilResponseModel))]
        public HttpResponseMessage Post([FromBody] Authenticate value)
        {
            var res = ctx.Profilok.Where(x => x.Email == value.Email).FirstOrDefault();
            if (res!=null)
            {
                var validate = PasswdManager.VerifyPasswordHash(value.Jelszo, res.Jelszo, res.JelszoUjra);
                if(validate) return Request.CreateResponse(HttpStatusCode.OK);
                else  return Request.CreateResponse(HttpStatusCode.Unauthorized, "Nem megfelelo a jelszo vagy az email");
            }
            return Request.CreateResponse(HttpStatusCode.NotFound);
        }
    }
}