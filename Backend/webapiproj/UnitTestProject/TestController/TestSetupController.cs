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
            // Adding sample Videokartya
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

            // Adding sample Processzor
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

            // Adding sample Ram
            var r=ctx.Ramok.Add(new Ram
            {
                Id = 1,
                Nev = "Corsair Vengeance",
                MemoriaTipus = "dsaf",
                Frekvencia = 3200,
                Meret = 16,
                KepNev = "5fsafsaf"
            });

            // Adding sample Alaplap
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

            // Adding sample Oprendszer
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
            // Adding sample Applikacio
            var ap=ctx.Applikaciok.Add(new Applikacio
            {
                Id = 1,
                Nev = "Cyberpunk 2077",
                Tarhely=55,
                Kepeleresiutja= "safsaf",
                KatId = k.Id,
            });

            // Adding sample Setup entity linking all components
            ctx.Setupok.Add(new Setup
            {
                Id = 1,
                Gp = "High",
                VidkaId = v.Id,
                ProcId = p.Id,
                RamId = r.Id,
                AlaplId = a.Id,
                OpId = o.Id,
                ApplikacioId = ap.Id
            });

            ctx.SaveChanges();
        }
        [TestMethod]
        public void Get_OsszSetup()
        {
            // Arrange
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new SetupController(ctx);

            // Act
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<SetupModel>>;

            // Assert
            Assert.IsNotNull(result, "The result should not be null.");
            var setupList = result.Content.ToList();
            Assert.AreEqual(1, setupList.Count, "The number of setups returned should be 1.");
        }
        public async Task Post_EgySetup()
        {

            var ctx = new TestProjektContext();
            var controller = new SetupController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new SetupPostModel
            {
                ApplikacioNeve="",
                Gepigeny="",
                VidekortyaNev="",
                Vram=,
                ProcesszorNev="",
                OprendszerNev="",
                RamNeve="",
                RamFrekvencia=,
                AlaplapNeve="",
    };
            var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
        }
    }
}
