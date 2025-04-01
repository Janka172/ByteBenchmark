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
using webapiproj.UserManager;

namespace UnitTestProject.TestController
{
    [TestClass]
    public class TestAlaplap_CsatlakozoController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {
            var a = ctx.Alaplapok.Add(new Alaplap
            {
                Id = 1,
                Nev = "Demo1",
                CpuFoglalat = "saffsaf",
                AlaplapFormatum = "asfsaf",
                MaxFrekvencia = 1511,
                MemoriaTipusa = "sfsafsaf",
                Lapkakeszlet = "safsf",
                SlotSzam = 2,
                Hangkartya = true,
                VideokartyaCsatlakozo = "saff",
                KepNev = "faf"
            });
            var c=ctx.Csatlakozok.Add(new Csatlakozo
            {
                Id = 1,
                Nev="USB"
            });
            ctx.Alaplap_Csatlakozok.Add(new Alaplap_Csatlakozo
            {
                AlaplapId=a.Id,
                Alaplap=a,
                CsatlakozoId=c.Id,
                Csatlakozo=c
            });
            ctx.SaveChanges();

        }
        [TestMethod]
        public void Get_OsszAlaplap_Csatlakozo()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new Alaplap_CsatlakozokController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<AlaplapCsatlakozModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Content.ToList().Count);
        }
        [TestMethod]
        public async Task Get_EgyAlaplap_Csatlakozo()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new Alaplap_CsatlakozokController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };
            var result = await controller.Get(1, "Demo1").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsTrue(result.TryGetContentValue(out AlaplapCsatlakozModel contentresult));
            Assert.IsNotNull(result);
            Assert.AreEqual("Demo1", contentresult.AlaplapNev);
            Assert.AreEqual("USB", contentresult.CsatlakozoNev);
        }
    }
}
