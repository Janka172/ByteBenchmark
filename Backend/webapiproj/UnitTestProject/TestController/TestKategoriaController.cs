using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using webapiproj.Controllers;
using webapiproj.Models;

namespace UnitTestProject.TestController
{
    [TestClass]
    public class TestKategoriaController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {
            ctx.Kategoriak.Add(
                new Kategoria { Id = 1, Nev = "Demo1"});
            ctx.Kategoriak.Add(
              new Kategoria { Id = 2, Nev = "Demo2"});
            ctx.Kategoriak.Add(
              new Kategoria { Id = 3, Nev = "Demo3"});
            ctx.SaveChanges();
        }
        [TestMethod]
        public void Get_OsszKategoria()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new KategoriaController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<KategoriaModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.ToList().Count);
        }

        [TestMethod]
        public async Task Get_EgyKategoria()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new KategoriaController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };
            var result = await controller.Get(1, "Demo1").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsTrue(result.TryGetContentValue(out KategoriaModel contentresult));
            Assert.IsNotNull(result);
            Assert.AreEqual("Demo1", contentresult.Nev);
        }
        [TestMethod]
        public async Task Post_EgyKategoria()
        {

            var ctx = new TestProjektContext();
            var controller = new KategoriaController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new KategoriaModel
            {
                Nev = "Demo4",
            };
            var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
        }
        [TestMethod]
        public async Task Patch_EgyKategoria()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new KategoriaController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new KategoriaModel
            {

                Nev="NAgxika"
            };
            var result = await controller.Patch(1, "Demo1", model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
        [TestMethod]
        public async Task Delete_EgyKategoria()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new KategoriaController(ctx)
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
