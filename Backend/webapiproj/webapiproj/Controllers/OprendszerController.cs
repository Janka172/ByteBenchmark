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
    public class OprendszerModel
    {
        public string Nev { get; set; }
        public string BuildSzam { get; set; }
        public string Verzio { get; set; }
    }
    public class OprendszerController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(OprendszerModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<OprendszerModel> result = null;

            result = ctx.Oprendszerek.Select(x => new OprendszerModel
            {
                Nev = x.Nev,
                BuildSzam = x.BuildSzam,
                Verzio = x.Verzio
            }).ToList();

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(OprendszerModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            OprendszerModel result = null;

            result = ctx.Oprendszerek.Where(x => x.Nev == name).Select(x => new OprendszerModel
            {
                Nev = x.Nev,
                BuildSzam = x.BuildSzam,
                Verzio = x.Verzio
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