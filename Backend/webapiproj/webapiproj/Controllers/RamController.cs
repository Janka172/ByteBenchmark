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
    public class RamModel
    {
        public string Nev { get; set; }
        public string MemoriaTipus { get; set; }
        public int Frekvencia { get; set; }
        public int Meret { get; set; }
        public string Kepnev;
    }
    public class RamController : ApiController
    {
        IProjektContext ctx = new ProjektContext();

        public RamController() { }

        public RamController(IProjektContext context)
        {
            ctx = context;
        }
        // GET api/<controller>
        [ResponseType(typeof(RamModel))]
        public IHttpActionResult Get()
        {
            IEnumerable<RamModel> result = null;
            result = ctx.Ramok.Select(x => new RamModel
            {
                Nev = x.Nev,
                MemoriaTipus = x.MemoriaTipus,
                Frekvencia = x.Frekvencia,
                Meret = x.Meret,
                Kepnev=x.KepNev
            }).ToList();
            return Ok(result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(RamModel))]
        public IHttpActionResult Get(int id, string name, int frekvencia, int meret)
        {
            RamModel result = null;
            result = ctx.Ramok.Where(x => x.Nev == name && x.Frekvencia==frekvencia&& x.Meret==meret).Select(x => new RamModel
            {
                Nev = x.Nev,
                MemoriaTipus = x.MemoriaTipus,
                Frekvencia = x.Frekvencia,
                Meret = x.Meret,
                Kepnev = x.KepNev
            }).FirstOrDefault();
            if (result == null) return NotFound();
            return Ok(result);
        }

        // POST api/<controller>
        [ResponseType(typeof(RamModel))]
        public IHttpActionResult Post([FromBody] RamModel value)
        {
            try
            {
                var result = ctx.Ramok.Add(new Ram
                {
                    Nev = value.Nev,
                    MemoriaTipus=value.MemoriaTipus,
                    Frekvencia=value.Frekvencia,
                    Meret=value.Meret,
                    KepNev=value.Kepnev
                });
                ctx.SaveChanges();

                return Created($"api/Ram/{result}", result);
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Content(HttpStatusCode.Conflict, "már szerepel ez a ram");
                return InternalServerError(ex);
            }

        }

        // PUT api/<controller>/5
        [ResponseType(typeof(RamModel))]
        public IHttpActionResult Patch(int id, string name,int frekvencia,int meret,[FromBody] RamModel value)
        {
            try
            {
                var result = ctx.Ramok.Where(x => x.Nev == name && x.Frekvencia == frekvencia && x.Meret == meret).FirstOrDefault();
                if (result == null) return NotFound();
                if(value.Nev!=null) result.Nev = value.Nev;
                if (value.MemoriaTipus!=null) result.MemoriaTipus = value.MemoriaTipus;
                if (value.Frekvencia!=0) result.Frekvencia = value.Frekvencia;
                if (value.Meret!=0) result.Meret = value.Meret;
                if (value.Kepnev != null) result.KepNev = value.Kepnev;

                ctx.SaveChanges();
                return Content(HttpStatusCode.OK, "sikeres update");
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Content(HttpStatusCode.Conflict,"Már létezik ez a ram");
                return InternalServerError(ex);
            }
        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id,string name, int frekvencia, int meret)
        {
            var ramId = ctx.Ramok.Where(x=>x.Nev==name && x.Frekvencia==frekvencia && x.Meret==meret).Select(x => x.Id).FirstOrDefault();
            var set = ctx.Setupok.Where(x => x.RamId == ramId).ToList();

            foreach (var item in set)
            {
                item.RamId = null;
            }


            var result = ctx.Ramok.Where(x => x.Nev == name && x.Frekvencia == frekvencia && x.Meret == meret).FirstOrDefault();
            if (result != null)
            {
                ctx.Ramok.Remove(result);
                ctx.SaveChanges();
                return Ok("Törlés sikeres");
            }
            ctx.SaveChanges();
            return NotFound();
        }
    }
}