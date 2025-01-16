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