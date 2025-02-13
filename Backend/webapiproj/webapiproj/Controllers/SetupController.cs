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
    public class SetupModel
    {
        public string ApplikacioNeve { get; set; }
        public string Gepigeny { get; set; }
        public string VidekortyaNev { get; set; }
        public int? VideokartyaVram { get; set; }
        public string ProcesszorNev { get; set; }
        public int? ProcesszorSzalakSzama { get; set; }
        public int ProcesszorMagokSzama { get; set; }
        public double? ProcesszorFrekvencia { get; set; }
        public double? RamFrekvencia { get; set; }
        public int? RamMeret { get; set; }
        public string OprendszerNev { get; set; }
        public int Tarhely { get; set; }
        public string RamNeve { get; set; }
        public string AlaplapNeve { get; set; }
        public string AlaplapCpuFoglalat { get; set; }
        public double? AlaplapMemoriaMaxFrekvencia { get; set; }
        public string AlaplapRamTipusa { get; set; }
    }

    public class SetupPostModel
    {
        public string ApplikacioNeve { get; set; }
        public string Gepigeny { get; set; }
        public string VidekortyaNev { get; set; }
        public int Vram { get; set; }
        public string ProcesszorNev { get; set; }
        public string OprendszerNev { get; set; }
        public string RamNeve { get; set; }
        public double RamFrekvencia { get; set; }
        public string AlaplapNeve { get; set; }
    }
    public class SetupPatchModel
    {
        public string VidekortyaNev { get; set; }
        public int Vram { get; set; }
        public string ProcesszorNev { get; set; }
        public string OprendszerNev { get; set; }
        public string RamNeve { get; set; }
        public double RamFrekvencia { get; set; }
        public string AlaplapNeve { get; set; }
    }
    public class SetupController : ApiController
    {
        ProjektContext ctx = new ProjektContext();
        // GET api/<controller>
        [ResponseType(typeof(SetupModel))]
        public IHttpActionResult Get()
        {
            IEnumerable<SetupModel> result = null;
            result = ctx.Setupok.Include(x => x.Alaplap).Include(x => x.Oprendszer).Include(x => x.Processzor).Include(x => x.Ram).Include(x => x.Videokartya).Include(x => x.Applikacio).Select(x => new SetupModel
            {
                ApplikacioNeve = x.Applikacio.Nev,
                Gepigeny = x.Gp,
                VidekortyaNev = x.Videokartya.Nev,
                VideokartyaVram = x.Videokartya.Vram,
                ProcesszorNev = x.Processzor.Nev,
                ProcesszorSzalakSzama = x.Processzor.SzalakSzama,
                ProcesszorMagokSzama = x.Processzor.ProcesszormagokSzama,
                ProcesszorFrekvencia = x.Processzor.ProcesszorFrekvencia,
                RamNeve=x.Ram.Nev,
                RamMeret = x.Ram.Meret,
                RamFrekvencia = x.Ram.Frekvencia,
                OprendszerNev = x.Oprendszer.Nev,
                Tarhely = x.Applikacio.Tarhely,
                AlaplapNeve=x.Alaplap.Nev,
                AlaplapCpuFoglalat=x.Alaplap.CpuFoglalat,
                AlaplapMemoriaMaxFrekvencia=x.Alaplap.MaxFrekvencia,
                AlaplapRamTipusa=x.Alaplap.MemoriaTipusa

            }).ToList();
            return Ok(result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(SetupModel))]
        public IHttpActionResult Get(int id, string name)
        {
            IEnumerable<SetupModel> result = null;
            result = ctx.Setupok.Include(x => x.Alaplap).Include(x => x.Oprendszer).Include(x => x.Processzor).Include(x => x.Ram).Include(x => x.Videokartya).Include(x => x.Applikacio).Where(x => x.Applikacio.Nev == name).Select(x => new SetupModel
            {
                ApplikacioNeve = x.Applikacio.Nev,
                Gepigeny = x.Gp,
                VidekortyaNev = x.Videokartya.Nev,
                VideokartyaVram = x.Videokartya.Vram,
                ProcesszorNev = x.Processzor.Nev,
                ProcesszorSzalakSzama = x.Processzor.SzalakSzama,
                ProcesszorMagokSzama = x.Processzor.ProcesszormagokSzama,
                ProcesszorFrekvencia = x.Processzor.ProcesszorFrekvencia,
                RamNeve = x.Ram.Nev,
                RamMeret = x.Ram.Meret,
                RamFrekvencia = x.Ram.Frekvencia,
                OprendszerNev = x.Oprendszer.Nev,
                Tarhely = x.Applikacio.Tarhely,
                AlaplapNeve = x.Alaplap.Nev,
                AlaplapCpuFoglalat = x.Alaplap.CpuFoglalat,
                AlaplapMemoriaMaxFrekvencia = x.Alaplap.MaxFrekvencia,
                AlaplapRamTipusa = x.Alaplap.MemoriaTipusa
            }).ToList();
            return Ok(result);
        }

        // POST api/<controller>
        public IHttpActionResult Post([FromBody] SetupPostModel value)
        {
            var ApplikacioId = ctx.Applikaciok.Where(x => x.Nev == value.ApplikacioNeve).Select(x => x.Id).FirstOrDefault();
            if (ApplikacioId == 0) return Content(HttpStatusCode.NotFound, "Nincs ilyen applikacio");
            var VideokartyaId = ctx.Videokartyak.Where(x => x.Nev == value.VidekortyaNev && x.Vram==value.Vram).Select(x => x.Id).FirstOrDefault();
            if (VideokartyaId == 0) return Content(HttpStatusCode.NotFound, "Nincs ilyen Videokartya");
            var ProcesszorId = ctx.Processzorok.Where(x => x.Nev == value.ProcesszorNev).Select(x => x.Id).FirstOrDefault();
            if (ProcesszorId == 0) return Content(HttpStatusCode.NotFound, "Nincs ilyen Processzor");
            var OprendszerId = ctx.Oprendszerek.Where(x => x.Nev == value.OprendszerNev).Select(x => x.Id).FirstOrDefault();
            if (OprendszerId == 0) return Content(HttpStatusCode.NotFound, "Nincs ilyen Operácios rendszer");
            var RamoId = ctx.Ramok.Where(x => x.Nev == value.RamNeve && x.Frekvencia==value.RamFrekvencia).Select(x => x.Id).FirstOrDefault();
            if (RamoId == 0) return Content(HttpStatusCode.NotFound, "Nincs ilyen Ram");
            var AlaplapId = ctx.Alaplapok.Where(x => x.Nev == value.AlaplapNeve).Select(x => x.Id).FirstOrDefault();
            if (AlaplapId == 0) return Content(HttpStatusCode.NotFound, "Nincs ilyen Alaplap");


            try
            {
                var result = ctx.Setupok.Add(new Setup
                {
                    ApplikacioId=ApplikacioId,
                    VidkaId=VideokartyaId,
                    ProcId=ProcesszorId,
                    OpId=OprendszerId,
                    RamId=RamoId,
                    AlaplId=AlaplapId,
                    Gp=value.Gepigeny
                });
                ctx.SaveChanges();

                return Created($"api/Setup/{result}", result);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        // PUT api/<controller>/5
        public IHttpActionResult Patch(int id,string applikacionev,string igeny, [FromBody] SetupPatchModel value)
        {
            try
            {
                var ApplikacioId = ctx.Applikaciok.Where(x => x.Nev == applikacionev).Select(x => x.Id).FirstOrDefault();
                if (ApplikacioId == 0) return Content(HttpStatusCode.NotFound, "Nincs ilyen applikacio");
                var result = ctx.Setupok.Where(x => x.ApplikacioId == ApplikacioId && x.Gp == igeny).FirstOrDefault();
                if (result == null) return NotFound();
                if (value.AlaplapNeve != null) result.AlaplId = ctx.Alaplapok.Where(x=>x.Nev==value.AlaplapNeve).Select(x=>x.Id).FirstOrDefault();
                if (value.VidekortyaNev != null) result.VidkaId = ctx.Videokartyak.Where(x => x.Nev == value.VidekortyaNev &&x.Vram==value.Vram).Select(x => x.Id).FirstOrDefault();
                if (value.OprendszerNev != null) result.OpId = ctx.Oprendszerek.Where(x => x.Nev == value.OprendszerNev).Select(x => x.Id).FirstOrDefault(); 
                if (value.ProcesszorNev != null) result.ProcId = ctx.Processzorok.Where(x => x.Nev == value.ProcesszorNev).Select(x => x.Id).FirstOrDefault();
                if (value.RamNeve != null) result.RamId = ctx.Ramok.Where(x => x.Nev == value.RamNeve && x.Frekvencia==value.RamFrekvencia).Select(x => x.Id).FirstOrDefault();

                ctx.SaveChanges();
                return Ok(result);
                //return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id,string applikacionev,string igeny)
        {
            var ApplikacioId = ctx.Applikaciok.Where(x => x.Nev == applikacionev).Select(x => x.Id).FirstOrDefault();
            if (ApplikacioId == 0) return Content(HttpStatusCode.NotFound, "Nincs ilyen applikacio");
            var result = ctx.Setupok.Where(x => x.ApplikacioId == ApplikacioId && x.Gp == igeny).FirstOrDefault();
            if (result != null)
            {
                ctx.Setupok.Remove(result);
                ctx.SaveChanges();
                return Ok("Törlés sikeresen megtörtént");
            }
            ctx.SaveChanges();
            return NotFound();
        }
    }
}
