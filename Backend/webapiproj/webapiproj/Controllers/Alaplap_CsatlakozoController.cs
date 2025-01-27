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
    public class AlaplapCsatlakozPOSTModel
    {
        public string AlaplapNev { get; set; }
        public List<string> Csatlakozok { get; set; }
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
        [ResponseType(typeof(AlaplapModel))]
        public HttpResponseMessage Post([FromBody] AlaplapCsatlakozPOSTModel value)
        {
            var AlaplapId = ctx.Alaplapok.Where(x => x.Nev == value.AlaplapNev).Select(x => x.Id).FirstOrDefault();
            if (AlaplapId == -1) return Request.CreateResponse(HttpStatusCode.NotFound, "Nem található ilyen alaplap");
            List<int> A = new List<int>();
            
            try
            {

                foreach (var item in value.Csatlakozok)
                {
                    A.Add(ctx.Csatlakozok.Where(x => x.Nev == item).Select(x => x.Id).FirstOrDefault());
                }
                foreach (var item in A)
                {
                    ctx.Alaplap_Csatlakozok.Add(new Alaplap_Csatlakozo
                    {
                        AlaplapId = AlaplapId,
                        CsatlakozoId = item
                    });
                }

                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Sikeres feltoltes");
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // PUT api/<controller>/5
        [ResponseType(typeof(AlaplapModel))]
        public void Put(int id,string name, [FromBody] string value)
        {
            
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}
