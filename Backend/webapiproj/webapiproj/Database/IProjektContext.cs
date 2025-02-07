using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using webapiproj.Models;
using System.Data.Entity;

namespace webapiproj.Database
{
    public interface IProjektContext
    {
        DbSet<Videokartya> Videokartyak { get; }
        DbSet<Setup> Setupok { get; }
        DbSet<Ram> Ramok { get; }
        DbSet<Profil> Profilok { get; }
        DbSet<Processzor> Processzorok { get; }
        DbSet<Operaciosrendszer> Oprendszerek { get; }
        DbSet<Kategoria> Kategoriak { get; }
        DbSet<Csatlakozo> Csatlakozok { get; }
        DbSet<Applikacio_Profil> Applikacio_Profilok { get; }
        DbSet<Applikacio> Applikaciok { get; }
        DbSet<Alaplap_Csatlakozo> Alaplap_Csatlakozok { get; }
        DbSet<Alaplap> Alaplapok { get; }

        int SaveChanges();
    }
}