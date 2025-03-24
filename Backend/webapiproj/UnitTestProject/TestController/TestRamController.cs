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
    public class TestRamController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {
            ctx.Ramok.Add(
                new Ram { Id = 1, Nev = "Demo1", MemoriaTipus = "ddr4", Frekvencia = 1500, Meret = 8, KepNev = "string"});
            ctx.Ramok.Add(
              new Ram { Id = 2, Nev = "Demo2", MemoriaTipus = "ddr5", Frekvencia = 1400, Meret = 4, KepNev = "fstsd"});
            ctx.Ramok.Add(
              new Ram { Id = 3, Nev = "Demo3", MemoriaTipus = "ddr4", Frekvencia = 2550, Meret = 16, KepNev = "safsafasf"});
            ctx.SaveChanges();
        }

        [TestMethod]
        public void Get_OsszRam()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new RamController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<RamModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.ToList().Count);
        }
        [TestMethod]
        public async Task Get_EgyRam()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new RamController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var result = await controller.Get(1,"Demo1",1500,8).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsTrue(result.TryGetContentValue(out RamModel contentresult));
            Assert.IsNotNull(result);
            Assert.AreEqual("Demo1", contentresult.Nev);
            Assert.AreEqual(1500, contentresult.Frekvencia);
            Assert.AreEqual(8, contentresult.Meret);
        }
        [TestMethod]
        public async Task Post_EgyRam()
        {

            var ctx = new TestProjektContext();
            var controller = new RamController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new RamModel
            {
                Nev = "Demo4",
                MemoriaTipus = "ddr4",
                Frekvencia = 1500,
                Meret = 8,
                Kepnev = "avvava"
            };
            var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
        }
        [TestMethod]
        public async Task Patch_EgyRam()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new RamController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new RamModel
            {
                Nev = "Demo4",
                MemoriaTipus = "ddr4",
                Frekvencia = 1500,
                Meret = 8,
                Kepnev = "avvava"
            };
            
            var result = await controller.Patch(1, "Demo1", 1500,8, model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
        [TestMethod]
        public async Task Delete_EgyRam()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new RamController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };


            var result = await controller.Delete(1, "Demo2", 1400,4).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
    }
}
