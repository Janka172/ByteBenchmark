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

    public class VideokartyaModel
    {
        public string Nev { get; set; }
        public string alaplapiCsatlakozas { get; set; }
        public int ajanlottTapegyseg { get; set; }
        public string monitorCsatlakozas { get; set; }
        public string chipGyartoja { get; set; }
        public int vram { get; set; }
        public string kepnev { get; set; }
    }
    public class VideokartyaController : ApiController
    {
        IProjektContext ctx = new ProjektContext();

        public VideokartyaController() { }

        public VideokartyaController(IProjektContext context)
        {
            ctx = context;
        }
        // GET api/<controller>
        [ResponseType(typeof(VideokartyaModel))]
        public IHttpActionResult Get()
        {
            IEnumerable<VideokartyaModel> result = null;
            result = ctx.Videokartyak.Select(x => new VideokartyaModel
            {
                Nev = x.Nev,
                alaplapiCsatlakozas = x.AlaplapiCsatlakozas,
                ajanlottTapegyseg = x.AjanlottTapegyseg,
                monitorCsatlakozas = x.MonitorCsatlakozas,
                chipGyartoja = x.ChipGyartoja,
                vram = x.Vram,
                kepnev=x.KepNev
            }).ToList();

            return Ok(result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(VideokartyaModel))]
        public IHttpActionResult Get(int id, string name)
        {
            VideokartyaModel result = null;
            result = ctx.Videokartyak.Where(x => x.Nev == name).Select(x => new VideokartyaModel
            {
                Nev = x.Nev,
                alaplapiCsatlakozas = x.AlaplapiCsatlakozas,
                ajanlottTapegyseg = x.AjanlottTapegyseg,
                monitorCsatlakozas = x.MonitorCsatlakozas,
                chipGyartoja = x.ChipGyartoja,
                vram = x.Vram,
                kepnev=x.KepNev
            }).FirstOrDefault();
            return Ok(result);
        }

        // POST api/<controller>
        [ResponseType(typeof(VideokartyaModel))]
        public IHttpActionResult Post([FromBody] VideokartyaModel value)
        {
            try
            {
                var result = ctx.Videokartyak.Add(new Videokartya
                {
                    Nev = value.Nev,
                    AlaplapiCsatlakozas = value.alaplapiCsatlakozas,
                    AjanlottTapegyseg = value.ajanlottTapegyseg,
                    MonitorCsatlakozas = value.monitorCsatlakozas,
                    ChipGyartoja = value.chipGyartoja,
                    Vram = value.vram,
                    KepNev=value.kepnev
                });
                ctx.SaveChanges();

                return Created($"api/Videokartya/{result}",result);
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Content(HttpStatusCode.Conflict, "már szerepel ez a Videokartya");
                return BadRequest("Videokartya feltoltese sikertelen");
            }

        }

        // PUT api/<controller>/5
        [ResponseType(typeof(VideokartyaModel))]
        public IHttpActionResult Patch(int id,string name,int vram, [FromBody] VideokartyaModel value)
        {
            try
            {
                var result = ctx.Videokartyak.Where(x => x.Nev == name && x.Vram == vram).FirstOrDefault();
                if (result == null) return NotFound();
                if(value.Nev!=null) result.Nev = value.Nev;
                if (value.alaplapiCsatlakozas != null) result.AlaplapiCsatlakozas = value.alaplapiCsatlakozas;
                if (value.ajanlottTapegyseg != null) result.AjanlottTapegyseg = value.ajanlottTapegyseg;
                if(value.monitorCsatlakozas!=null) result.MonitorCsatlakozas = value.monitorCsatlakozas;
                if(value.chipGyartoja!=null) result.ChipGyartoja = value.chipGyartoja;
                if(value.vram!=null) result.Vram = value.vram;
                if (value.kepnev != null) result.KepNev = value.kepnev;

                ctx.SaveChanges();
                return Ok(result);
                //return Ok(result);
            }
            catch (Exception ex)
            {
                if (ex.Message == "An error occurred while updating the entries. See the inner exception for details.") return Content(HttpStatusCode.Conflict,"üttközés van a videokartyanal");
                return InternalServerError(ex);
            }
        }

        // DELETE api/<controller>/5
        [ResponseType(typeof(VideokartyaModel))]
        public IHttpActionResult Delete(int id,string name, int vram)
        {
            var vidId = ctx.Videokartyak.Where(x => x.Nev == name && x.Vram == vram).Select(x=>x.Id).FirstOrDefault();
            var set = ctx.Setupok.Where(x => x.VidkaId == vidId).ToList();

            foreach (var item in set)
            {
                item.VidkaId = null;
            }


            var result = ctx.Videokartyak.Where(x => x.Nev == name&& x.Vram==vram).FirstOrDefault();
            if (result!=null)
            {
                ctx.Videokartyak.Remove(result);
                ctx.SaveChanges();
                return Ok("Törlés sikeresen megtörtént");     
            }
            ctx.SaveChanges();
            return NotFound();
            
        }
    }
}