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
        public async Task Delete_EgyVideokartya()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ApplikacioController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };


            var result = await controller.Delete(1, "Ferike").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
    }
}
