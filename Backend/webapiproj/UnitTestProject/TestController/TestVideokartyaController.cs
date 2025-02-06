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

namespace UnitTestProject.TestController
{
   [TestClass]
   public class TestVideokartyaController
   {
       public void FillTestDatabase(TestProjektContext ctx)
       {
           ctx.Videokartyak.Add(
               new Videokartya { Id = 1, Nev="Demo1", AlaplapiCsatlakozas="Pci1",AjanlottTapegyseg=500,MonitorCsatlakozas="Valami,Valami2",ChipGyartoja="NVIIDA",Vram=5});
            ctx.Videokartyak.Add(
              new Videokartya { Id = 2, Nev = "Demo2", AlaplapiCsatlakozas = "Pci2", AjanlottTapegyseg = 400, MonitorCsatlakozas = "Valami,Valami2", ChipGyartoja = "MAS", Vram = 9 });
            ctx.Videokartyak.Add(
              new Videokartya { Id = 3, Nev = "Demo3", AlaplapiCsatlakozas = "Pci3", AjanlottTapegyseg = 550, MonitorCsatlakozas = "Valami,Valami2", ChipGyartoja = "NVIIDA", Vram = 5 });
            ctx.SaveChanges();
        }
       [TestMethod]
       public void Get_OsszVideokartya()
       {
            var ctx = new TestProjektContext();
            FillTestDatabase(ctx);
            var controller = new VideokartyaController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<List<VideokartyaModel>>;
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.Count);
       }
   }
       //public void Get_ShouldReturnAllCategories()
       //{
       //    var context = new TestProjektContext();
       //    context.Videokartyak.Add(new Category { Id = 1, Name = "Demo1" });
       //    context.Videokartyak.Add(new Category { Id = 2, Name = "Demo2" });
       //    context.Videokartyak.Add(new Category { Id = 3, Name = "Demo3" });

        //    var controller = new CategoriesController(context);
        //    var result = controller.Get();

        //    Assert.IsNotNull(result);
        //    Assert.AreEqual(3, result.Count());
        //}

        //[TestMethod]
        //public void Get_ShouldReturnSameCategory()
        //{
        //    var ctx = new TestMenuContext();
        //    ctx.Categories.Add(GetDemoCategory());

        //    var controller = new CategoriesController(ctx);
        //    var result = controller.Get(1);

        //    Assert.IsNotNull(result);
        //    Assert.AreEqual(1, result.Id);
        //}

        //[TestMethod]
        //public void Post_ShoulReturnSameCategory()
        //{
        //    var controller = new CategoriesController(new TestMenuContext());

        //    var category = GetDemoCategory();
        //    controller.Post(new CategoryModel { Name = category.Name });

        //    var res = controller.Get().Last();

        //    Assert.IsNotNull(res);
        //    Assert.AreEqual("Demo", res.Name);
        //}

        //[TestMethod]
        //public void Put_SuccessfulUpdate()
        //{
        //    var ctx = new TestMenuContext();
        //    var controller = new CategoriesController(ctx);
        //    ctx.Categories.Add(new Category { Id = 0, Name = "Demo0" });
        //    ctx.Categories.Add(new Category { Id = 1, Name = "Demo1" });
        //    ctx.Categories.Add(new Category { Id = 2, Name = "Demo2" });

        //    controller.Put(1, new CategoryModel { Name = "UpdatedDemo1" });

        //    var res1 = ctx.Categories.Where(x => x.Id == 1).FirstOrDefault();
        //    var res2 = ctx.Categories.Where(x => x.Name == "UpdatedDemo1");

        //    Assert.IsNotNull(res1);
        //    Assert.IsNotNull(res2);
        //    Assert.AreEqual(1, res2.Count());
        //    Assert.AreEqual("UpdatedDemo1", res1.Name);
        //}

        //[TestMethod]
        //public void Delete_SuccessfulDelete()
        //{
        //    var ctx = new TestMenuContext();
        //    var controller = new CategoriesController(ctx);
        //    ctx.Categories.Add(new Category { Id = 1, Name = "Demo1" });
        //    ctx.Categories.Add(new Category { Id = 2, Name = "Demo2" });

        //    controller.Delete(1);
        //    var res1 = ctx.Categories.Where(x => x.Id == 1).FirstOrDefault();
        //    var res2 = ctx.Categories.ToList();

        //    Assert.IsNull(res1);
        //    Assert.AreEqual(1, res2.Count);
        //}

        //public Category GetDemoCategory()
        //{
        //    return new Category { Id = 1, Name = "Demo" };
        //}
    //}
}
