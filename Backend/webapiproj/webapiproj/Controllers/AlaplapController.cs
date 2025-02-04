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
        public List<string> Csatlakozok { get; set; }
    }
    public class AlaplapUpdatedModel
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
            List<int> storageport = new List<int>();
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

                    foreach (var item in value.Csatlakozok)
                    {
                        storageport.Add(ctx.Csatlakozok.Where(x => x.Nev == item).Select(x => x.Id).FirstOrDefault());
                    }

                    var storagemboard = ctx.Alaplapok.Where(x => x.Nev == value.Nev).FirstOrDefault();
                    foreach (var item in storageport)
                    {
                        var resultconnect = ctx.Alaplap_Csatlakozok.Add(new Alaplap_Csatlakozo
                        {
                            AlaplapId = storagemboard.Id,
                            CsatlakozoId = item,
                        });
                        ctx.SaveChanges();
                    }

                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { error = "Alaplap és csatlakozo közti kapcsolat létrehozása sikertelen!" });
                }

                return Request.CreateResponse(HttpStatusCode.Created, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // PUT api/<controller>/5
        [ResponseType(typeof(AlaplapUploadModel))]
        public HttpResponseMessage Patch(int id, string name,[FromBody] AlaplapUpdatedModel value)
        {
            List<int> storageport = new List<int>();
            try
            {
                var result = ctx.Alaplapok.Where(x => x.Nev == name).FirstOrDefault();
                if (result == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Nem található ilyen Alaplap");
                if(value.Nev!=null) result.Nev = value.Nev;
                if (value.CpuFoglalat!=null) result.CpuFoglalat = value.CpuFoglalat;
                if (value.AlaplapFormatum!=null) result.AlaplapFormatum = value.AlaplapFormatum;
                if (value.MaxFrekvencia!=null) result.MaxFrekvencia = value.MaxFrekvencia;
                if (value.MemoriaTipusa!=null) result.MemoriaTipusa = value.MemoriaTipusa;
                if (value.Lapkakeszlet!=null) result.Lapkakeszlet = value.Lapkakeszlet;
                if (value.SlotSzam!=null) result.SlotSzam = value.SlotSzam;
                if (value.Hangkartya!=null) result.Hangkartya = value.Hangkartya;
                         
                ctx.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, "Update sikeres");

            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
           

        }

        // DELETE api/<controller>/5
        [ResponseType(typeof(AlaplapModel))]
        public HttpResponseMessage Delete(int id, string name)
        {
            var AlaplapId = ctx.Alaplapok.Where(x => x.Nev == name).Select(x => x.Id).FirstOrDefault();
            var acsatlakozo = ctx.Alaplap_Csatlakozok.Where(x => x.AlaplapId == AlaplapId);
            var set = ctx.Setupok.Where(x => x.AlaplId == AlaplapId).ToList();
            foreach (var item in set)
            {
                item.VidkaId = null;
            }
            foreach (var item in acsatlakozo)
            {
                ctx.Alaplap_Csatlakozok.Remove(item);
            }
            var result = ctx.Alaplapok.Where(x => x.Nev == name).FirstOrDefault();
            if (result != null)
            {
                ctx.Alaplapok.Remove(result);
                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Törlés sikeresen véghezment");
            }
            ctx.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.NotFound, "Nem található");
        }
    }
}