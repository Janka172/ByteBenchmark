using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Web.Http;
using System.Web.Http.Results;
using webapiproj.Controllers;
using webapiproj.Models;
using webapiproj.UserManager;
using System.Threading.Tasks;

namespace UnitTestProject.TestController
{
    [TestClass]
    public class TestSetupController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {

           var v= ctx.Videokartyak.Add(new Videokartya
            {
                Id = 1,
                Nev = "NVIDIA GTX 1080",
                AlaplapiCsatlakozas = "sfaf",
                AjanlottTapegyseg = 5555,
                MonitorCsatlakozas = "safsaf",
                Vram = 8,
                ChipGyartoja = "safsafsaf",
                KepNev = "fsafsaf"
            });

            var p=ctx.Processzorok.Add(new Processzor
            {
                Id = 1,
                Nev = "Intel i7-9700K",
                AlaplapFoglalat = "sfsaf",
                SzalakSzama = 5,
                TamogatottMemoriatipus = "sfsaf",
                ProcesszormagokSzama = 55,
                ProcesszorFrekvencia = 1444,
                BFrekvencia = 15555,
                Gyarto = "safsaf",
                AjanlottTapegyseg = 55,
                IntegraltVideokartya = true,
                KepNev = "safsafsaf"
            });


            var r=ctx.Ramok.Add(new Ram
            {
                Id = 1,
                Nev = "Corsair Vengeance",
                MemoriaTipus = "dsaf",
                Frekvencia = 3200,
                Meret = 16,
                KepNev = "5fsafsaf"
            });


            var a=ctx.Alaplapok.Add(new Alaplap
            {
                Id = 1,
                Nev = "ASUS ROG Strix",
                CpuFoglalat = "dsfa",
                AlaplapFormatum = "sfsafsaf",
                MaxFrekvencia = 1500,
                MemoriaTipusa = "aff",
                Lapkakeszlet = "sfaf",
                SlotSzam = 15,
                Hangkartya = true,
                VideokartyaCsatlakozo = "afffaf",
                KepNev = "fasfsaf"
            });

            var o=ctx.Oprendszerek.Add(new Operaciosrendszer
            {
                Id = 1,
                Nev = "Windows 10",
                BuildSzam="safaf",
                Verzio= "safsaf",
                KepNev ="sfafasf"
            });
            var k=ctx.Kategoriak.Add(new Kategoria
            {
                Id = 1,
                Nev = "RPG"
            });

            var ap=ctx.Applikaciok.Add(new Applikacio
            {
                Id = 1,
                Nev = "Cyberpunk 2077",
                Tarhely=55,
                Kepeleresiutja= "safsaf",
                KatId = k.Id,
                Kategoria=k,
            });


            ctx.Setupok.Add(new Setup
            {
                Id = 1,
                Gp = "High",
                VidkaId = v.Id,
                Videokartya = v,
                ProcId = p.Id,
                Processzor=p,
                RamId = r.Id,
                Ram =r,
                AlaplId = a.Id,
                Alaplap =a,
                OpId = o.Id,
                Oprendszer=o,
                ApplikacioId = ap.Id,
                Applikacio=ap
                
            });

            ctx.SaveChanges();
        }
        [TestMethod]
        public void Get_OsszSetup()
        {
            
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new SetupController(ctx);

            
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<SetupModel>>;

            
            Assert.IsNotNull(result);
            var setupList = result.Content.ToList();
            Assert.AreEqual(1, setupList.Count);
        }
        [TestMethod]
        public void Get_EgySetup()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new SetupController(ctx);


            var result = controller.Get(1, "Cyberpunk 2077") as OkNegotiatedContentResult<IEnumerable<SetupModel>>;


            Assert.IsNotNull(result);
            var setupList = result.Content.ToList();
            Assert.AreEqual(1, setupList.Count);
        }

        [TestMethod]
        public async Task Post_EgySetup()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new SetupController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new SetupPostModel
            {
                ApplikacioNeve= "Cyberpunk 2077",
                Gepigeny="min",
                VidekortyaNev= "NVIDIA GTX 1080",
                Vram=8,
                ProcesszorNev= "Intel i7-9700K",
                OprendszerNev= "Windows 10",
                RamNeve= "Corsair Vengeance",
                RamFrekvencia= 3200,
                RamMeret=16,
                AlaplapNeve= "ASUS ROG Strix",
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
            var controller = new SetupController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new SetupPatchModel
            {

                AlaplapNeve = "ASUS ROG Strix",

            };
            var result = await controller.Patch(1, "Cyberpunk 2077", "High", model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
        [TestMethod]
        public async Task Delete_EgySetup()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new SetupController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };


            var result = await controller.Delete(1, "Cyberpunk 2077", "High").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }

    }
}
