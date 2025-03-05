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
        public string VideokartyaCsatlakozo { get; set; }
        public List<string> Csatlakozok { get; set; }
        public string Kepnev { get; set; }
        
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
        public string VideokartyaCsatlakozo { get; set; }
        public string Kepnev { get; set; }
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
        public string VideokartyaCsatlakozo { get; set; }
        public string KepNev { get; set; }
    }
    public class AlaplapController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(AlaplapModel))]
        public IHttpActionResult Get()
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
                Hangkartya = x.Hangkartya,
                VideokartyaCsatlakozo=x.VideokartyaCsatlakozo,
                KepNev=x.KepNev
            }).ToList();

            return Ok(result);
        }
        // GET api/<controller>/5
        [ResponseType(typeof(AlaplapModel))]
        public IHttpActionResult Get(int id, string name)
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
                Hangkartya = x.Hangkartya,
                VideokartyaCsatlakozo = x.VideokartyaCsatlakozo,
                KepNev=x.KepNev
            }).FirstOrDefault();
            if (result == null) return NotFound();
            return Ok(result);
        }
        // POST api/<controller>
        [ResponseType(typeof(AlaplapUploadModel))]
        public IHttpActionResult Post([FromBody] AlaplapUploadModel value)
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
                    Hangkartya = value.Hangkartya,
                    VideokartyaCsatlakozo = value.VideokartyaCsatlakozo,
                    KepNev=value.Kepnev
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

                    return Content(HttpStatusCode.BadRequest, new { error = "Alaplap és csatlakozo közti kapcsolat létrehozása sikertelen!" });
                }

                return Content(HttpStatusCode.Created, result);
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Content(HttpStatusCode.Conflict, "Már szerepel ezzel a névvel alaplap");
                return InternalServerError(ex);
            }
        }

        // PUT api/<controller>/5
        [ResponseType(typeof(AlaplapUploadModel))]
        public IHttpActionResult Patch(int id, string name,[FromBody] AlaplapUpdatedModel value)
        {
            List<int> storageport = new List<int>();
            try
            {
                var result = ctx.Alaplapok.Where(x => x.Nev == name).FirstOrDefault();
                if (result == null) return NotFound();
                if(value.Nev!=null) result.Nev = value.Nev;
                if (value.CpuFoglalat!=null) result.CpuFoglalat = value.CpuFoglalat;
                if (value.AlaplapFormatum!=null) result.AlaplapFormatum = value.AlaplapFormatum;
                if (value.MaxFrekvencia!=0) result.MaxFrekvencia = value.MaxFrekvencia;
                if (value.MemoriaTipusa!=null) result.MemoriaTipusa = value.MemoriaTipusa;
                if (value.Lapkakeszlet!=null) result.Lapkakeszlet = value.Lapkakeszlet;
                if (value.SlotSzam!=0) result.SlotSzam = value.SlotSzam;
                if (value.Hangkartya!=null) result.Hangkartya = value.Hangkartya;
                if (value.VideokartyaCsatlakozo != null) result.VideokartyaCsatlakozo = value.VideokartyaCsatlakozo;
                if (value.Kepnev != null) result.KepNev = value.Kepnev;
                         
                ctx.SaveChanges();

                return Ok("Update sikeres");

            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Content(HttpStatusCode.Conflict, "Már szerepel ezzel a névvel alaplap");
                return InternalServerError(ex);
            }
           

        }

        // DELETE api/<controller>/5
        [ResponseType(typeof(AlaplapModel))]
        public IHttpActionResult Delete(int id, string name)
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
                return Ok("Törlés sikeresen véghezment");
            }
            ctx.SaveChanges();
            return NotFound();
        }
    }
}