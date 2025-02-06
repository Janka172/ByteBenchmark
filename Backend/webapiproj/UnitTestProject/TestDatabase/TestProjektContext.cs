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
    public class TestProjektContext : IProjektContext
    {
        public DbSet<Videokartya> Videokartyak { get; set; }
        public DbSet<Setup> Setupok { get; set; }
        public DbSet<Ram> Ramok { get; set; }
        public DbSet<Profil> Profilok { get; set; }
        public DbSet<Processzor> Processzorok { get; set; }
        public DbSet<Operaciosrendszer> Oprendszerek { get; set; }
        public DbSet<Kategoria> Kategoriak { get; set; }
        public DbSet<Csatlakozo> Csatlakozok { get; set; }
        public DbSet<Applikacio_Profil> Applikacio_Profilok { get; set; }
        public DbSet<Applikacio> Applikaciok { get; set; }
        public DbSet<Alaplap_Csatlakozo> Alaplap_Csatlakozok { get; set; }
        public DbSet<Alaplap> Alaplapok { get; set; }

        public TestProjektContext()
        {
            Videokartyak = new TestDbSet<Videokartya>();
            Setupok = new TestDbSet<Setup>();
            Ramok = new TestDbSet<Ram>();
            Profilok = new TestDbSet<Profil>();
            Processzorok = new TestDbSet<Processzor>();
            Oprendszerek = new TestDbSet<Operaciosrendszer>();
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
