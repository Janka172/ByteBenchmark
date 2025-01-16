-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Dec 12. 19:02
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

Drop Database If Exists byt_banchmark;
Create Database byt_banchmark
Default Character Set utf8
Collate utf8_hungarian_ci;

Use byt_banchmark;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `byt_banchmark`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alaplap`
--

CREATE TABLE `alaplap` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(120) NOT NULL,
  `CpuFoglalat` varchar(60) NOT NULL,
  `AlaplapFormatum` varchar(60) NOT NULL,
  `MaxFrekvencia` int(11) NOT NULL,
  `MemoriaTipusa` varchar(60) NOT NULL,
  `Lapkakeszlet` varchar(60) NOT NULL,
  `SlotSzam` int(11) NOT NULL,
  `Hangkartya` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alaplap_csatlakozok`
--

CREATE TABLE `alaplap_csatlakozok` (
  `CsatlakozoId` int(11) NOT NULL,
  `AlaplapId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `applikaciok`
--

CREATE TABLE `applikaciok` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(120) NOT NULL,
  `Tarhely` int(11) NOT NULL,
  `KatId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `applikaciok_profil`
--

CREATE TABLE `applikaciok_profil` (
  `AppId` int(11) NOT NULL,
  `ProfilId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `applikaciok_setup`
--

CREATE TABLE `applikaciok_setup` (
  `GP` varchar(60) NOT NULL,
  `AppId` int(11) NOT NULL,
  `SetupId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csatlakozok`
--

CREATE TABLE `csatlakozok` (
  `Id` int(11) NOT NULL,
  `Nev` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoria`
--

CREATE TABLE `kategoria` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `operaciosrendszer`
--

CREATE TABLE `operaciosrendszer` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(60) NOT NULL,
  `BuildSzam` varchar(120) NOT NULL,
  `Verzio` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `processzor`
--

CREATE TABLE `processzor` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(60) NOT NULL,
  `AlaplapFoglalat` varchar(60) NOT NULL,
  `SzalakSzama` int(11) NOT NULL,
  `TamogatottMemoriatipus` varchar(60) NOT NULL,
  `ProcesszormagokSzama` int(11) NOT NULL,
  `Gyarto` int(11) NOT NULL,
  `AjanlottTapegyseg` int(11) NOT NULL,
  `IntegraltVideokartya` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `profil`
--

CREATE TABLE `profil` (
  `Id` int(11) NOT NULL,
  `Felhasznalonev` varchar(120) NOT NULL,
  `Jogosultsag` int(11) NOT NULL,
  `Email` varchar(120) NOT NULL,
  `Jelszo` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ram`
--

CREATE TABLE `ram` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(60) NOT NULL,
  `MemoriaTipus` int(11) NOT NULL,
  `Frekvencia` int(11) NOT NULL,
  `Meret` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `setup`
--

CREATE TABLE `setup` (
  `Id` int(11) NOT NULL,
  `VidkaId` int(11) NOT NULL,
  `ProcId` int(11) NOT NULL,
  `RamId` int(11) NOT NULL,
  `OpId` int(11) NOT NULL,
  `AlaplId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `videokartya`
--

CREATE TABLE `videokartya` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(60) NOT NULL,
  `AlaplapiCsatlakozas` varchar(60) NOT NULL,
  `AjanlottTapegyseg` int(11) NOT NULL,
  `MonitorCsatlakozas` varchar(60) NOT NULL,
  `ChipGyartoja` varchar(60) NOT NULL,
  `Vram` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `alaplap`
--
ALTER TABLE `alaplap`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `applikaciok`
--
ALTER TABLE `applikaciok`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `csatlakozok`
--
ALTER TABLE `csatlakozok`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `kategoria`
--
ALTER TABLE `kategoria`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `operaciosrendszer`
--
ALTER TABLE `operaciosrendszer`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `processzor`
--
ALTER TABLE `processzor`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `setup`
--
ALTER TABLE `setup`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `videokartya`
--
ALTER TABLE `videokartya`
  ADD PRIMARY KEY (`Id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `alaplap`
--
ALTER TABLE `alaplap`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `applikaciok`
--
ALTER TABLE `applikaciok`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `csatlakozok`
--
ALTER TABLE `csatlakozok`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `operaciosrendszer`
--
ALTER TABLE `operaciosrendszer`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `processzor`
--
ALTER TABLE `processzor`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `profil`
--
ALTER TABLE `profil`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `ram`
--
ALTER TABLE `ram`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `setup`
--
ALTER TABLE `setup`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `videokartya`
--
ALTER TABLE `videokartya`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
