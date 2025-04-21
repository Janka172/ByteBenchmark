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
    public class CsatlakozoModel
    {
        public string Nev { get; set; }
    }
    public class CsatlakozoController : ApiController
    {
        IProjektContext ctx = new ProjektContext();

        public CsatlakozoController() { }

        public CsatlakozoController(IProjektContext context)
        {
            ctx = context;
        }
        // GET api/<controller>
        [ResponseType(typeof(CsatlakozoModel))]
        public IHttpActionResult Get()
        {
            IEnumerable<CsatlakozoModel> result = null;

            result = ctx.Csatlakozok.Select(x => new CsatlakozoModel
            {
                Nev = x.Nev
            }).ToList();

            return Ok(result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(CsatlakozoModel))]
        public IHttpActionResult Get(int id, string name)
        {
            CsatlakozoModel result = null;

            result = ctx.Csatlakozok.Where(x => x.Nev == name).Select(x => new CsatlakozoModel
            {
                Nev = x.Nev
            }).FirstOrDefault();
            if (result == null) return NotFound();
            return Ok(result);
        }

        // POST api/<controller>
        [ResponseType(typeof(CsatlakozoModel))]
        public IHttpActionResult Post([FromBody] CsatlakozoModel value)
        {
            try
            {
                var result = ctx.Csatlakozok.Add(new Csatlakozo
                {
                    Nev = value.Nev
                });
                ctx.SaveChanges();


                return Content(HttpStatusCode.Created, result);
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.")
                    return Content(HttpStatusCode.Conflict, "Ez a csatlakozo már létezik.");
                return InternalServerError(ex);
            }
        }

        // PUT api/<controller>/5
        public IHttpActionResult Put(int id, [FromBody] string value)
        {
            return StatusCode(HttpStatusCode.NotImplemented);
        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id)
        {
            return StatusCode(HttpStatusCode.NotImplemented);
        }
    }
}
