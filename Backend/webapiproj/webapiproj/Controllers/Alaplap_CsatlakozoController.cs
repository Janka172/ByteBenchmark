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
    public class AlaplapCsatlakozModel
    {
        public string AlaplapNev { get; set; }
        public string CsatlakozoNev { get; set; }
    }
    public class Alaplap_CsatlakozokController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(AlaplapModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<AlaplapCsatlakozModel> result = null;
            result = ctx.Alaplap_Csatlakozok.Include(x => x.Csatlakozo).Include(x => x.Alaplap).Select(x => new AlaplapCsatlakozModel
            {
                AlaplapNev = x.Alaplap.Nev,
                CsatlakozoNev = x.Csatlakozo.Nev
            }).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(AlaplapModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            IEnumerable<AlaplapCsatlakozModel> result = null;
            result = ctx.Alaplap_Csatlakozok.Include(x => x.Csatlakozo).Include(x => x.Alaplap).Where(x => x.Alaplap.Nev == name).Select(x => new AlaplapCsatlakozModel
            {
                AlaplapNev = x.Alaplap.Nev,
                CsatlakozoNev = x.Csatlakozo.Nev
            }).ToList();
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
