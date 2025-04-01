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
    public class TestApplikacio_ProfilController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {
            PasswdManager.CreatePasswordHash("ada", out byte[] jelszoUjra1, out byte[] jelszo1);
            PasswdManager.CreatePasswordHash("aaafda", out byte[] jelszoUjra2, out byte[] jelszo2);
            var k = ctx.Kategoriak.Add(new Kategoria
            {
                Id = 1,
                Nev = "RPG"
            });
            var a=ctx.Applikaciok.Add(new Applikacio
            {
                Id = 1,
                Nev = "Ferike",
                Tarhely = 155,
                Kepeleresiutja = "adfsfasf",
                KatId = 1,
                Kategoria = k
            });
            var p = ctx.Profilok.Add(new Profil
            {
                Id = 1,
                Felhasznalonev = "Demo1",
                Email = "affaf@gag.com",
                Jogosultsag = 1,
                Jelszo = jelszo1,
                JelszoUjra = jelszoUjra1,
                Tema = "afssafasf",
                LogoEleresiUtja = "dasdasdsad"
            });
            ctx.Applikacio_Profilok.Add(new Applikacio_Profil
            {
                AppId=a.Id,
                Applikacio=a,
                ProfilId=p.Id,
                Profil=p
            });
            ctx.SaveChanges();

        }
        [TestMethod]
        public void Get_OsszApplikacio_Profil()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new Applikacio_ProfilController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<ApplikacioProfilModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Content.ToList().Count);
        }
        [TestMethod]
        public async Task Get_EgyApplikacio_Profil()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new Applikacio_ProfilController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };
            var result = await controller.Get(1, "Ferike").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsTrue(result.TryGetContentValue(out ApplikacioProfilModel contentresult));
            Assert.IsNotNull(result);
            Assert.AreEqual("Ferike", contentresult.ApplikacioNeve);
            Assert.AreEqual("Demo1", contentresult.UserName);
        }
        //[TestMethod]
        //public async Task Post_EgyApplikacio_Profil()
        //{
        //    var ctx = new TestProjektContext();
        //    FillTestDatabase(ctx);
        //    var controller = new Applikacio_ProfilController(ctx)
        //    {
        //        Request = new HttpRequestMessage(),
        //        Configuration = new HttpConfiguration()
        //    };

        //    var model = new ApplikacioProfilModel
        //    {
        //        ApplikacioNeve= "Ferike",
        //        UserName= "Demo1"


        //    };
        //    var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
        //    Assert.IsNotNull(result);
        //    Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
        //}

    }
}
