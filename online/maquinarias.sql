-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2017 at 07:07 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `empresas`
--

-- --------------------------------------------------------

--
-- Table structure for table `maquinarias`
--

CREATE TABLE `maquinarias` (
  `name` varchar(20) NOT NULL,
  `direction` varchar(40) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `web` varchar(30) NOT NULL,
  `entry` varchar(50) NOT NULL,
  `latitud` varchar(20) NOT NULL,
  `longitud` varchar(20) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `priority` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='maquinarias plantilla de datos';

--
-- Dumping data for table `maquinarias`
--

INSERT INTO `maquinarias` (`name`, `direction`, `phone`, `email`, `web`, `entry`, `latitud`, `longitud`, `contact`, `priority`) VALUES
('Dimel Arturo Contrer', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '', '', '', '15166291529', 0),
('Bondi Beach', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '1', '-33.890542', '151.274856', '15166291529', 0),
('Coogee Beach', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '2', '-33.923036', '151.259052', '15166291529', 0),
('Cronulla Beach', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '3', '-34.028249', '151.157507', '', 0),
('Manly Beach', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '4', '-33.800101286', '151.28747820854187', '', 0),
('Maroubra Beach', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '5', '-33.950198', '151.259302', '', 0),
('Bondi Beach', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '6', '-33.890542', '151.274856', '', 0),
('Coogee Beach', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '7', '-33.923036', '152.259052', '', 0),
('Cronulla Beach', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '8', '-32.028249', '153.157507', '', 0),
('Manly Beach', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '9', '-31.80010128657071', '151.28747820854187', '', 0),
('Maroubra Beach', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '10', '-31.950198', '151.259302', '', 0),
('Bondi Beach', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '11', '-30.890542', '151.474856', '', 0),
('KARLA EQUIPMENT', '', '15166291529', 'arturocontrerasmartinez@gmail.', '', '14', '-33.8424750082229', '151.08810424804688', '', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
