using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json.Linq;
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
using webapiproj.UserManager;

namespace UnitTestProject.TestController
{
    [TestClass]
    public class TestProfilController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {
            PasswdManager.CreatePasswordHash("ada", out byte[] jelszo1, out byte[] jelszoUjra1);
            PasswdManager.CreatePasswordHash("aaafda", out byte[] jelszo2, out byte[] jelszoUjra2);
            ctx.Profilok.Add(
                new Profil { Id = 1, Felhasznalonev="Demo1", Email="affaf@gag.com",Jogosultsag=1,Jelszo=jelszo1,JelszoUjra=jelszoUjra1, Tema="afssafasf",LogoEleresiUtja="dasdasdsad"});
            ctx.Profilok.Add(
              new Profil { Id = 2, Felhasznalonev = "Demo2", Email = "afafaf@gmail.com",Jogosultsag = 2, Jelszo = jelszo2, JelszoUjra = jelszoUjra2, Tema = "arsad", LogoEleresiUtja = "qqeqrsd" });
            ctx.Profilok.Add(
              new Profil { Id = 3, Felhasznalonev = "Demo3", Email = "afafaff@gasd.hu", Jogosultsag = 1, Jelszo = jelszo2, JelszoUjra = jelszoUjra2, Tema = "afssafqqasf", LogoEleresiUtja = "qqq" });
            ctx.SaveChanges();
        }

        [TestMethod]
        public void Get_OsszProfil()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ProfilController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<ProfilResponseModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.ToList().Count());
        }
        [TestMethod]
        public async Task Get_EgyProfil()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ProfilController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var result = await controller.Get(1, "Demo1").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsTrue(result.TryGetContentValue(out ProfilResponseModel contentresult));
            Assert.IsNotNull(result);
            Assert.AreEqual("Demo1", contentresult.Felhasznalonev);
        }
        [TestMethod]
        public async Task Post_EgyProfil()
        {

            var ctx = new TestProjektContext();
            var controller = new ProfilController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new ProfilPostModel
            {
                Felhasznalonev="Beni",
                Email="beni05@gmail.com",
                Jelszo="Benike",
                Jogosultsag=2,
                Tema="asfasf",
                LogoEleresiUtja="asfa"


            };
            var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
        }
        [TestMethod]
        public async Task Patch_EgyProfil()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ProfilController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            var model = new ProfilUpdateModel
            {
                LogoEleresiUtja = "afafaffafafg",
                Jogosultsag = 58

            };
            var result = await controller.Patch(1, "Demo1", model).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
        [TestMethod]
        public async Task Delete_EgyProfil()
        {

            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ProfilController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };


            var result = await controller.Delete(1, "Demo1").ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
        [TestMethod]
        public async Task ProfilAuthentikácio()
        {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new ProfilController(ctx)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()  
            };
            var model = new Authenticate
            {
                Email = "affaf@gag.com",
                Jelszo = "ada"
            };
            //var model1 = new Authenticate
            //{
            //    Email = "afafaf@gmail.com",
            //    Jelszo = "aaafda"
            //};
            var result = await controller.Post(model).ExecuteAsync(new System.Threading.CancellationToken());
            //var result1 = await controller.Post(model1).ExecuteAsync(new System.Threading.CancellationToken());
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
            //Assert.IsNotNull(result1);
            //Assert.AreEqual(HttpStatusCode.OK, result1.StatusCode);
        }
    }
}
