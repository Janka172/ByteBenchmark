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
    public class TestCsatlakozoController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {
            ctx.Csatlakozok.Add(
                new Csatlakozo { Id = 1, Nev = "Demo1" });
            ctx.Csatlakozok.Add(
              new Csatlakozo { Id = 2, Nev = "Demo2" });
            ctx.Csatlakozok.Add(
              new Csatlakozo { Id = 3, Nev = "Demo3" });
            ctx.SaveChanges();
        }
        [TestMethod]
        public void Get_OsszCsatlakozo()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new CsatlakozoController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<CsatlakozoModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.ToList().Count);
        }

        [TestMethod]
        public async Task Get_EgyCsatlakozo()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new CsatlakozoController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };
            var result = await controller.Get(1, "Demo1").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsTrue(result.TryGetContentValue(out CsatlakozoModel contentresult));
            Assert.IsNotNull(result);
            Assert.AreEqual("Demo1", contentresult.Nev);
        }
        [TestMethod]
        public async Task Post_EgyCsatlakozo()
        {

            var ctx = new TestProjektContext();
            var controller = new CsatlakozoController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new CsatlakozoModel
            {
                Nev = "Demo4",
            };
            var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
        }
    }
}
