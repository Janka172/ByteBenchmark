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
    public class AlaplapModel
    {
        public string Nev { get; set; }
        public string CpuFoglalat { get; set; }
        public string AlaplapFormatum { get; set; }
        public double MaxFrekvencia { get; set; }
        public string MemoriaTipusa { get; set; }
        public string Lapkakeszlet { get; set; }
        public int SlotSzam { get; set; }
        public bool Hangkartya { get; set; }
    }
    public class AlaplapController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(AlaplapModel))]
        public HttpResponseMessage Get()
        {
            IEnumerable<AlaplapModel> result = null;

            result = ctx.Alaplapok.Select(x => new AlaplapModel
            {
                Nev = x.Nev,
                CpuFoglalat = x.CpuFoglalat,
                AlaplapFormatum = x.AlaplapFormatum,
                MaxFrekvencia = x.MaxFrekvencia,
                MemoriaTipusa = x.MemoriaTipusa,
                Lapkakeszlet = x.Lapkakeszlet,
                SlotSzam = x.SlotSzam,
                Hangkartya = x.Hangkartya
            }).ToList();

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(AlaplapModel))]
        public HttpResponseMessage Get(int id, string name)
        {
            AlaplapModel result = null;
            result = ctx.Alaplapok.Where(x => x.Nev == name).Select(x => new AlaplapModel
            {
                Nev = x.Nev,
                CpuFoglalat = x.CpuFoglalat,
                AlaplapFormatum = x.AlaplapFormatum,
                MaxFrekvencia = x.MaxFrekvencia,
                MemoriaTipusa = x.MemoriaTipusa,
                Lapkakeszlet = x.Lapkakeszlet,
                SlotSzam = x.SlotSzam,
                Hangkartya = x.Hangkartya
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