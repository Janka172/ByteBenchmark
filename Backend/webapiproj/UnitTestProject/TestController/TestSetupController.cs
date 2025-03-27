using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Web.Http;
using System.Web.Http.Results;
using webapiproj.Controllers;
using webapiproj.Models;
using webapiproj.UserManager;

namespace UnitTestProject.TestController
{
    [TestClass]
    public class TestSetupController
    {
        public void FillTestDatabase(TestProjektContext ctx)
        {
            // Adding sample Videokartya
            ctx.Videokartyak.Add(new Videokartya
            {
                Id = 1,
                Nev = "NVIDIA GTX 1080",
                AlaplapiCsatlakozas = "sfaf",
                AjanlottTapegyseg = 5555,
                MonitorCsatlakozas = "safsaf",
                Vram = 8,
                ChipGyartoja = "safsafsaf",
                KepNev = "fsafsaf"
            });

            // Adding sample Processzor
            ctx.Processzorok.Add(new Processzor
            {
                Id = 1,
                Nev = "Intel i7-9700K",
                AlaplapFoglalat = "sfsaf",
                SzalakSzama = 5,
                TamogatottMemoriatipus = "sfsaf",
                ProcesszormagokSzama = 55,
                ProcesszorFrekvencia = 1444,
                BFrekvencia = 15555,
                Gyarto = "safsaf",
                AjanlottTapegyseg = 55,
                IntegraltVideokartya = true,
                KepNev = "safsafsaf"
            });

            // Adding sample Ram
            ctx.Ramok.Add(new Ram
            {
                Id = 1,
                Nev = "Corsair Vengeance",
                MemoriaTipus = "dsaf",
                Frekvencia = 3200,
                Meret = 16,
                KepNev = "5fsafsaf"
            });

            // Adding sample Alaplap
            ctx.Alaplapok.Add(new Alaplap
            {
                Id = 1,
                Nev = "ASUS ROG Strix",
                CpuFoglalat = "dsfa",
                AlaplapFormatum = "sfsafsaf",
                MaxFrekvencia = 1500,
                MemoriaTipusa = "aff",
                Lapkakeszlet = "sfaf",
                SlotSzam = 15,
                Hangkartya = true,
                VideokartyaCsatlakozo = "afffaf",
                KepNev = "fasfsaf"
            });

            // Adding sample Oprendszer
            ctx.Oprendszerek.Add(new Operaciosrendszer
            {
                Id = 1,
                Nev = "Windows 10"
            });

            // Adding sample Applikacio
            ctx.Applikaciok.Add(new Applikacio
            {
                Id = 1,
                Nev = "Cyberpunk 2077",
                Tarhely = 70
            });

            // Adding sample Setup entity linking all components
            ctx.Setupok.Add(new Setup
            {
                Id = 1,
                Gp = "High",
                VidkaId = 1,
                ProcId = 1,
                RamId = 1,
                AlaplId = 1,
                OpId = 1,
                ApplikacioId = 1
            });

            ctx.SaveChanges();
        }
        [TestMethod]
        public void Get_OsszSetup()
        {
            // Arrange
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new SetupController(ctx);

            // Act
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<SetupModel>>;

            // Assert
            Assert.IsNotNull(result, "The result should not be null.");
            var setupList = result.Content.ToList();
            Assert.AreEqual(1, setupList.Count, "The number of setups returned should be 1.");
        }
    }
}
