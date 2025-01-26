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
    public class CsatlakozoModel
    {
        public string Nev { get; set; }
    }
    public class CsatlakozoController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(CsatlakozoModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<CsatlakozoModel> result = null;

            result = ctx.Csatlakozok.Select(x => new CsatlakozoModel
            {
                Nev = x.Nev
            }).ToList();

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(CsatlakozoModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            CsatlakozoModel result = null;
            using (var ctx = new ProjektContext())
            {
                result = ctx.Csatlakozok.Where(x => x.Nev == name).Select(x => new CsatlakozoModel
                {
                    Nev = x.Nev
                }).FirstOrDefault();
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // POST api/<controller>
        [ResponseType(typeof(CsatlakozoModel))]
        public HttpResponseMessage Post([FromBody] CsatlakozoModel value)
        {
            try
            {
                var result = ctx.Csatlakozok.Add(new Csatlakozo
                {
                    Nev = value.Nev
                });
                ctx.SaveChanges();


                return Request.CreateResponse(HttpStatusCode.Created, result);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { error = " Processzor feltoltése sikertelen." });
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
