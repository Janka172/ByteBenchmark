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
    public class TestApplikacioController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {
            var k = ctx.Kategoriak.Add(new Kategoria
            {
                Id = 1,
                Nev = "RPG"
            });
            ctx.Applikaciok.Add(new Applikacio
            {
                Id = 1,
                Nev = "Ferike",
                Tarhely=155,
                Kepeleresiutja="adfsfasf",
                KatId=1,
                Kategoria=k
            });
            ctx.SaveChanges();

        }
        public void FillTestDeleteDatabase(TestProjektContext ctx)
        {
            var v = ctx.Videokartyak.Add(new Videokartya
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

            var p = ctx.Processzorok.Add(new Processzor
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


            var r = ctx.Ramok.Add(new Ram
            {
                Id = 1,
                Nev = "Corsair Vengeance",
                MemoriaTipus = "dsaf",
                Frekvencia = 3200,
                Meret = 16,
                KepNev = "5fsafsaf"
            });


            var a = ctx.Alaplapok.Add(new Alaplap
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

            var o = ctx.Oprendszerek.Add(new Operaciosrendszer
            {
                Id = 1,
                Nev = "Windows 10",
                BuildSzam = "safaf",
                Verzio = "safsaf",
                KepNev = "sfafasf"
            });
            var k = ctx.Kategoriak.Add(new Kategoria
            {
                Id = 1,
                Nev = "RPG"
            });

            var ap = ctx.Applikaciok.Add(new Applikacio
            {
                Id = 1,
                Nev = "Cyberpunk 2077",
                Tarhely = 55,
                Kepeleresiutja = "safsaf",
                KatId = k.Id,
                Kategoria = k,
            });


            ctx.Setupok.Add(new Setup
            {
                Id = 1,
                Gp = "High",
                VidkaId = v.Id,
                Videokartya = v,
                ProcId = p.Id,
                Processzor = p,
                RamId = r.Id,
                Ram = r,
                AlaplId = a.Id,
                Alaplap = a,
                OpId = o.Id,
                Oprendszer = o,
                ApplikacioId = ap.Id,
                Applikacio = ap

            });
            ctx.SaveChanges();
        }
        [TestMethod]
        public void Get_OsszApplikacio()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ApplikacioController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<ApplikacioModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Content.ToList().Count);
        }
        [TestMethod]
        public async Task Get_EgyApplikacio()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ApplikacioController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };
            var result = await controller.Get(1, "Ferike").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsTrue(result.TryGetContentValue(out ApplikacioModel contentresult));
            Assert.IsNotNull(result);
            Assert.AreEqual("Ferike", contentresult.Nev);
        }

        [TestMethod]
        public async Task Post_EgyApplikacio()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ApplikacioController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new ApplikacioModel
            {
                Nev = "Demo4",
                Tarhely = 140,
                KepeleresiUtja = "fsafasfasf",
                KategoriaNev= "RPG"
            };
            var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
        }
        [TestMethod]
        public async Task Patch_EgyApplikacio()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ApplikacioController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new ApplikacioModel
            {

                Tarhely = 55
            };
            var result = await controller.Patch(1, "Ferike", model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
        [TestMethod]
        public async Task Delete_EgyApplikacio()
        {

            var ctx = new TestProjektContext();
            FillTestDeleteDatabase(ctx);
            var controller = new ApplikacioController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };


            var result = await controller.Delete(1, "Cyberpunk 2077").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
    }
}
