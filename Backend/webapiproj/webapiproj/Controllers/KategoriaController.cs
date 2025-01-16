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