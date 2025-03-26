using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http.Results;
using System.Web.Http;
using webapiproj.Controllers;
using webapiproj.Models;
using System.Linq;
using System.Net;

namespace UnitTestProject.TestController
{
    [TestClass]
    public class TestProcesszorController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {
            ctx.Processzorok.Add(
                new Processzor { Id = 1, Nev = "Demo1", AlaplapFoglalat = "AM4", SzalakSzama = 12, TamogatottMemoriatipus = "ddr4", ProcesszormagokSzama = 8, Gyarto = "AMD", AjanlottTapegyseg = 550, IntegraltVideokartya=false,ProcesszorFrekvencia=1500, BFrekvencia=2500,KepNev="string" });
            ctx.Processzorok.Add(
              new Processzor { Id = 2, Nev = "Demo2", AlaplapFoglalat = "AM4", SzalakSzama = 10, TamogatottMemoriatipus = "ddr5", ProcesszormagokSzama = 8, Gyarto = "AMD", AjanlottTapegyseg = 550, IntegraltVideokartya = true, ProcesszorFrekvencia = 1600, BFrekvencia = 2600, KepNev = "stfasfsafring" });
            ctx.Processzorok.Add(
              new Processzor { Id = 1, Nev = "Demo1", AlaplapFoglalat = "LGA1151", SzalakSzama = 15, TamogatottMemoriatipus = "ddr4", ProcesszormagokSzama = 10, Gyarto = "INTEL", AjanlottTapegyseg = 550, IntegraltVideokartya = false, ProcesszorFrekvencia = 2500, BFrekvencia = 3500, KepNev = "sasfdasftring" });
            ctx.SaveChanges();
        }

        [TestMethod]
        public void Get_OsszProcesszor()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ProcesszorController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<ProcesszorModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.ToList().Count);
        }
        [TestMethod]
        public async Task Get_EgyProcesszor()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ProcesszorController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var result = await controller.Get(1, "Demo1").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsTrue(result.TryGetContentValue(out ProcesszorModel contentresult));
            Assert.IsNotNull(result);
            Assert.AreEqual("Demo1", contentresult.Nev);
        }
        [TestMethod]
        public async Task Post_EgyProcesszor()
        {

            var ctx = new TestProjektContext();
            var controller = new ProcesszorController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new ProcesszorModel
            {
                Nev = "Demo4",
                AlaplapFoglalat = "am5",
                SzalakSzama = 9,
                TamogatottMemoriatipus = "DDR5",
                ProcesszormagokSzama = 15,
                Gyarto = "Intel",
                AjanlottTapegyseg = 550,
                IntegraltVideokartya = false,
                ProcesszorFrekvencia = 1990,
                BProcesszorFrekvencia = 2250,
                Kepnev = "dsasafsafsaf"

            };
            var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
        }
        [TestMethod]
        public async Task Patch_EgyProceszor()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ProcesszorController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new ProcesszorModel
            {

                SzalakSzama = 10
                
            };
            var result = await controller.Patch(1, "Demo1",model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
        [TestMethod]
        public async Task Delete_EgyProcesszor()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ProcesszorController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };


            var result = await controller.Delete(1, "Demo1").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
    }
}
