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
    public class TestAlaplapController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {
            ctx.Alaplapok.Add(
                new Alaplap { Id = 1, Nev = "Demo1",CpuFoglalat="saffsaf",AlaplapFormatum="asfsaf",MaxFrekvencia=1511,MemoriaTipusa="sfsafsaf",Lapkakeszlet="safsf",SlotSzam=2,Hangkartya=true,VideokartyaCsatlakozo="saff",KepNev="faf"});
            ctx.Alaplapok.Add(
              new Alaplap { Id = 2, Nev = "Demo2", CpuFoglalat = "aa", AlaplapFormatum = "asffasfsaf", MaxFrekvencia = 1551, MemoriaTipusa = "sfsaaafsaf", Lapkakeszlet = "safsaff", SlotSzam = 4, Hangkartya = false, VideokartyaCsatlakozo = "saffff", KepNev = "fffaf" });
            ctx.Alaplapok.Add(
              new Alaplap { Id = 3, Nev = "Demo3", CpuFoglalat = "aaasaffsaf", AlaplapFormatum = "aaaasfsaf", MaxFrekvencia = 11511, MemoriaTipusa = "aaasfsafsaf", Lapkakeszlet = "aaasafsf", SlotSzam = 12, Hangkartya = true, VideokartyaCsatlakozo = "saaaff", KepNev = "faaaf" });
            ctx.SaveChanges();
        }

        [TestMethod]
        public void Get_OsszAlaplap()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new AlaplapController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<AlaplapModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.ToList().Count());
        }
        [TestMethod]
        public async Task Get_EgyAlaplap()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new AlaplapController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var result = await controller.Get(1, "Demo1").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsTrue(result.TryGetContentValue(out AlaplapModel contentresult));
            Assert.IsNotNull(result);
            Assert.AreEqual("Demo1", contentresult.Nev);
        }
        [TestMethod]
        public async Task Post_EgyAlaplap()
        {

            var ctx = new TestProjektContext();
            var controller = new AlaplapController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new AlaplapUploadModel
            {
                Nev = "Demo4",
                CpuFoglalat = "asfsaf",
                AlaplapFormatum = "safsa",
                MaxFrekvencia = 1444,
                MemoriaTipusa = "ffsad",
                Lapkakeszlet = "safsafsa",
                SlotSzam = 1,
                Hangkartya = false,
                VideokartyaCsatlakozo = "sfsafa",
                Csatlakozok = new List<string> { "USB3.0", "HDMI", "SATA" },
                Kepnev ="safsafsaf"


            };
            var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
        }
        [TestMethod]
        public async Task Patch_EgyAlaplap()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new AlaplapController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new AlaplapModel
            {
                Hangkartya=true,
                KepNev = "Beni"

            };
            var result = await controller.Patch(1, "Demo1", model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
        [TestMethod]
        public async Task Delete_EgyAlaplap()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new AlaplapController(ctx)
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
