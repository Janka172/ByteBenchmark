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
    public class AlaplapUploadModel
    {
        public string Nev { get; set; }
        public string CpuFoglalat { get; set; }
        public string AlaplapFormatum { get; set; }
        public double MaxFrekvencia { get; set; }
        public string MemoriaTipusa { get; set; }
        public string Lapkakeszlet { get; set; }
        public int SlotSzam { get; set; }
        public bool Hangkartya { get; set; }
        public string CsatlakozoNev { get;set; }
    }

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
        [ResponseType(typeof(AlaplapUploadModel))]
        public HttpResponseMessage Post([FromBody] AlaplapUploadModel value)
        {
            try
            {
                var result = ctx.Alaplapok.Add(new Alaplap
                {
                    Nev = value.Nev,
                    CpuFoglalat = value.CpuFoglalat,
                    AlaplapFormatum = value.AlaplapFormatum,
                    MaxFrekvencia = value.MaxFrekvencia,
                    MemoriaTipusa = value.MemoriaTipusa,
                    Lapkakeszlet = value.Lapkakeszlet,
                    SlotSzam = value.SlotSzam,
                    Hangkartya = value.Hangkartya
                });
                ctx.SaveChanges();

                try
                {
                    var storageport = ctx.Csatlakozok.Where(x => x.Nev == value.CsatlakozoNev).FirstOrDefault();
                    var storagemboard = ctx.Alaplapok.Where(x => x.Nev == value.Nev).FirstOrDefault();
                    var resultconnect = ctx.Alaplap_Csatlakozok.Add(new Alaplap_Csatlakozo
                    {
                        AlaplapId = storagemboard.Id,
                        CsatlakozoId = storageport.Id
                    });
                    ctx.SaveChanges();
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { error = "Alaplap és csatlakozo közti kapcsolat létrehozása sikertelen!" });
                }

                return Request.CreateResponse(HttpStatusCode.Created, result);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { error = "Alaplap létrehozása és az alaplap és csatlakozo közti kapcsolat  sikertelen!" });
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