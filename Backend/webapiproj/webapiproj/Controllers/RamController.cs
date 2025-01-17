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
    public class RamModel
    {
        public string Nev { get; set; }
        public string MemoriaTipus { get; set; }
        public double Frekvencia { get; set; }
        public int Meret { get; set; }
    }
    public class RamController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(RamModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<RamModel> result = null;
            result = ctx.Ramok.Select(x => new RamModel
            {
                Nev = x.Nev,
                MemoriaTipus = x.MemoriaTipus,
                Frekvencia = x.Frekvencia,
                Meret = x.Meret
            }).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(RamModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            RamModel result = null;
            result = ctx.Ramok.Where(x => x.Nev == name).Select(x => new RamModel
            {
                Nev = x.Nev,
                MemoriaTipus = x.MemoriaTipus,
                Frekvencia = x.Frekvencia,
                Meret = x.Meret
            }).FirstOrDefault();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // POST api/<controller>
        public HttpResponseMessage Post([FromBody] RamModel value)
        {
            try
            {
                var result = ctx.Ramok.Add(new Ram
                {
                    Nev = value.Nev,
                    MemoriaTipus=value.MemoriaTipus,
                    Frekvencia=value.Frekvencia,
                    Meret=value.Meret
                });
                ctx.SaveChanges();


                return Request.CreateResponse(HttpStatusCode.Created, result);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { error = "RAM feltoltése sikertelen." });
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