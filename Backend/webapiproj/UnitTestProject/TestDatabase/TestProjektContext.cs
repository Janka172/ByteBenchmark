using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webapiproj.Database;
using System.Data.Entity;
using webapiproj.Models;

namespace UnitTestProject
{
    class TestProjektContext : IProjektContext
    {
        DbSet<Videokartya> Videokartyak { get; set; }
        DbSet<Setup> Setupok { get; set; }
        DbSet<Ram> Ramok { get; set; }
        DbSet<Profil> Profilok { get; set; }
        DbSet<Processzor> Processzorok { get; set; }
        DbSet<Operaciosrendszer> Operaciosrendszerek { get; set; }
        DbSet<Kategoria> Kategoriak { get; set; }
        DbSet<Csatlakozo> Csatlakozok { get; set; }
        DbSet<Applikacio_Profil> Applikacio_Profilok { get; set; }
        DbSet<Applikacio> Applikaciok { get; set; }
        DbSet<Alaplap_Csatlakozo> Alaplap_Csatlakozok { get; set; }
        DbSet<Alaplap> Alaplapok { get; set; }

        public TestProjektContext()
        {
            Videokartyak = new TestDbSet<Videokartya>();
            Setupok = new TestDbSet<Setup>();
            Ramok = new TestDbSet<Ram>();
            Profilok = new TestDbSet<Profil>();
            Processzorok = new TestDbSet<Processzor>();
            Operaciosrendszerek = new TestDbSet<Operaciosrendszer>();
            Kategoriak = new TestDbSet<Kategoria>();
            Csatlakozok = new TestDbSet<Csatlakozo>();
            Applikacio_Profilok = new TestDbSet<Applikacio_Profil>();
            Applikaciok = new TestDbSet<Applikacio>();
            Alaplap_Csatlakozok = new TestDbSet<Alaplap_Csatlakozo>();
            Alaplapok = new TestDbSet<Alaplap>();
        }

        public int SaveChanges()
        {
            return 0;
        }
    }
}
