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
    public class AlaplapCsatlakozPutModel
    {
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
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<controller>/5
        [ResponseType(typeof(AlaplapModel))]
        public HttpResponseMessage Put(int id,string name, [FromBody] AlaplapCsatlakozPutModel value)
        {
            try
            {
                var AlaplapId = -1;
                AlaplapId = ctx.Alaplapok.Where(x => x.Nev == name).Select(x => x.Id).FirstOrDefault();
                if (AlaplapId == -1) return Request.CreateResponse(HttpStatusCode.NotFound, "Nem található ilyen alaplap");

                var aktcsatlakozo = ctx.Alaplap_Csatlakozok.Where(x => x.AlaplapId == AlaplapId).ToList(); //aktuális csatlakozok (update elott)
                var osszcsatlakozo = ctx.Csatlakozok.Where(x=>value.Csatlakozok.Contains(x.Nev)).ToList(); //azokat listázza ki, amelyikeket a mi általunk beirt listábol szerepelnek
                if (value.Csatlakozok.Count() != osszcsatlakozo.Count()) return Request.CreateResponse(HttpStatusCode.NotFound, "Vannak olyan ön által beirt csatlakozok, amik nem szerepelnek a csatlakozo listában"); //ha kevesebb a visszakapott érték hossza mint a lista hossza akkor van olyan ami nem szerepel a csatlakozo listában

                try
                {
                    foreach (var item in aktcsatlakozo)  //regi kapcsolat torles ha mér nem szerepel a felhasználó által megadott listában
                    {
                        if (!osszcsatlakozo.Any(x => x.Id == item.CsatlakozoId)) //Any azt vizsgéja, hogy bármelyik elem megfelel-e az adott feltételnek.
                        {
                            ctx.Alaplap_Csatlakozok.Remove(item);
                        }
                    }
                }
                catch (Exception ex)
                {

                    return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                }

                try
                {
                    foreach (var item in osszcsatlakozo)   //uj kapcsolat létrehozása.
                    {
                        if (!aktcsatlakozo.Any(x => x.CsatlakozoId == item.Id)) //Any azt vizsgéja, hogy bármelyik elem megfelel-e az adott feltételnek.
                        {
                            ctx.Alaplap_Csatlakozok.Add(new Alaplap_Csatlakozo
                            {
                                AlaplapId = AlaplapId,
                                CsatlakozoId = item.Id
                            });
                        }
                    }
                }
                catch (Exception ex)
                {

                    return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                }

                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "sikeres update");
            }
            catch ( Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}
