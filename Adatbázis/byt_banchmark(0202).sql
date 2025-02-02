-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 02. 12:27
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
CREATE DATABASE byt_banchmark CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

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
  `Hangkartya` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `alaplap`
--

INSERT INTO `alaplap` (`Id`, `Nev`, `CpuFoglalat`, `AlaplapFormatum`, `MaxFrekvencia`, `MemoriaTipusa`, `Lapkakeszlet`, `SlotSzam`, `Hangkartya`) VALUES
(111, 'ASUS PRIME Z890-P', 'LGA1851', 'ATX', 2800, 'DDR5', 'Intel Z890', 4, 1),
(112, 'ASUS TUF GAMING B650M-PLUS WIFI', 'AM5', 'mATX (Micro ATX)', 2600, 'DDR5', 'AMD B650', 4, 1),
(113, 'ASUS TUF GAMING B760M-PLUS WIFI D4', 'LGA1700', 'mATX (Micro ATX)', 1600, 'DDR4', 'Intel B760', 4, 1),
(114, 'ASUS TUF GAMING B760M-BTF WIFI', 'LGA1700', 'mATX (Micro ATX)', 2800, 'DDR5', 'Intel B760', 4, 1),
(115, 'ASUS TUF GAMING X870-PLUS WIFI', 'AM5', 'ATX', 2600, 'DDR5', 'AMD X870', 4, 1),
(116, 'ASUS ROG MAXIMUS Z790', 'LGA1700', 'ATX', 2800, 'DDR5', 'Intel Z790', 4, 1),
(117, 'ASUS ROG STRIX B650-A GAMING WIFI', 'AM5', 'ATX', 2600, 'DDR5', 'AMD B650', 4, 1),
(118, 'ASUS ROG STRIX Z890-A GAMING WIFI', 'LGA1851', 'ATX', 2800, 'DDR5', 'Intel Z890', 4, 1),
(119, 'ASUS ROG STRIX X870E-E GAMING WIFI', 'AM5', 'ATX', 2600, 'DDR5', 'AMD X870E', 4, 1),
(120, 'ASUS ROG STRIX X870-F GAMING WIFI', 'AM5', 'ATX', 2600, 'DDR5', 'AMD X870', 4, 1),
(121, 'ASUS PRIME B660M-A WIFI D4', 'LGA1700', 'mATX (Micro ATX)', 1600, 'DDR4', 'Intel B660', 4, 1),
(122, 'ASUS PRIME Z790M-PLUS D4', 'LGA1700', 'mATX (Micro ATX)', 1600, 'DDR4', 'Intel Z790', 4, 1),
(123, 'ASUS PRIME Z790-P WIFI D4', 'LGA1700', 'ATX', 1600, 'DDR4', 'Intel Z790', 4, 1),
(124, 'ASUS PRIME Z790M-PLUS', 'LGA1700', 'mATX (Micro ATX)', 2800, 'DDR5', 'Intel Z790', 4, 1),
(125, 'ASUS ROG MAXIMUS Z890 APEX', 'LGA1851', 'ATX', 2800, 'DDR5', 'Intel Z890', 2, 1),
(126, 'MSI MAG X570S TORPEDO MAX', 'AM4', 'ATX', 3200, 'DDR4', 'AMD X570', 4, 1),
(127, 'MSI MAG Z690 TOMAHAWK WIFI', 'LGA1700', 'ATX', 5600, 'DDR5', 'Intel Z690', 4, 1),
(128, 'MSI MAG Z690 TORPEDO EK X', 'LGA1700', 'ATX', 5600, 'DDR5', 'Intel Z690', 4, 1),
(129, 'MSI MAG Z790 TOMAHAWK MAX WIFI', 'LGA1700', 'ATX', 5600, 'DDR5', 'Intel Z790', 4, 1),
(130, 'MSI MEG X870E GODLIKE', 'AM5', 'E-ATX', 2800, 'DDR5', 'AMD X870E', 4, 1),
(131, 'MSI MEG X570S UNIFY-X MAX', 'AM4', 'ATX', 3200, 'DDR4', 'AMD X570', 2, 1),
(132, 'MSI MEG B550 UNIFY-X', 'AM4', 'ATX', 3200, 'DDR4', 'AMD B550', 2, 1),
(133, 'MSI MAG Z790 TOMAHAWK WIFI DDR4', 'LGA1700', 'ATX', 3200, 'DDR4', 'Intel Z790', 4, 1),
(134, 'MSI PRO B760-VC', 'LGA1700', 'ATX', 5600, 'DDR5', 'Intel B760', 4, 1),
(135, 'MSI PRO B760-P DDR4', 'LGA1700', 'ATX', 3200, 'DDR4', 'Intel B760', 4, 1),
(136, 'MSI PRO B660M-G DDR4', 'LGA1700', 'mATX (Micro ATX)', 3200, 'DDR4', 'Intel B660', 2, 1),
(137, 'MSI Z890 GAMING PLUS WIFI', 'LGA1851', 'ATX', 3200, 'DDR5', 'Intel Z890', 4, 1),
(138, 'MSI Z790-S01', 'LGA1700', 'ATX', 3800, 'DDR5', 'Intel Z790', 4, 1),
(139, 'MSI PRO H610M-B DDR4', 'LGA1700', 'mATX (Micro ATX)', 3200, 'DDR4', 'Intel H610', 2, 1),
(140, 'MSI PRO H610M-C EX', 'LGA1700', 'mATX (Micro ATX)', 5600, 'DDR5', 'Intel H610', 2, 1),
(141, 'Z890 AORUS XTREME AI TOP', 'LGA1851', 'E-ATX', 3200, 'DDR5', 'Intel Z890', 4, 1),
(142, 'Z890 AORUS PRO ICE', 'LGA1851', 'ATX', 3200, 'DDR5', 'Intel Z890', 4, 1),
(143, 'Z890 AORUS ELITE WIFI7 ICE', 'LGA1851', 'ATX', 3200, 'DDR5', 'Intel Z890', 4, 1),
(144, 'X870E AORUS PRO ICE', 'AM5', 'ATX', 2600, 'DDR5', 'AMD X870E', 4, 1),
(145, 'X870E AORUS ELITE WIFI7', 'AM5', 'E-ATX', 2400, 'DDR5', 'Intel Z790', 2, 1),
(146, 'Z790 AORUS TACHYON X', 'LGA1700', 'E-ATX', 2400, 'DDR5', 'Intel Z790', 2, 1),
(147, 'GIGABYTE H410M S2 V2', 'LGA1200', 'mATX (Micro ATX)', 2933, 'DDR4', 'Intel H470', 2, 1),
(148, 'Z790M AORUS ELITE', 'LGA1700', 'mATX (Micro ATX)', 2400, 'DDR5', 'Intel Z790', 4, 1),
(149, 'B760M AORUS ELITE AX', 'LGA1700', 'mATX (Micro ATX)', 2400, 'DDR5', 'Intel B760', 4, 1),
(150, 'GIGABYTE B650M DS3H', 'AM5', 'mATX (Micro ATX)', 2600, 'DDR5', 'AMD B650', 4, 1),
(151, 'B760 AORUS MASTER DDR4', 'LGA1700', 'ATX', 1600, 'DDR4', 'Intel B760', 4, 1),
(152, 'Z790 AORUS MASTER', 'LGA1700', 'E-ATX', 2400, 'DDR5', 'Intel Z790', 4, 1),
(153, 'GIGABYTE GA-H81M-H', 'LGA1150', 'mATX (Micro ATX)', 1600, 'DDR3', 'Intel H81', 2, 1),
(154, 'GIGABYTE B760M GAMING X AX', 'LGA1700', 'mATX (Micro ATX)', 2400, 'DDR5', 'Intel B760', 4, 1);

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
(15, 'alma', 500, 1, 'rqrasrasr/dad'),
(16, 'teve', 250, 2, 'rqrasrasr/dasafd'),
(17, 'asfasf', 15, 3, 'rqrasrasr/daasfsafasfd');

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
(4, 'Böngészők'),
(2, 'Felhőszolgáltatás'),
(3, 'Képszerkesztés'),
(1, 'Kommunikáció'),
(5, 'Média és szórakozás');

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

--
-- A tábla adatainak kiíratása `operaciosrendszer`
--

INSERT INTO `operaciosrendszer` (`Id`, `Nev`, `BuildSzam`, `Verzio`) VALUES
(1, 'Windows 10', '19041', '20H2'),
(2, 'Windows 11', '22000', '21H2'),
(3, 'Ubuntu', '20.04', 'Focal Fossa'),
(4, 'macOS', '11.0', 'Big Sur'),
(5, 'Linux Mint', '20.1', 'Ulyssa');

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
  `BFrekvencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `processzor`
--

INSERT INTO `processzor` (`Id`, `Nev`, `AlaplapFoglalat`, `SzalakSzama`, `TamogatottMemoriatipus`, `ProcesszormagokSzama`, `Gyarto`, `AjanlottTapegyseg`, `IntegraltVideokartya`, `ProcesszorFrekvencia`, `BFrekvencia`) VALUES
(6, 'Ryzen 3 1200', 'AM4', 4, 'DDR4', 4, 0, 65, 0, 3.1, 3),
(7, 'Ryzen 3 1300X', 'AM4', 4, 'DDR4', 4, 0, 65, 0, 3.5, 4),
(8, 'Ryzen 5 1400', 'AM4', 8, 'DDR4', 4, 0, 65, 0, 3.2, 3),
(9, 'Ryzen 5 1500X', 'AM4', 8, 'DDR4', 4, 0, 65, 0, 3.5, 4),
(10, 'Ryzen 5 1600', 'AM4', 12, 'DDR4', 6, 0, 65, 0, 3.2, 4),
(11, 'Ryzen 5 PRO 8600G', 'AM5', 12, 'DDR5', 6, 0, 65, 1, 4.3, 5),
(12, 'Ryzen 7 PRO 8840U', 'FP7/FP7r2', 16, 'DDR5/LPDDR5X', 8, 0, 28, 1, 3.3, 5),
(13, 'Ryzen AI 9 HX 370', 'FP8', 24, 'DDR5/LPDDR5X', 12, 0, 28, 1, 3.3, 5),
(14, 'Ryzen 9 9900X', 'AM5', 24, 'DDR5', 12, 0, 120, 1, 4.4, 6),
(15, 'Ryzen 7 9800X3D', 'AM5', 16, 'DDR5', 8, 0, 120, 1, 4.7, 5);

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
(1, 'admin', 1, 'admin@example.com', 'light', '', '', ''),
(2, 'user1', 2, 'user1@example.com', 'dark', '', '', ''),
(3, 'user2', 2, 'user2@example.com', 'light', '', '', ''),
(4, 'user3', 3, 'user3@example.com', 'dark', '', '', ''),
(5, 'user4', 3, 'user4@example.com', 'light', '', '', ''),
(6, 'Postas Feri', 1, 'postas@gmail.com', 'black', '[value-6]', 0x46657269, 0x46657269),
(7, 'Mate', 0, 'mateszabo9784@gmail.com', 'string', 'string', 0xf0959242684a1bed959c797e85497e6a1bd81cc24267f8f8ab3efac2858870bb0cd40592da86a0fb920db47263e6990864f131f8860fead2a918726f85bf294c66c6941f7a379f887079e4921bf9761ae91100dde5770c5a55ade70e602fe161c7ead67e7f246fdf7896db6ce0123dc62740d0c6ef757a3910c4fc37f956334b, 0xdc0df50ba01983c449b13fa0f31f372097f22b6045acb375e7f1331dfe2ae679082bdd7602fc5525c3016ce58dee3d9707c7d10d1a06c3e5c539d2c6053cb56f),
(8, 'MateHun130', 0, 'mateszabo789@gmail.com', 'string', 'string', 0xe7d0335528f04f58c85bf80a02e35ef272f6ace21d0847f0a9d030b821cd2b2505a090ceae609379e86040cd18fb455e82c74846a69dd4b59b45c1909a9ca90e9e9c10aa018d88d35810cce66d0bfec4b40983d641e5f16072c4bcd5ac40783645d2c4e3213cd407faae9cce0fbf05b8f177defd6f3851000fb0c62c7bb9df2d, 0x14941aba4f82847b9e25dc5482ea8f74908ddffe8bfd85c990ddf438597a484fa9cdd2ba48bfe3b6dacc1dd257439d6cad08bc570b8c1e13b33895bdad21ef04);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ram`
--

CREATE TABLE `ram` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(60) NOT NULL,
  `MemoriaTipus` varchar(11) NOT NULL,
  `Frekvencia` double NOT NULL,
  `Meret` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ram`
--

INSERT INTO `ram` (`Id`, `Nev`, `MemoriaTipus`, `Frekvencia`, `Meret`) VALUES
(74, 'Kingston FURY Renegade Pro', 'DDR5', 2400, 16),
(75, 'Kingston FURY Renegade Pro', 'DDR5', 2800, 32),
(76, 'Kingston FURY Renegade Pro', 'DDR5', 3000, 64),
(77, 'Kingston FURY Renegade Pro', 'DDR5', 3200, 128),
(78, 'Kingston FURY Renegade Pro', 'DDR5', 3400, 256),
(79, 'Kingston FURY Impact', 'DDR4', 1333, 8),
(80, 'Kingston FURY Impact', 'DDR4', 1333, 16),
(81, 'Kingston FURY Impact', 'DDR4', 1600, 16),
(82, 'Kingston FURY Impact', 'DDR4', 1600, 32),
(83, 'Kingston FURY Renegade', 'DDR4', 1600, 8),
(84, 'Kingston FURY Renegade', 'DDR4', 1800, 16),
(85, 'Kingston FURY Renegade', 'DDR4', 2000, 8),
(86, 'Kingston FURY Renegade', 'DDR4', 2133, 32),
(87, 'Kingston FURY Renegade', 'DDR4', 2300, 32),
(88, 'Kingston FURY Renegade', 'DDR4', 2400, 16),
(89, 'Kingston FURY Renegade', 'DDR4', 2666, 16),
(90, 'Kingston FURY Beast RGB', 'DDR4', 1333, 4),
(91, 'Kingston FURY Beast RGB', 'DDR4', 1600, 4),
(92, 'Kingston FURY Beast RGB', 'DDR4', 1800, 8),
(93, 'Kingston FURY Beast RGB', 'DDR4', 1866, 8),
(94, 'Kingston FURY Beast RGB', 'DDR4', 1866, 16),
(95, 'Kingston FURY Impact', 'DDR5', 2400, 8),
(96, 'Kingston FURY Impact', 'DDR5', 2400, 16),
(97, 'Kingston FURY Impact', 'DDR5', 2800, 16),
(98, 'Kingston FURY Impact', 'DDR5', 2800, 32),
(99, 'Kingston FURY Impact', 'DDR5', 3000, 16),
(100, 'Kingston FURY Impact', 'DDR5', 3200, 16),
(101, 'Kingston FURY Renegade', 'DDR5', 3000, 48),
(102, 'Kingston FURY Renegade', 'DDR5', 3200, 48),
(103, 'Kingston FURY Renegade', 'DDR5', 3400, 16),
(104, 'Kingston FURY Renegade', 'DDR5', 3600, 16),
(105, 'Kingston FURY Renegade', 'DDR5', 3800, 16),
(106, 'Kingston FURY Renegade', 'DDR5', 8000, 16),
(107, 'Kingston FURY Renegade', 'DDR5', 4200, 24);

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
(1, 16, 6, 74, 1, 111, 15, 'minimum'),
(2, 17, 7, 75, 2, 112, 15, 'maximum'),
(5, 21, 8, 76, 3, 114, 16, 'minimum'),
(119, 19, 11, 74, 2, 113, 16, 'maximum');

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
-- A tábla adatainak kiíratása `videokartya`
--

INSERT INTO `videokartya` (`Id`, `Nev`, `AlaplapiCsatlakozas`, `AjanlottTapegyseg`, `MonitorCsatlakozas`, `ChipGyartoja`, `Vram`) VALUES
(16, 'GeForce RTX 3050', 'PCIe', 550, 'HDMI, DisplayPort', 'NVIDIA', 8),
(17, 'GeForce RTX 3050', 'PCIe', 300, 'HDMI, DisplayPort', 'NVIDIA', 6),
(18, 'GeForce RTX 3060', 'PCIe', 550, 'HDMI, DisplayPort', 'NVIDIA', 12),
(19, 'GeForce RTX 3060', 'PCIe', 550, 'HDMI, DisplayPort', 'NVIDIA', 8),
(20, 'GeForce RTX 3060 Ti', 'PCIe', 600, 'HDMI, DisplayPort', 'NVIDIA', 8),
(21, 'GeForce RTX 3070', 'PCIe', 650, 'HDMI, DisplayPort', 'NVIDIA', 8),
(22, 'GeForce RTX 3070 Ti', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 8),
(23, 'GeForce RTX 3080', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 12),
(24, 'GeForce RTX 3080', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 10),
(25, 'GeForce RTX 3080 Ti', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 12),
(26, 'GeForce RTX 3090', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 24),
(27, 'GeForce RTX 3090 Ti', 'PCIe', 850, 'HDMI, DisplayPort', 'NVIDIA', 24),
(28, 'GeForce RTX 4060', 'PCIe', 550, 'HDMI, DisplayPort', 'NVIDIA', 8),
(29, 'GeForce RTX 4060 Ti', 'PCIe', 550, 'HDMI, DisplayPort', 'NVIDIA', 16),
(30, 'GeForce RTX 4070', 'PCIe', 650, 'HDMI, DisplayPort', 'NVIDIA', 12),
(31, 'GeForce RTX 4070 Ti', 'PCIe', 700, 'HDMI, DisplayPort', 'NVIDIA', 12),
(32, 'GeForce RTX 4070 SUPER', 'PCIe', 650, 'HDMI, DisplayPort', 'NVIDIA', 12),
(33, 'GeForce RTX 4080', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 16),
(34, 'GeForce RTX 4080 SUPER', 'PCIe', 750, 'HDMI, DisplayPort', 'NVIDIA', 16),
(35, 'GeForce RTX 4090', 'PCIe', 850, 'HDMI, DisplayPort', 'NVIDIA', 24),
(36, 'Radeon RX 5300', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 4),
(37, 'Radeon RX 5300 XT', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 4),
(38, 'Radeon RX 5500', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 4),
(39, 'Radeon RX 5500 XT', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 4),
(40, 'Radeon RX 5500 XT', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 8),
(41, 'Radeon RX 5600', 'PCIe', 450, 'HDMI, DisplayPort, DVI', 'AMD', 6),
(42, 'Radeon RX 5600 XT', 'PCIe', 450, 'HDMI, DisplayPort', 'AMD', 6),
(43, 'Radeon RX 5700', 'PCIe', 600, 'HDMI, DisplayPort', 'AMD', 8),
(44, 'Radeon RX 5700 XT', 'PCIe', 600, 'HDMI, DisplayPort', 'AMD', 8),
(45, 'Radeon RX 6400', 'PCIe', 350, 'HDMI, DisplayPort', 'AMD', 4),
(46, 'Radeon RX 6500 XT', 'PCIe', 400, 'HDMI, DisplayPort', 'AMD', 8),
(47, 'Radeon RX 6600', 'PCIe', 450, 'HDMI, DisplayPort', 'AMD', 8),
(48, 'Radeon RX 6600 XT', 'PCIe', 500, 'HDMI, DisplayPort', 'AMD', 8),
(49, 'Radeon RX 6650 XT', 'PCIe', 500, 'HDMI, DisplayPort', 'AMD', 8),
(50, 'Radeon RX 6700', 'PCIe', 600, 'HDMI, DisplayPort', 'AMD', 10),
(51, 'Radeon RX 6700 XT', 'PCIe', 650, 'HDMI, DisplayPort', 'AMD', 12),
(52, 'Radeon RX 6750 XT', 'PCIe', 650, 'HDMI, DisplayPort', 'AMD', 12),
(53, 'Radeon RX 6800', 'PCIe', 650, 'HDMI, DisplayPort, USB-C', 'AMD', 16),
(54, 'Radeon RX 6800 XT', 'PCIe', 750, 'HDMI, DisplayPort, USB-C', 'AMD', 16),
(55, 'Radeon RX 6900 XT', 'PCIe', 850, 'HDMI, DisplayPort, USB-C', 'AMD', 16),
(56, 'Radeon RX 6950 XT', 'PCIe', 850, 'HDMI, DisplayPort', 'AMD', 16),
(57, 'Radeon RX 7600', 'PCIe', 550, 'HDMI, DisplayPort', 'AMD', 8),
(58, 'Radeon RX 7600 XT', 'PCIe', 600, 'HDMI, DisplayPort', 'AMD', 16),
(59, 'Radeon RX 7700 XT', 'PCIe', 700, 'HDMI, DisplayPort', 'AMD', 12),
(60, 'Radeon RX 7800 XT', 'PCIe', 700, 'HDMI, DisplayPort', 'AMD', 16),
(61, 'Radeon RX 7900 GRE', 'PCIe', 800, 'HDMI, DisplayPort, USB-C', 'AMD', 16),
(62, 'Radeon RX 7900 XT', 'PCIe', 750, 'HDMI, DisplayPort, USB-C', 'AMD', 20),
(63, 'Radeon RX 7900 XTX', 'PCIe', 800, 'HDMI, DisplayPort, USB-C', 'AMD', 24);

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
  ADD UNIQUE KEY `unique_Nev` (`Nev`);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `ram`
--
ALTER TABLE `ram`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT a táblához `setup`
--
ALTER TABLE `setup`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT a táblához `videokartya`
--
ALTER TABLE `videokartya`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

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
