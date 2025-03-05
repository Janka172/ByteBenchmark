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
        public IHttpActionResult Get()
        {
            IEnumerable<AlaplapCsatlakozModel> result = null;
            result = ctx.Alaplap_Csatlakozok.Include(x => x.Csatlakozo).Include(x => x.Alaplap).Select(x => new AlaplapCsatlakozModel
            {
                AlaplapNev = x.Alaplap.Nev,
                CsatlakozoNev = x.Csatlakozo.Nev
            }).ToList();
            return Ok(result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(AlaplapModel))]
        public IHttpActionResult Get(int id, string name)
        {
            IEnumerable<AlaplapCsatlakozModel> result = null;
            result = ctx.Alaplap_Csatlakozok.Include(x => x.Csatlakozo).Include(x => x.Alaplap).Where(x => x.Alaplap.Nev == name).Select(x => new AlaplapCsatlakozModel
            {
                AlaplapNev = x.Alaplap.Nev,
                CsatlakozoNev = x.Csatlakozo.Nev
            }).ToList();
            if (result == null) return NotFound();
            return Ok(result);
        }

        // POST api/<controller>
        [ResponseType(typeof(AlaplapModel))]
        public IHttpActionResult Post([FromBody] AlaplapCsatlakozPOSTModel value)
        {
            var AlaplapId = ctx.Alaplapok.Where(x => x.Nev == value.AlaplapNev).Select(x => x.Id).FirstOrDefault();
            if (AlaplapId == -1) return NotFound();
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
                return Ok("Sikeres feltoltes");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT api/<controller>/5
        [ResponseType(typeof(AlaplapModel))]
        public IHttpActionResult Put(int id,string name, [FromBody] string value)
        {
            return StatusCode(HttpStatusCode.NotImplemented);
        }

        // DELETE api/<controller>/5
        [ResponseType(typeof(AlaplapModel))]
        public IHttpActionResult Delete(int id, string AlaplapNeve, string CsatlakozoNev)
        {
            try
            {

                var AlaplapId = ctx.Alaplapok.Where(x => x.Nev == AlaplapNeve).Select(x => x.Id).FirstOrDefault();

                if (AlaplapId == 0) return Content(HttpStatusCode.NotFound, "Nem található ilyen alaplap");

                var csatlakId = ctx.Csatlakozok.Where(x => x.Nev==CsatlakozoNev).Select(x=>x.Id).FirstOrDefault();

                if(csatlakId==0) return Content(HttpStatusCode.NotFound, "Nem található  csatlakozo");

                var kapcsaolat = ctx.Alaplap_Csatlakozok.Where(x => x.AlaplapId == AlaplapId && x.CsatlakozoId==csatlakId).ToList();

                if (kapcsaolat.Count == 0) return Content(HttpStatusCode.NotFound, "Megadott csatlakozók egyike sem kapcsolódik az alaplaphoz.");

                ctx.Alaplap_Csatlakozok.RemoveRange(kapcsaolat); //több rekordot tud törölmi
                ctx.SaveChanges();

                return Ok("A törlés sikeresen megtörtént");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
    }
}
