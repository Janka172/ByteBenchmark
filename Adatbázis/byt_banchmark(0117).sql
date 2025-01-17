-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 17. 16:37
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
(1, 'MSI B450', 'AM4', 'ATX', 3200, 'DDR4', 'B450', 4, 1),
(2, 'ASUS ROG Strix', 'LGA1200', 'Micro-ATX', 3600, 'DDR4', 'Z490', 4, 1),
(3, 'Gigabyte Aorus', 'LGA1700', 'ATX', 4000, 'DDR5', 'Z690', 4, 1),
(4, 'MSI MPG', 'AM5', 'ATX', 5200, 'DDR5', 'X670', 4, 1),
(5, 'ASRock Steel Legend', 'AM4', 'Micro-ATX', 3000, 'DDR4', 'B450', 2, 1),
(6, 'ASUS Prime', 'LGA1200', 'ATX', 3400, 'DDR4', 'B560', 4, 1),
(7, 'Gigabyte B550', 'AM4', 'ATX', 3200, 'DDR4', 'B550', 4, 1),
(8, 'ASRock Phantom Gaming', 'LGA1700', 'Micro-ATX', 4800, 'DDR5', 'Z690', 4, 1),
(19, 'MSI X570', 'AM4', 'ATX', 3600, 'DDR4', 'X570', 4, 1),
(20, 'ASUS TUF Gaming', 'AM5', 'ATX', 5200, 'DDR5', 'X670', 4, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alaplap_csatlakozo`
--

CREATE TABLE `alaplap_csatlakozo` (
  `CsatlakozoId` int(11) NOT NULL,
  `AlaplapId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `alaplap_csatlakozo`
--

INSERT INTO `alaplap_csatlakozo` (`CsatlakozoId`, `AlaplapId`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(3, 1),
(1, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `applikacio`
--

CREATE TABLE `applikacio` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(120) NOT NULL,
  `Tarhely` int(11) NOT NULL,
  `KatId` int(11) NOT NULL,
  `Kepeleresiutja` varchar(340) NOT NULL
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
  `Nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `csatlakozo`
--

INSERT INTO `csatlakozo` (`Id`, `Nev`) VALUES
(3, 'sata'),
(1, 'usb'),
(2, 'usb2');

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
(1, 'Intel Core i3-10100', 'LGA 1200', 4, 'DDR4', 4, 1, 450, 0, 0, 0),
(2, 'AMD Ryzen 5 3600', 'AM4', 6, 'DDR4', 6, 2, 550, 0, 0, 0),
(3, 'Intel Core i5-10600K', 'LGA 1200', 6, 'DDR4', 6, 1, 500, 0, 0, 0),
(4, 'AMD Ryzen 7 5800X', 'AM4', 8, 'DDR4', 8, 2, 650, 0, 0, 0),
(5, 'Intel Core i9-11900K', 'LGA 1200', 8, 'DDR4', 8, 1, 700, 0, 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `profil`
--

CREATE TABLE `profil` (
  `Id` int(11) NOT NULL,
  `Felhasznalonev` varchar(120) NOT NULL,
  `Jogosultsag` int(11) NOT NULL,
  `Email` varchar(120) NOT NULL,
  `Jelszo` varchar(120) NOT NULL,
  `Tema` varchar(10) NOT NULL,
  `JelszoUjra` varchar(255) NOT NULL,
  `LogoEleresiUtja` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `profil`
--

INSERT INTO `profil` (`Id`, `Felhasznalonev`, `Jogosultsag`, `Email`, `Jelszo`, `Tema`, `JelszoUjra`, `LogoEleresiUtja`) VALUES
(1, 'admin', 1, 'admin@example.com', 'admin123', 'light', '', ''),
(2, 'user1', 2, 'user1@example.com', 'user123', 'dark', '', ''),
(3, 'user2', 2, 'user2@example.com', 'user456', 'light', '', ''),
(4, 'user3', 3, 'user3@example.com', 'user789', 'dark', '', ''),
(5, 'user4', 3, 'user4@example.com', 'user101', 'light', '', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ram`
--

CREATE TABLE `ram` (
  `Id` int(11) NOT NULL,
  `Nev` varchar(60) NOT NULL,
  `MemoriaTipus` int(11) NOT NULL,
  `Frekvencia` double NOT NULL,
  `Meret` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ram`
--

INSERT INTO `ram` (`Id`, `Nev`, `MemoriaTipus`, `Frekvencia`, `Meret`) VALUES
(1, 'Corsair Vengeance LPX', 1, 0, 8),
(2, 'G.SKILL Ripjaws V', 1, 0, 16),
(3, 'Kingston HyperX Fury', 1, 0, 8),
(4, 'Crucial Ballistix', 1, 0, 16),
(5, 'Corsair Dominator Platinum', 1, 0, 32);

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
  `AlaplId` int(11) NOT NULL,
  `ApplikacioId` int(11) NOT NULL,
  `Gp` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `setup`
--

INSERT INTO `setup` (`Id`, `VidkaId`, `ProcId`, `RamId`, `OpId`, `AlaplId`, `ApplikacioId`, `Gp`) VALUES
(109, 1, 1, 1, 1, 1, 15, 'minimum'),
(110, 2, 2, 2, 2, 2, 15, 'maximum'),
(111, 3, 3, 3, 3, 3, 16, 'minimum'),
(112, 1, 3, 3, 4, 2, 17, 'minimum');

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
(1, 'NVIDIA GeForce GTX 1050', 'PCIe 3.0', 450, 'HDMI, DisplayPort', 'NVIDIA', 4),
(2, 'AMD Radeon RX 580', 'PCIe 3.0', 550, 'HDMI, DisplayPort', 'AMD', 8),
(3, 'Intel UHD Graphics 630', 'Integrated', 300, 'HDMI', 'Intel', 2),
(4, 'NVIDIA GeForce RTX 2080', 'PCIe 3.0', 700, 'HDMI, DisplayPort', 'NVIDIA', 8),
(5, 'AMD Radeon RX 5700 XT', 'PCIe 3.0', 650, 'HDMI, DisplayPort', 'AMD', 8),
(12, 'NVIDIA GeForce GTX 1050', 'Integrated', 700, 'string', 'NVIDIA', 16),
(13, 'NVIDIA GeForce GTX 1050', 'Integrated', 700, 'string', 'NVIDIA', 8);

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
  ADD KEY `CsatlakozoId` (`CsatlakozoId`),
  ADD KEY `AlaplapId` (`AlaplapId`);

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
  ADD UNIQUE KEY `unique_Nev` (`Nev`);

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
  ADD UNIQUE KEY `unique_Nev` (`Nev`);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `applikacio`
--
ALTER TABLE `applikacio`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `csatlakozo`
--
ALTER TABLE `csatlakozo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `profil`
--
ALTER TABLE `profil`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `ram`
--
ALTER TABLE `ram`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `setup`
--
ALTER TABLE `setup`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT a táblához `videokartya`
--
ALTER TABLE `videokartya`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `alaplap_csatlakozo`
--
ALTER TABLE `alaplap_csatlakozo`
  ADD CONSTRAINT `alaplap_csatlakozo_ibfk_1` FOREIGN KEY (`AlaplapId`) REFERENCES `alaplap` (`Id`);

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
-- Megkötések a táblához `csatlakozo`
--
ALTER TABLE `csatlakozo`
  ADD CONSTRAINT `csatlakozo_ibfk_1` FOREIGN KEY (`Id`) REFERENCES `alaplap_csatlakozo` (`CsatlakozoId`);

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
