using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;
using webapiproj.Controllers;
using webapiproj.Models;
using webapiproj.UserManager;

namespace UnitTestProject.TestController
{
    [TestClass]
    public class TestSetupController
    {
        public void FillTestDatabaseVideokartya(TestProjektContext ctx)
        {
            ctx.Videokartyak.Add(
               new Videokartya { Id = 1, Nev = "Demo1", AlaplapiCsatlakozas = "Pci1", AjanlottTapegyseg = 500, MonitorCsatlakozas = "Valami,Valami2", ChipGyartoja = "NVIIDA", Vram = 5, KepNev = "semmi" });
            ctx.Videokartyak.Add(
              new Videokartya { Id = 2, Nev = "Demo2", AlaplapiCsatlakozas = "Pci2", AjanlottTapegyseg = 400, MonitorCsatlakozas = "Valami,Valami2", ChipGyartoja = "MAS", Vram = 9, KepNev = "semmi" });
            ctx.SaveChanges();
        }
        public void FillTestDatabaseProcesszor(TestProjektContext ctx)
        {
            ctx.Processzorok.Add(
                new Processzor { Id = 1, Nev = "Demo1", AlaplapFoglalat = "AM4", SzalakSzama = 12, TamogatottMemoriatipus = "ddr4", ProcesszormagokSzama = 8, Gyarto = "AMD", AjanlottTapegyseg = 550, IntegraltVideokartya = false, ProcesszorFrekvencia = 1500, BFrekvencia = 2500, KepNev = "string" });
            ctx.Processzorok.Add(
              new Processzor { Id = 2, Nev = "Demo2", AlaplapFoglalat = "AM4", SzalakSzama = 10, TamogatottMemoriatipus = "ddr5", ProcesszormagokSzama = 8, Gyarto = "AMD", AjanlottTapegyseg = 550, IntegraltVideokartya = true, ProcesszorFrekvencia = 1600, BFrekvencia = 2600, KepNev = "stfasfsafring" });
            ctx.SaveChanges();
        }
        public void FillTestDatabaseRam(TestProjektContext ctx)
        {
            ctx.Ramok.Add(
               new Ram { Id = 1, Nev = "Demo1", MemoriaTipus = "ddr4", Frekvencia = 1500, Meret = 8, KepNev = "string" });
            ctx.Ramok.Add(
              new Ram { Id = 2, Nev = "Demo2", MemoriaTipus = "ddr5", Frekvencia = 1400, Meret = 4, KepNev = "fstsd" });
            ctx.SaveChanges();
        }
        public void FillTestDatabaseOprendszer(TestProjektContext ctx)
        {
            ctx.Oprendszerek.Add(
               new Operaciosrendszer { Id = 1, Nev = "Demo1", BuildSzam = "fsafsafsafsaf", Verzio = "10asfsaf", KepNev = "stfasfsafring" });
            ctx.Oprendszerek.Add(
              new Operaciosrendszer { Id = 2, Nev = "Demo2", BuildSzam = "fsafsafsafaaaaasaf", Verzio = "10asfsafaaaa", KepNev = "stfasfsaaaafring" });
            ctx.SaveChanges();
        }
        public void FillTestDatabaseAlaplap(TestProjektContext ctx)
        {
            ctx.Alaplapok.Add(
                 new Alaplap { Id = 1, Nev = "Demo1", CpuFoglalat = "saffsaf", AlaplapFormatum = "asfsaf", MaxFrekvencia = 1511, MemoriaTipusa = "sfsafsaf", Lapkakeszlet = "safsf", SlotSzam = 2, Hangkartya = true, VideokartyaCsatlakozo = "saff", KepNev = "faf" });
            ctx.Alaplapok.Add(
              new Alaplap { Id = 2, Nev = "Demo2", CpuFoglalat = "aa", AlaplapFormatum = "asffasfsaf", MaxFrekvencia = 1551, MemoriaTipusa = "sfsaaafsaf", Lapkakeszlet = "safsaff", SlotSzam = 4, Hangkartya = false, VideokartyaCsatlakozo = "saffff", KepNev = "fffaf" });
            ctx.SaveChanges();
        }
        public void FillTestDatabaseApplikacio(TestProjektContext ctx)
        {
            ctx.Applikaciok.Add(
                 new Applikacio { Id = 1, Nev = "Demo1", Tarhely = 5, Kepeleresiutja = "asfsaf", KatId = 1});
            ctx.Applikaciok.Add(
              new Applikacio { Id = 2, Nev = "Demo2", Tarhely = 10, Kepeleresiutja = "asffasfsaf", KatId = 2});
            ctx.SaveChanges();
        }
        public void FillTestDatabaseKategoria(TestProjektContext ctx)
        {
            ctx.Kategoriak.Add(
                 new Kategoria { Id = 1, Nev = "Demo1"});
            ctx.Kategoriak.Add(
              new Kategoria { Id = 2, Nev = "Demo2"});
            ctx.SaveChanges();
        }


        public void FillTestDatabase(TestProjektContext ctx)
        {

            ctx.Setupok.Add(
                new Setup { Id=1, Gp="min", VidkaId=1,ProcId=1,RamId=1,OpId=1,AlaplId=1,ApplikacioId=1});
            ctx.Setupok.Add(
              new Setup { Id = 2, Gp = "min", VidkaId = 1, ProcId = 2, RamId = 1, OpId = 1, AlaplId = 1, ApplikacioId = 1 });
            ctx.Setupok.Add(
              new Setup { Id = 3, Gp = "min", VidkaId = 2, ProcId = 1, RamId = 1, OpId = 1, AlaplId = 1, ApplikacioId = 1 });
            ctx.SaveChanges();
        }

        [TestMethod]
        public void Get_OsszSetup()
        {
            var ctx = new TestProjektContext();
            
            FillTestDatabaseVideokartya(ctx);
            FillTestDatabaseRam(ctx);
            FillTestDatabaseProcesszor(ctx);
            FillTestDatabaseOprendszer(ctx);
            FillTestDatabaseKategoria(ctx);
            FillTestDatabaseApplikacio(ctx);
            FillTestDatabaseAlaplap(ctx);
            FillTestDatabase(ctx);
            var controller = new SetupController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<SetupModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.ToList().Count());
        }
    }
}
