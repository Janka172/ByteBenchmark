using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using webapiproj.Models;
using webapiproj.Controllers;
using System.Web.Http;
using System.Web.Http.Results;
using System.Net.Http;
using System.Net;

namespace UnitTestProject.TestController
{
   [TestClass]
   public class TestVideokartyaController
   {
       public void FillTestDatabase(TestProjektContext ctx)
       {
           ctx.Videokartyak.Add(
               new Videokartya { Id = 1, Nev="Demo1", AlaplapiCsatlakozas="Pci1",AjanlottTapegyseg=500,MonitorCsatlakozas="Valami,Valami2",ChipGyartoja="NVIIDA",Vram=5,KepNev="semmi"});
            ctx.Videokartyak.Add(
              new Videokartya { Id = 2, Nev = "Demo2", AlaplapiCsatlakozas = "Pci2", AjanlottTapegyseg = 400, MonitorCsatlakozas = "Valami,Valami2", ChipGyartoja = "MAS", Vram = 9 ,KepNev = "semmi" });
            ctx.Videokartyak.Add(
              new Videokartya { Id = 3, Nev = "Demo3", AlaplapiCsatlakozas = "Pci3", AjanlottTapegyseg = 550, MonitorCsatlakozas = "Valami,Valami2", ChipGyartoja = "NVIIDA", Vram = 5 ,KepNev = "semmi" });
            ctx.SaveChanges();
       }
       [TestMethod]
       public void Get_OsszVideokartya()
       {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new VideokartyaController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<VideokartyaModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.ToList().Count);
       }

        [TestMethod]
        public async Task Get_EgyVideokartya()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new VideokartyaController(ctx) { 
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };
            var result = await controller.Get(1, "Demo1", 5).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsTrue(result.TryGetContentValue(out VideokartyaModel contentresult));
            Assert.IsNotNull(result);
            Assert.AreEqual("Demo1", contentresult.Nev );
            Assert.AreEqual(5, contentresult.vram );
        }

        [TestMethod]
        public async Task Post_EgyVideokartya()
        {

            var ctx = new TestProjektContext();
            var controller = new VideokartyaController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new VideokartyaModel
            {
                Nev = "Demo4",
                alaplapiCsatlakozas = "PCi3",
                ajanlottTapegyseg = 9,
                monitorCsatlakozas = "DVI,HDMI",
                chipGyartoja = "AMD",
                vram = 9,
                kepnev = "fasfsaff.jpg"
            };
            var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
        }
        [TestMethod]
        public async Task Patch_EgyVideokartya()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new VideokartyaController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new VideokartyaModel
            {
                
                alaplapiCsatlakozas = "PCi3",
                ajanlottTapegyseg = 9,
                monitorCsatlakozas = "DVI,HDMI",
                chipGyartoja = "NVIDIA",
                kepnev = "fasfsaff.jpg"
            };
            var result = await controller.Patch(1,"Demo1",5,model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
        [TestMethod]
        public async Task Delete_EgyVideokartya()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new VideokartyaController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            
            var result = await controller.Delete(1, "Demo1", 5).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }

    }
}
