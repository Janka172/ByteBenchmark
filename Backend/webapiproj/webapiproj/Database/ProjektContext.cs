using webapiproj.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Data.Entity.ModelConfiguration;
using webapiproj.Database;

namespace webapiproj
{
    
    public class ProjektContext:DbContext, IProjektContext
    {
        public DbSet<Alaplap>Alaplapok { get; set; }
        public DbSet<Applikacio>Applikaciok { get; set; }
        public DbSet<Kategoria>Kategoriak { get; set; }
        public DbSet<Operaciosrendszer>Oprendszerek { get; set; }
        public DbSet<Processzor>Processzorok { get; set; }
        public DbSet<Profil>Profilok { get; set; }
        public DbSet<Ram>Ramok { get; set; }
        public DbSet<Videokartya>Videokartyak { get; set; }
        public DbSet<Setup> Setupok { get; set; }
        public DbSet<Csatlakozo> Csatlakozok { get; set; }
        public DbSet<Alaplap_Csatlakozo> Alaplap_Csatlakozok { get; set; }
        public DbSet<Applikacio_Profil> Applikacio_Profilok { get; set; }
        

        public ProjektContext() : base("name=ProjektContext") { }

        public ProjektContext(DbConnection existingConnection, bool contextOwnsConnection)
                : base(existingConnection, contextOwnsConnection) { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            ////összetett kulcs beállitása a kapcsolotablahoz ACS
            modelBuilder.Entity<Alaplap_Csatlakozo>().HasKey(ac => new { ac.AlaplapId, ac.CsatlakozoId });
            base.OnModelCreating(modelBuilder);
            

            ////összetett kulcs beállitása a kapcsolotablahoz AP
            modelBuilder.Entity<Applikacio_Profil>().HasKey(ap => new { ap.AppId, ap.ProfilId });
            base.OnModelCreating(modelBuilder);

            //Videokartya osszetett mezo
            modelBuilder.Entity<Videokartya>()
                .HasIndex(v => new { v.Nev, v.Vram })
                .IsUnique()
                .HasName("Nev_Vram");
            base.OnModelCreating(modelBuilder);

            //Ram osszetett mezo
            modelBuilder.Entity<Ram>()
                .HasIndex(v => new { v.Nev, v.Frekvencia,v.Meret })
                .IsUnique()
                .HasName("Nev_Frekv_Meret");
            base.OnModelCreating(modelBuilder);
            //OS osszetett mezo
            modelBuilder.Entity<Operaciosrendszer>()
                .HasIndex(v => new { v.Nev, v.BuildSzam })
                .IsUnique()
                .HasName("Nev_Buildszam");
            base.OnModelCreating(modelBuilder);
            // setup osszetett mezo
            modelBuilder.Entity<Setup>()
                .HasIndex(v => new { v.ApplikacioId, v.Gp })
                .IsUnique()
                .HasName("ApplikacioId_Gp");
            base.OnModelCreating(modelBuilder);
        }

    }
   
}