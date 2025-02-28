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
        public int Id { get; set; }
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

    public class ProfilUpdateModel //jelszo nelkul
    {
        public string Felhasznalonev { get; set; }
        public string Email { get; set; }
        public int Jogosultsag { get; set; }
        public string Tema { get; set; }
        public string LogoEleresiUtja { get; set; }
    }

    public class ProfilJelszoUpdateModel
    {
        public string UjJelszo { get; set; }
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
        public IHttpActionResult Get()
        {
            IEnumerable<ProfilResponseModel> result = null;

            result = ctx.Profilok.Select(x => new ProfilResponseModel
            {
                Id=x.Id,
                Felhasznalonev = x.Felhasznalonev,
                Email = x.Email,
                Jogosultsag = x.Jogosultsag,
                Tema = x.Tema,
                LogoEleresiUtja = x.LogoEleresiUtja
            }).ToList();
            return Ok(result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(ProfilResponseModel))]
        public IHttpActionResult Get(int id, string name)
        {
            ProfilResponseModel result = null;

            result = ctx.Profilok.Where(x => x.Felhasznalonev == name).Select(x => new ProfilResponseModel
            {
                Id=x.Id,
                Felhasznalonev = x.Felhasznalonev,
                Email = x.Email,
                Jogosultsag = x.Jogosultsag,
                Tema = x.Tema,
                LogoEleresiUtja = x.LogoEleresiUtja
            }).FirstOrDefault();
            return Ok(result);
        }

        // POST api/<controller>
        [ResponseType(typeof(ProfilResponseModel))]
        public IHttpActionResult Post([FromBody] ProfilPostModel value)
        {
            try
            {
                var email = ctx.Profilok.Where(x => x.Email == value.Email).FirstOrDefault();
                var felhasz = ctx.Profilok.Where(x => x.Felhasznalonev == value.Felhasznalonev).FirstOrDefault();
                if (email != null) return Content(HttpStatusCode.Conflict, "Ezzel az email-lal már regisztráltak");
                if (felhasz != null) return Content(HttpStatusCode.Conflict, "Ezzel az email-lal már regisztráltak");

                ctx.Profilok.Add(new Profil(value.Felhasznalonev, value.Email, value.Jelszo, value.Jogosultsag, value.Tema, value.LogoEleresiUtja));
                ctx.SaveChanges();
                return Ok("Regisztráció Sikeres!");
            }
            catch (Exception ex)
            {
                throw;
                return InternalServerError(ex);
            }
        }

        // PUT api/<controller>/5
        [ResponseType(typeof(ProfilResponseModel))]
        public IHttpActionResult Patch(int id,string name,[FromBody] ProfilUpdateModel value)
        {
            try
            {
                var result = ctx.Profilok.Where(x => x.Felhasznalonev == name).FirstOrDefault();
                if (result == null) return NotFound();
                //if (!PasswdManager.VerifyEmail(value.Email, result.Email)) return Unauthorized();

                if(value.Felhasznalonev!=null) result.Felhasznalonev = value.Felhasznalonev;
                if(value.Email!=null) result.Email = value.Email;
                //if (value.UjJelszo != null)
                //{
                //    PasswdManager.CreatePasswordHash(value.UjJelszo, out byte[] hash, out byte[] salt);
                //    result.Jelszo = salt;
                //    result.JelszoUjra = hash;
                //}
                if(value.Jogosultsag!=null) result.Jogosultsag = value.Jogosultsag;
                if(value.Tema!=null) result.Tema = value.Tema;
                if(value.LogoEleresiUtja!=null) result.LogoEleresiUtja = value.LogoEleresiUtja;
                ctx.SaveChanges();
                return Ok("Sikeres Update");
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Content(HttpStatusCode.Conflict, "Ezzel a felhasználoval vagy emaillal már regisztráltak");
                return InternalServerError(ex);
            }
        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id,string name)
        {
            var felhasznalo = ctx.Profilok.Where(x=>x.Felhasznalonev==name).FirstOrDefault();

            if (felhasznalo != null)
            {
                ctx.Profilok.Remove(felhasznalo);
                ctx.SaveChanges();
                return Ok("Törlés sikeres volt");
            }
            return NotFound();
        }

        [HttpPost]
        [Route("api/Profil/Authenticate")]
        [ResponseType(typeof(ProfilResponseModel))]
        public IHttpActionResult Post([FromBody] Authenticate value)
        {
            var res = ctx.Profilok.Where(x => x.Email == value.Email).FirstOrDefault();
            if (res!=null)
            {
                var validate = PasswdManager.VerifyPasswordHash(value.Jelszo, res.JelszoUjra, res.Jelszo);
                if (validate) return Ok(res);
                else return Unauthorized();
            }
            return NotFound();
        }

        
        [HttpPatch]
        [Route("api/Profil/ProfilJelszoUpdateModel")]
        [ResponseType(typeof(ProfilResponseModel))]
        public IHttpActionResult PatchJelszo(int id, string email, [FromBody] ProfilJelszoUpdateModel value)
        {
            try
            {
                var result = ctx.Profilok.Where(x => x.Email == email).FirstOrDefault();
                if (result == null) return Content(HttpStatusCode.NotFound,"Nem található felhasználó ezzel az emaillal"); ;
                if (!PasswdManager.VerifyEmail(email, result.Email)) return Unauthorized();

                if (value.UjJelszo != null)
                {
                    PasswdManager.CreatePasswordHash(value.UjJelszo, out byte[] hash, out byte[] salt);
                    result.Jelszo = salt;
                    result.JelszoUjra = hash;
                }
                ctx.SaveChanges();

                return Ok("Sikeres jelszo modositas");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}