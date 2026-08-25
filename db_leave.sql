-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2026 at 03:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_leave`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_employee`
--

CREATE TABLE `tb_employee` (
  `employeeid` varchar(8) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `password` varchar(7) DEFAULT NULL,
  `managerid` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_employee`
--

INSERT INTO `tb_employee` (`employeeid`, `fullname`, `password`, `managerid`) VALUES
('40048000', 'Janya', '6692', '40480001'),
('40480001', 'Pariwat', '2121', NULL),
('43048000', 'Veena', '1378', '40480001'),
('54048000', 'Jackrapan', '9999', '43048000'),
('55048000', 'Thanaporn', '1111', '43048000');

-- --------------------------------------------------------

--
-- Table structure for table `tb_leaveform`
--

CREATE TABLE `tb_leaveform` (
  `leaveid` varchar(7) NOT NULL,
  `leave_from_date` date DEFAULT NULL,
  `leave_to_date` date DEFAULT NULL,
  `employeeid` varchar(8) DEFAULT NULL,
  `typeid` varchar(2) DEFAULT NULL,
  `reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_leaveform`
--

INSERT INTO `tb_leaveform` (`leaveid`, `leave_from_date`, `leave_to_date`, `employeeid`, `typeid`, `reason`) VALUES
('2016001', '2016-01-15', '2016-01-15', '40048000', '02', 'Have sick'),
('2016002', '2016-02-29', '2016-03-02', '43048000', '01', 'Have business'),
('2016003', '2016-05-12', '2016-05-17', '54048000', '03', 'Vacation'),
('2016004', '2016-06-07', '2016-06-09', '40048000', '03', 'Have trip');

-- --------------------------------------------------------

--
-- Table structure for table `tb_leavetype`
--

CREATE TABLE `tb_leavetype` (
  `typeid` varchar(2) NOT NULL,
  `typename` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_leavetype`
--

INSERT INTO `tb_leavetype` (`typeid`, `typename`) VALUES
('01', 'ลากิจ'),
('02', 'ลาป่วย'),
('03', 'ลาพักร้อน');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_employee`
--
ALTER TABLE `tb_employee`
  ADD PRIMARY KEY (`employeeid`);

--
-- Indexes for table `tb_leaveform`
--
ALTER TABLE `tb_leaveform`
  ADD PRIMARY KEY (`leaveid`);

--
-- Indexes for table `tb_leavetype`
--
ALTER TABLE `tb_leavetype`
  ADD PRIMARY KEY (`typeid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
