-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 03. 11:47
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `byt_banchmark`
--

DROP DATABASE IF EXISTS byt_banchmark;
CREATE DATABASE byt_banchmark
CHARACTER SET utf8
COLLATE utf8_hungarian_ci;
USE byt_banchmark;

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
  `Hangkartya` tinyint(1) NOT NULL,
  `VideokartyaCsatlakozo` varchar(60) NOT NULL,
  `kepnev` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `alaplap`
--

INSERT INTO `alaplap` (`Id`, `Nev`, `CpuFoglalat`, `AlaplapFormatum`, `MaxFrekvencia`, `MemoriaTipusa`, `Lapkakeszlet`, `SlotSzam`, `Hangkartya`, `VideokartyaCsatlakozo`, `kepnev`) VALUES
(1, 'ASUS PRIME Z890-P', 'LGA1851', 'ATX', 2800, 'DDR5', 'Intel Z890', 4, 1, '', ''),
(2, 'ASUS TUF GAMING B650M-PLUS WIFI', 'AM5', 'mATX (Micro ATX)', 2600, 'DDR5', 'AMD B650', 4, 1, '', ''),
(3, 'ASUS TUF GAMING B760M-PLUS WIFI D4', 'LGA1700', 'mATX (Micro ATX)', 1600, 'DDR4', 'Intel B760', 4, 1, '', ''),
(4, 'ASUS TUF GAMING B760M-BTF WIFI', 'LGA1700', 'mATX (Micro ATX)', 2800, 'DDR5', 'Intel B760', 4, 1, '', ''),
(5, 'ASUS TUF GAMING X870-PLUS WIFI', 'AM5', 'ATX', 2600, 'DDR5', 'AMD X870', 4, 1, '', ''),
(6, 'ASUS ROG MAXIMUS Z790', 'LGA1700', 'ATX', 2800, 'DDR5', 'Intel Z790', 4, 1, '', ''),
(7, 'ASUS ROG STRIX B650-A GAMING WIFI', 'AM5', 'ATX', 2600, 'DDR5', 'AMD B650', 4, 1, '', ''),
(8, 'ASUS ROG STRIX Z890-A GAMING WIFI', 'LGA1851', 'ATX', 2800, 'DDR5', 'Intel Z890', 4, 1, '', ''),
(9, 'ASUS ROG STRIX X870E-E GAMING WIFI', 'AM5', 'ATX', 2600, 'DDR5', 'AMD X870E', 4, 1, '', ''),
(10, 'ASUS ROG STRIX X870-F GAMING WIFI', 'AM5', 'ATX', 2600, 'DDR5', 'AMD X870', 4, 1, '', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alaplap_csatlakozo`
--

CREATE TABLE `alaplap_csatlakozo` (
  `CsatlakozoId` int(11) NOT NULL,
  `AlaplapId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `applikacio`
--

CREATE TABLE `applikacio` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(120) NOT NULL,
  `Tarhely` int(11) NOT NULL,
  `KatId` int(11) DEFAULT NULL,
  `Kepeleresiutja` varchar(340) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `applikacio`
--

INSERT INTO `applikacio` (`Id`, `Nev`, `Tarhely`, `KatId`, `Kepeleresiutja`) VALUES
(1, 'Star Stable Online', 30, 1, 'sso.jpg'),
(2, 'ARK: Survival Evolved', 60, 1, 'ark.jpg'),
(3, 'The Witcher 3', 50, 1, 'theWitcher3.jpg'),
(4, 'Grand Theft Auto V', 65, 1, 'gta5.jpg'),
(5, 'Red Dead Redemption 2', 120, 1, 'rdrd2.jpg'),
(6, 'Doom Eternal', 50, 1, 'doom.jpg'),
(7, 'Assassin\'s Creed Valhalla', 80, 1, 'acv.jpg'),
(8, 'Call of Duty: Warzone', 150, 1, 'cod.jpg'),
(9, 'Forza Horizon 5', 110, 1, 'forza.jpg'),
(10, 'Minecraft', 1, 1, 'minecraft.jpg'),
(11, 'League of Legends', 10, 1, 'lol.jpg'),
(12, 'Valorant', 20, 1, 'valorant.jpg'),
(13, 'Cyberpunk 2077', 70, 1, 'cyberpunk.jpg'),
(14, 'Google Chrome', 100, 2, 'chrome.jpg'),
(15, 'Mozilla Firefox', 80, 2, 'firefox.jpg'),
(16, 'Microsoft Edge', 90, 2, 'edge.png'),
(17, 'Opera', 70, 2, 'opera.png'),
(18, 'Safari', 120, 2, 'safari.png'),
(19, 'Adobe Premiere Pro', 2000, 3, 'adobe.jpg'),
(20, 'Final Cut Pro', 2500, 3, 'finalcut.png'),
(21, 'DaVinci Resolve', 3000, 3, 'dvr.jpg'),
(22, 'Sony Vegas Pro', 1500, 3, 'svp.jpg'),
(23, 'HitFilm Express', 1000, 3, 'hitfilm.jpg'),
(24, 'Adobe Photoshop', 2000, 4, 'aph.jpg'),
(25, 'GIMP', 500, 4, 'gimp.jpg'),
(26, 'CorelDRAW', 1500, 4, 'corel.jpg'),
(27, 'Affinity Photo', 1000, 4, 'affiph.jpg'),
(28, 'Paint.NET', 200, 4, 'paintnet.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `applikacio_profil`
--

CREATE TABLE `applikacio_profil` (
  `AppId` int(11) NOT NULL,
  `ProfilId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csatlakozo`
--

CREATE TABLE `csatlakozo` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `csatlakozo`
--

INSERT INTO `csatlakozo` (`Id`, `Nev`) VALUES
(1, 'sata'),
(2, 'usb');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoria`
--

CREATE TABLE `kategoria` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kategoria`
--

INSERT INTO `kategoria` (`Id`, `Nev`) VALUES
(2, 'Böngésző'),
(1, 'Játék'),
(4, 'Képszerkesztő'),
(3, 'Videószerkesztő');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `operaciosrendszer`
--

CREATE TABLE `operaciosrendszer` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(60) NOT NULL,
  `BuildSzam` varchar(120) NOT NULL,
  `Verzio` varchar(120) NOT NULL,
  `kepnev` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `operaciosrendszer`
--

INSERT INTO `operaciosrendszer` (`Id`, `Nev`, `BuildSzam`, `Verzio`, `kepnev`) VALUES
(1, 'Windows 10', '19041', '20H2', ''),
(2, 'Windows 11', '22000', '21H2', ''),
(3, 'Ubuntu', '20.04', 'Focal Fossa', ''),
(4, 'macOS', '11.0', 'Big Sur', ''),
(5, 'Linux Mint', '20.1', 'Ulyssa', '');

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
  `IntegraltVideokartya` tinyint(1) NOT NULL,
  `ProcesszorFrekvencia` double NOT NULL,
  `BFrekvencia` int(11) NOT NULL,
  `kepnev` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `processzor`
--

INSERT INTO `processzor` (`Id`, `Nev`, `AlaplapFoglalat`, `SzalakSzama`, `TamogatottMemoriatipus`, `ProcesszormagokSzama`, `Gyarto`, `AjanlottTapegyseg`, `IntegraltVideokartya`, `ProcesszorFrekvencia`, `BFrekvencia`, `kepnev`) VALUES
(1, 'Ryzen 3 1200', 'AM4', 4, 'DDR4', 4, 0, 65, 0, 3.1, 3, ''),
(2, 'Ryzen 3 1300X', 'AM4', 4, 'DDR4', 4, 0, 65, 0, 3.5, 4, ''),
(3, 'Ryzen 5 1400', 'AM4', 8, 'DDR4', 4, 0, 65, 0, 3.2, 3, ''),
(4, 'Ryzen 5 1500X', 'AM4', 8, 'DDR4', 4, 0, 65, 0, 3.5, 4, ''),
(5, 'Ryzen 5 1600', 'AM4', 12, 'DDR4', 6, 0, 65, 0, 3.2, 4, ''),
(6, 'Ryzen 5 PRO 8600G', 'AM5', 12, 'DDR5', 6, 0, 65, 1, 4.3, 5, ''),
(7, 'Ryzen 7 PRO 8840U', 'FP7/FP7r2', 16, 'DDR5/LPDDR5X', 8, 0, 28, 1, 3.3, 5, ''),
(8, 'Ryzen AI 9 HX 370', 'FP8', 24, 'DDR5/LPDDR5X', 12, 0, 28, 1, 3.3, 5, ''),
(9, 'Ryzen 9 9900X', 'AM5', 24, 'DDR5', 12, 0, 120, 1, 4.4, 6, ''),
(10, 'Ryzen 7 9800X3D', 'AM5', 16, 'DDR5', 8, 0, 120, 1, 4.7, 5, '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `profil`
--

CREATE TABLE `profil` (
  `Id` int(11) NOT NULL,
  `Felhasznalonev` varchar(120) NOT NULL,
  `Jogosultsag` int(11) NOT NULL,
  `Email` varchar(120) NOT NULL,
  `Tema` varchar(10) NOT NULL,
  `LogoEleresiUtja` varchar(255) NOT NULL,
  `Jelszo` blob NOT NULL,
  `JelszoUjra` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `profil`
--

INSERT INTO `profil` (`Id`, `Felhasznalonev`, `Jogosultsag`, `Email`, `Tema`, `LogoEleresiUtja`, `Jelszo`, `JelszoUjra`) VALUES
(1, 'admin', 0, 'ímél', 'light', 'profil.hiany.jpg', '', ''),
(2, 'Felhi', 0, 'user1@example.com', 'string', 'profil.hiany.jpg', '', ''),
(3, 'Igen', 0, 'user2@example.com', 'light', 'profil.hiany.jpg', '', ''),
(4, 'FelhSok', 0, 'user3@example.com', 'dark', 'profil.hiany.jpg', '', ''),
(5, 'NincsNeve', 0, 'user4@example.com', 'light', 'profil.hiany.jpg', '', ''),
(6, 'Postas Feri', 0, 'postas@gmail.com', 'black', 'profil.hiany.jpg', 0x46657269, 0x46657269),
(7, 'Mate', 0, 'mateszabo9784@gmail.com', 'string', 'profil.hiany.jpg', 0xf0959242684a1bed959c797e85497e6a1bd81cc24267f8f8ab3efac2858870bb0cd40592da86a0fb920db47263e6990864f131f8860fead2a918726f85bf294c66c6941f7a379f887079e4921bf9761ae91100dde5770c5a55ade70e602fe161c7ead67e7f246fdf7896db6ce0123dc62740d0c6ef757a3910c4fc37f956334b, 0xdc0df50ba01983c449b13fa0f31f372097f22b6045acb375e7f1331dfe2ae679082bdd7602fc5525c3016ce58dee3d9707c7d10d1a06c3e5c539d2c6053cb56f),
(8, 'MateHun130', 0, 'mateszabo789@gmail.com', 'string', 'profil.hiany.jpg', 0xe7d0335528f04f58c85bf80a02e35ef272f6ace21d0847f0a9d030b821cd2b2505a090ceae609379e86040cd18fb455e82c74846a69dd4b59b45c1909a9ca90e9e9c10aa018d88d35810cce66d0bfec4b40983d641e5f16072c4bcd5ac40783645d2c4e3213cd407faae9cce0fbf05b8f177defd6f3851000fb0c62c7bb9df2d, 0x14941aba4f82847b9e25dc5482ea8f74908ddffe8bfd85c990ddf438597a484fa9cdd2ba48bfe3b6dacc1dd257439d6cad08bc570b8c1e13b33895bdad21ef04),
(9, 'Janka', 1, 'jankahegedus872@gmail.com', 'dark', 'EzKbEnVagyok.jpg', 0x9031b956e35bb5f402a8fc3f2b33f3fd44177669a964136b40f6a7ce9f201256be5ae8046903efddd96d5fc2f0bf2f58f8c479459c9511b5b1c4b1dadaaaa97ea8f6c1b36bd007324470df06df3b45e6eca87842c0eaf2a6b3634e964811086e48f2b6885b8be5ef6a11f7c24de91e2526b866c1d445f1761d0ed47d7a3ac6b3, 0xdbb25e6fc9f00f4ecea668b920bd469ca4315c0cd4b42ba8447ebc645395a9ae76c8da5c6baf887ddff99321b6fcdc529dae4e6d66e4396948ffa484685c0815),
(10, 'JankaV', 1, 'jankahegedus172@gmail.com', 'light', 'enVagyok.png', 0x06a33bed8a49152c6017121725110c5f12657f506612e42869da14be727d2de24c5e292b51a78e403428bca880f5b4cc1ba2395b74f7bfcb88fbe314301c2c015eed5651238e11e6159ade69b22eec24098282806350328ef0fa0b3683261f5ca0649ec0fa5548168a4dd0f9c6e0a98fbc08c696ee91ea31722d4fd9ef5571e8, 0x09d4f9faf3c8e7e2538f147869785fc6d6451339f3693349ece9f086d01f6b324a43f37cb44e774569faf896a42cbb4b05bc20da09bc6ab22c9e17ff85289d26);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ram`
--

CREATE TABLE `ram` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(60) NOT NULL,
  `MemoriaTipus` varchar(11) NOT NULL,
  `Frekvencia` double NOT NULL,
  `Meret` int(11) NOT NULL,
  `kepnev` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ram`
--

INSERT INTO `ram` (`Id`, `Nev`, `MemoriaTipus`, `Frekvencia`, `Meret`, `kepnev`) VALUES
(1, 'Kingston FURY Renegade Pro', 'DDR5', 2400, 16, ''),
(2, 'Kingston FURY Renegade Pro', 'DDR5', 2800, 32, ''),
(3, 'Kingston FURY Renegade Pro', 'DDR5', 3000, 64, ''),
(4, 'Kingston FURY Renegade Pro', 'DDR5', 3200, 128, ''),
(5, 'Kingston FURY Renegade Pro', 'DDR5', 3400, 256, ''),
(6, 'Kingston FURY Impact', 'DDR4', 1333, 8, ''),
(7, 'Kingston FURY Impact', 'DDR4', 1333, 16, ''),
(8, 'Kingston FURY Impact', 'DDR4', 1600, 16, ''),
(9, 'Kingston FURY Impact', 'DDR4', 1600, 32, ''),
(10, 'Kingston FURY Renegade', 'DDR4', 1600, 8, ''),
(11, 'Kingston FURY Renegade', 'DDR4', 1800, 16, ''),
(12, 'Kingston FURY Renegade', 'DDR4', 2000, 8, ''),
(13, 'Kingston FURY Renegade', 'DDR4', 2133, 32, ''),
(14, 'Kingston FURY Renegade', 'DDR4', 2300, 32, ''),
(15, 'Kingston FURY Renegade', 'DDR4', 2400, 16, ''),
(16, 'Kingston FURY Renegade', 'DDR4', 2666, 16, ''),
(17, 'Kingston FURY Beast RGB', 'DDR4', 1333, 4, ''),
(18, 'Kingston FURY Beast RGB', 'DDR4', 1600, 4, ''),
(19, 'Kingston FURY Beast RGB', 'DDR4', 1800, 8, ''),
(20, 'Kingston FURY Beast RGB', 'DDR4', 1866, 8, ''),
(21, 'Kingston FURY Beast RGB', 'DDR4', 1866, 16, ''),
(22, 'Kingston FURY Impact', 'DDR5', 2400, 8, ''),
(23, 'Kingston FURY Impact', 'DDR5', 2400, 16, ''),
(24, 'Kingston FURY Impact', 'DDR5', 2800, 16, ''),
(25, 'Kingston FURY Impact', 'DDR5', 2800, 32, ''),
(26, 'Kingston FURY Impact', 'DDR5', 3000, 16, ''),
(27, 'Kingston FURY Impact', 'DDR5', 3200, 16, ''),
(28, 'Kingston FURY Renegade', 'DDR5', 3000, 48, ''),
(29, 'Kingston FURY Renegade', 'DDR5', 3200, 48, ''),
(30, 'Kingston FURY Renegade', 'DDR5', 3400, 16, ''),
(31, 'Kingston FURY Renegade', 'DDR5', 3600, 16, ''),
(32, 'Kingston FURY Renegade', 'DDR5', 3800, 16, ''),
(33, 'Kingston FURY Renegade', 'DDR5', 8000, 16, ''),
(34, 'Kingston FURY Renegade', 'DDR5', 4200, 24, '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `setup`
--

CREATE TABLE `setup` (
  `Id` int(11) NOT NULL,
  `VidkaId` int(11) DEFAULT NULL,
  `ProcId` int(11) DEFAULT NULL,
  `RamId` int(11) DEFAULT NULL,
  `OpId` int(11) DEFAULT NULL,
  `AlaplId` int(11) DEFAULT NULL,
  `ApplikacioId` int(11) NOT NULL,
  `Gp` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `setup`
--

INSERT INTO `setup` (`Id`, `VidkaId`, `ProcId`, `RamId`, `OpId`, `AlaplId`, `ApplikacioId`, `Gp`) VALUES
(1, 21, 1, 6, 1, 1, 1, 'min'),
(2, 42, 5, 16, 2, 2, 1, 'opt'),
(3, 13, 5, 16, 2, 2, 13, 'min'),
(4, 18, 9, 30, 2, 5, 13, 'opt'),
(5, 10, 4, 8, 1, 1, 3, 'min'),
(6, 15, 6, 16, 2, 3, 3, 'opt'),
(7, 12, 4, 8, 1, 1, 4, 'min'),
(8, 17, 7, 16, 2, 4, 4, 'opt'),
(9, 14, 5, 8, 1, 2, 5, 'min'),
(10, 19, 8, 32, 2, 6, 5, 'opt'),
(11, 11, 3, 1, 1, 1, 6, 'min'),
(12, 16, 5, 12, 2, 2, 6, 'opt'),
(13, 30, 1, 6, 1, 1, 14, 'min'),
(14, 30, 1, 8, 1, 1, 15, 'min'),
(15, 30, 1, 8, 1, 1, 16, 'min'),
(16, 30, 1, 6, 1, 1, 17, 'min'),
(17, 30, 1, 8, 1, 1, 18, 'min'),
(18, 33, 4, 16, 1, 1, 19, 'min'),
(19, 34, 5, 32, 2, 2, 20, 'min'),
(20, 36, 6, 32, 1, 3, 21, 'min'),
(21, 36, 4, 16, 1, 3, 22, 'min'),
(22, 35, 5, 16, 1, 4, 23, 'min'),
(23, 32, 3, 16, 1, 1, 24, 'min'),
(24, 32, 2, 8, 1, 1, 25, 'min'),
(25, 34, 5, 16, 1, 2, 26, 'min'),
(26, 33, 4, 8, 1, 3, 27, 'min'),
(27, 31, 3, 8, 1, 1, 28, 'min'),
(28, 31, 4, 16, 1, 1, 14, 'opt'),
(29, 32, 4, 16, 1, 1, 15, 'opt'),
(30, 33, 4, 16, 1, 1, 16, 'opt'),
(31, 32, 3, 8, 1, 1, 17, 'opt'),
(32, 33, 4, 16, 1, 1, 18, 'opt'),
(33, 37, 6, 2, 1, 1, 19, 'opt'),
(34, 38, 6, 3, 2, 2, 20, 'opt'),
(35, 39, 6, 3, 1, 3, 21, 'opt'),
(36, 38, 5, 2, 1, 3, 22, 'opt'),
(37, 40, 6, 2, 1, 4, 23, 'opt'),
(38, 36, 6, 32, 1, 1, 24, 'opt'),
(39, 37, 4, 16, 1, 1, 25, 'opt'),
(40, 39, 6, 32, 1, 2, 26, 'opt'),
(41, 40, 6, 32, 1, 3, 27, 'opt'),
(42, 38, 5, 16, 1, 1, 28, 'opt'),
(43, 35, 5, 16, 1, 1, 7, 'min'),
(44, 36, 5, 16, 1, 2, 8, 'min'),
(45, 34, 4, 16, 1, 3, 9, 'min'),
(46, 30, 2, 8, 1, 1, 10, 'min'),
(47, 31, 3, 8, 1, 1, 11, 'min'),
(48, 31, 3, 8, 1, 1, 12, 'min'),
(50, 38, 7, 32, 1, 1, 7, 'opt'),
(51, 39, 7, 32, 1, 2, 8, 'opt'),
(52, 39, 6, 32, 1, 3, 9, 'opt'),
(53, 33, 4, 16, 1, 1, 10, 'opt'),
(54, 32, 4, 16, 1, 1, 11, 'opt'),
(55, 32, 4, 16, 1, 1, 12, 'opt'),
(56, 1, 1, 6, 1, 7, 2, 'min'),
(57, 4, 5, 8, 1, 7, 2, 'opt');

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
  `Vram` int(11) NOT NULL,
  `kepnev` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `videokartya`
--

INSERT INTO `videokartya` (`Id`, `Nev`, `AlaplapiCsatlakozas`, `AjanlottTapegyseg`, `MonitorCsatlakozas`, `ChipGyartoja`, `Vram`, `kepnev`) VALUES
(1, 'GeForce RTX 3050', 'PCIe', 550, 'HDMI, DisplayPort', 'NVIDIA', 8, ''),
(2, 'GeForce RTX 3050', 'PCIe', 300, 'HDMI, DisplayPort', 'NVIDIA', 6, ''),
(3, 'GeForce RTX 3060', 'PCIe', 550, 'HDMI, DisplayPort', 'NVIDIA', 12, ''),
(4, 'GeForce RTX 3060', 'PCIe', 550, 'HDMI, DisplayPort', 'NVIDIA', 8, ''),
(5, 'GeForce RTX 3060 Ti', 'PCIe', 600, 'HDMI, DisplayPort', 'NVIDIA', 8, ''),
(6, 'GeForce RTX 3070', 'PCIe', 650, 'HDMI, DisplayPort', 'NVIDIA', 8, ''),
(7, 'GeForce RTX 3070 Ti', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 8, ''),
(8, 'GeForce RTX 3080', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 12, ''),
(9, 'GeForce RTX 3080', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 10, ''),
(10, 'GeForce RTX 3080 Ti', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 12, ''),
(11, 'GeForce RTX 3090', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 24, ''),
(12, 'GeForce RTX 3090 Ti', 'PCIe', 850, 'HDMI, DisplayPort', 'NVIDIA', 24, ''),
(13, 'GeForce RTX 4060', 'PCIe', 550, 'HDMI, DisplayPort', 'NVIDIA', 8, ''),
(14, 'GeForce RTX 4060 Ti', 'PCIe', 550, 'HDMI, DisplayPort', 'NVIDIA', 16, ''),
(15, 'GeForce RTX 4070', 'PCIe', 650, 'HDMI, DisplayPort', 'NVIDIA', 12, ''),
(16, 'GeForce RTX 4070 Ti', 'PCIe', 700, 'HDMI, DisplayPort', 'NVIDIA', 12, ''),
(17, 'GeForce RTX 4070 SUPER', 'PCIe', 650, 'HDMI, DisplayPort', 'NVIDIA', 12, ''),
(18, 'GeForce RTX 4080', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 16, ''),
(19, 'GeForce RTX 4080 SUPER', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 16, ''),
(20, 'GeForce RTX 4090', 'PCIe', 850, 'HDMI, DisplayPort', 'NVIDIA', 24, ''),
(21, 'Radeon RX 5300', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 4, ''),
(22, 'Radeon RX 5300 XT', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 4, ''),
(23, 'Radeon RX 5500', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 4, ''),
(24, 'Radeon RX 5500 XT', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 4, ''),
(25, 'Radeon RX 5500 XT', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 8, ''),
(26, 'Radeon RX 5600', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 6, ''),
(27, 'Radeon RX 5600 XT', 'PCIe', 450, 'HDMI, DisplayPort', 'AMD', 6, ''),
(28, 'Radeon RX 5700', 'PCIe', 600, 'HDMI, DisplayPort', 'AMD', 8, ''),
(29, 'Radeon RX 5700 XT', 'PCIe', 600, 'HDMI, DisplayPort', 'AMD', 8, ''),
(30, 'Radeon RX 6400', 'PCIe', 350, 'HDMI, DisplayPort', 'AMD', 4, ''),
(31, 'Radeon RX 6500 XT', 'PCIe', 400, 'HDMI, DisplayPort', 'AMD', 8, ''),
(32, 'Radeon RX 6600', 'PCIe', 450, 'HDMI, DisplayPort', 'AMD', 8, ''),
(33, 'Radeon RX 6600 XT', 'PCIe', 500, 'HDMI, DisplayPort', 'AMD', 8, ''),
(34, 'Radeon RX 6650 XT', 'PCIe', 500, 'HDMI, DisplayPort', 'AMD', 8, ''),
(35, 'Radeon RX 6700', 'PCIe', 600, 'HDMI, DisplayPort', 'AMD', 10, ''),
(36, 'Radeon RX 6700 XT', 'PCIe', 650, 'HDMI, DisplayPort', 'AMD', 12, ''),
(37, 'Radeon RX 6750 XT', 'PCIe', 650, 'HDMI, DisplayPort', 'AMD', 12, ''),
(38, 'Radeon RX 6800', 'PCIe', 650, 'HDMI, DisplayPort, USB-C', 'AMD', 16, ''),
(39, 'Radeon RX 6800 XT', 'PCIe', 750, 'HDMI, DisplayPort, USB-C', 'AMD', 16, ''),
(40, 'Radeon RX 6900 XT', 'PCIe', 850, 'HDMI, DisplayPort, USB-C', 'AMD', 16, ''),
(41, 'Radeon RX 6950 XT', 'PCIe', 850, 'HDMI, DisplayPort', 'AMD', 16, ''),
(42, 'Radeon RX 7600', 'PCIe', 550, 'HDMI, DisplayPort', 'AMD', 8, ''),
(43, 'Radeon RX 7600 XT', 'PCIe', 600, 'HDMI, DisplayPort', 'AMD', 16, ''),
(44, 'Radeon RX 7700 XT', 'PCIe', 700, 'HDMI, DisplayPort', 'AMD', 12, ''),
(45, 'Radeon RX 7800 XT', 'PCIe', 700, 'HDMI, DisplayPort', 'AMD', 16, ''),
(46, 'Radeon RX 7900 GRE', 'PCIe', 800, 'HDMI, DisplayPort, USB-C', 'AMD', 16, ''),
(47, 'Radeon RX 7900 XT', 'PCIe', 750, 'HDMI, DisplayPort, USB-C', 'AMD', 20, ''),
(48, 'Radeon RX 7900 XTX', 'PCIe', 800, 'HDMI, DisplayPort, USB-C', 'AMD', 24, '');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `alaplap`
--
ALTER TABLE `alaplap`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `unique_Nev` (`Nev`);

--
-- A tábla indexei `alaplap_csatlakozo`
--
ALTER TABLE `alaplap_csatlakozo`
  ADD KEY `fk_AlaplapId` (`AlaplapId`),
  ADD KEY `fk_CsatlakozoId` (`CsatlakozoId`);

--
-- A tábla indexei `applikacio`
--
ALTER TABLE `applikacio`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `unique_Nev` (`Nev`),
  ADD KEY `KatId` (`KatId`);

--
-- A tábla indexei `applikacio_profil`
--
ALTER TABLE `applikacio_profil`
  ADD KEY `AppId` (`AppId`),
  ADD KEY `ProfilId` (`ProfilId`);

--
-- A tábla indexei `csatlakozo`
--
ALTER TABLE `csatlakozo`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Nev` (`Nev`);

--
-- A tábla indexei `kategoria`
--
ALTER TABLE `kategoria`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `unique_Nev` (`Nev`);

--
-- A tábla indexei `operaciosrendszer`
--
ALTER TABLE `operaciosrendszer`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UQ_OP_Nev_Buildszam` (`Nev`,`BuildSzam`);

--
-- A tábla indexei `processzor`
--
ALTER TABLE `processzor`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `unique_Nev` (`Nev`);

--
-- A tábla indexei `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `unique_Nev` (`Email`),
  ADD UNIQUE KEY `unique_Felhasznalonev` (`Felhasznalonev`);

--
-- A tábla indexei `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UQ_Ram_Nev_Frekvencia_Meret` (`Nev`,`Frekvencia`,`Meret`);

--
-- A tábla indexei `setup`
--
ALTER TABLE `setup`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `unique_applikacio_gp` (`ApplikacioId`,`Gp`),
  ADD KEY `VidkaId` (`VidkaId`),
  ADD KEY `ProcId` (`ProcId`),
  ADD KEY `RamId` (`RamId`),
  ADD KEY `OpId` (`OpId`),
  ADD KEY `AlaplId` (`AlaplId`),
  ADD KEY `ApplikacioId` (`ApplikacioId`);

--
-- A tábla indexei `videokartya`
--
ALTER TABLE `videokartya`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `unique_nev_vram` (`Nev`,`Vram`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `alaplap`
--
ALTER TABLE `alaplap`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT a táblához `applikacio`
--
ALTER TABLE `applikacio`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT a táblához `csatlakozo`
--
ALTER TABLE `csatlakozo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `operaciosrendszer`
--
ALTER TABLE `operaciosrendszer`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `processzor`
--
ALTER TABLE `processzor`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `profil`
--
ALTER TABLE `profil`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `ram`
--
ALTER TABLE `ram`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT a táblához `setup`
--
ALTER TABLE `setup`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT a táblához `videokartya`
--
ALTER TABLE `videokartya`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `alaplap_csatlakozo`
--
ALTER TABLE `alaplap_csatlakozo`
  ADD CONSTRAINT `fk_AlaplapId` FOREIGN KEY (`AlaplapId`) REFERENCES `alaplap` (`Id`),
  ADD CONSTRAINT `fk_CsatlakozoId` FOREIGN KEY (`CsatlakozoId`) REFERENCES `csatlakozo` (`Id`);

--
-- Megkötések a táblához `applikacio`
--
ALTER TABLE `applikacio`
  ADD CONSTRAINT `applikacio_ibfk_1` FOREIGN KEY (`KatId`) REFERENCES `kategoria` (`Id`);

--
-- Megkötések a táblához `applikacio_profil`
--
ALTER TABLE `applikacio_profil`
  ADD CONSTRAINT `applikacio_profil_ibfk_1` FOREIGN KEY (`ProfilId`) REFERENCES `profil` (`Id`),
  ADD CONSTRAINT `applikacio_profil_ibfk_2` FOREIGN KEY (`AppId`) REFERENCES `applikacio` (`Id`);

--
-- Megkötések a táblához `setup`
--
ALTER TABLE `setup`
  ADD CONSTRAINT `fk_applikacio` FOREIGN KEY (`ApplikacioId`) REFERENCES `applikacio` (`Id`),
  ADD CONSTRAINT `setup_ibfk_1` FOREIGN KEY (`VidkaId`) REFERENCES `videokartya` (`Id`),
  ADD CONSTRAINT `setup_ibfk_2` FOREIGN KEY (`ProcId`) REFERENCES `processzor` (`Id`),
  ADD CONSTRAINT `setup_ibfk_3` FOREIGN KEY (`RamId`) REFERENCES `ram` (`Id`),
  ADD CONSTRAINT `setup_ibfk_4` FOREIGN KEY (`OpId`) REFERENCES `operaciosrendszer` (`Id`),
  ADD CONSTRAINT `setup_ibfk_5` FOREIGN KEY (`AlaplId`) REFERENCES `alaplap` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
