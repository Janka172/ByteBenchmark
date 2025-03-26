using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http.Results;
using System.Web.Http;
using webapiproj.Controllers;
using webapiproj.Models;
using System.Linq;

namespace UnitTestProject.TestController
{
    [TestClass]
    public class TestOprendszerController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {
            ctx.Oprendszerek.Add(
                new Operaciosrendszer { Id = 1, Nev = "Demo1", BuildSzam = "erasafsafsafsa", Verzio = "12saf",  KepNev = "string" });
            ctx.Oprendszerek.Add(
              new Operaciosrendszer { Id = 2, Nev = "Demo2", BuildSzam = "fsafsafsafsaf", Verzio = "10asfsaf", KepNev = "stfasfsafring" });
            ctx.Oprendszerek.Add(
              new Operaciosrendszer { Id = 3, Nev = "Demo1", BuildSzam = "LGsafAsafsafsafs1151", Verzio = "15rqw", KepNev = "sasfdasftring" });
            ctx.SaveChanges();
        }

        [TestMethod]
        public void Get_OsszOprendszer()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new OprendszerController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<OprendszerModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.ToList().Count());
        }
        [TestMethod]
        public async Task Get_EgyOprendszer()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new OprendszerController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var result = await controller.Get(1, "Demo1").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsTrue(result.TryGetContentValue(out OprendszerModel contentresult));
            Assert.IsNotNull(result);
            Assert.AreEqual("Demo1", contentresult.Nev);
        }
        [TestMethod]
        public async Task Post_EgyOprendszer()
        {

            var ctx = new TestProjektContext();
            var controller = new OprendszerController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new OprendszerModel
            {
                Nev = "Demo4",
                BuildSzam ="fassafsa2fsaf5",
                Verzio ="dsdsad5sad5saf5sa",
                KepNev = "dsasafsafsaf"

            };
            var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
        }
        [TestMethod]
        public async Task Patch_EgyOprendszer()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new OprendszerController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new OprendszerModel
            {

                KepNev = "Beni"

            };
            var result = await controller.Patch(1, "Demo1", "erasafsafsafsa", model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
        [TestMethod]
        public async Task Delete_EgyOprendszer()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new OprendszerController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };


            var result = await controller.Delete(1, "Demo1", "erasafsafsafsa").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
    }
}
