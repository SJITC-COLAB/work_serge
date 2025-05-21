-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2025 at 12:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cwsms`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `plateNumber` varchar(20) NOT NULL,
  `carType` varchar(50) NOT NULL,
  `carSize` varchar(20) NOT NULL,
  `driverName` varchar(100) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`plateNumber`, `carType`, `carSize`, `driverName`, `phoneNumber`, `createdAt`, `updatedAt`) VALUES
('3', 'Quos temporibus iust', 'Nisi minus anim volu', 'Ashton Barker', '+1 (926) 791-4689', '2025-05-21 09:57:05', '2025-05-21 09:57:05'),
('527', 'Sint modi adipisci e', 'Quia quis recusandae', 'Amery Parker', '+1 (676) 484-9014', '2025-05-21 10:02:03', '2025-05-21 10:02:03'),
('530', 'Nulla eiusmod dolori', 'Ad non tempore non ', 'Alika Mcdaniel', '+1 (302) 671-3052', '2025-05-21 09:32:24', '2025-05-21 09:32:24'),
('ABC123', 'Sedan', 'Medium', 'John Doe', '555-123-4567', '2025-05-21 07:51:52', '2025-05-21 07:51:52');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `packageNumber` varchar(20) NOT NULL,
  `packageName` varchar(100) NOT NULL,
  `packageDescription` text DEFAULT NULL,
  `packagePrice` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`packageNumber`, `packageName`, `packageDescription`, `packagePrice`, `createdAt`, `updatedAt`) VALUES
('PKG001', 'Basic Wash', 'Exterior washing and basic cleaning', 25.99, '2025-05-21 08:58:26', '2025-05-21 08:58:26'),
('PKG023', 'Basic Wash', 'Exterior washing and basic cleaning', 25.99, '2025-05-21 08:58:43', '2025-05-21 08:58:43');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `paymentNumber` varchar(20) NOT NULL,
  `amountPaid` decimal(10,2) NOT NULL,
  `PaymentDate` datetime NOT NULL,
  `RecordNumber` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_packages`
--

CREATE TABLE `service_packages` (
  `RecordNumber` varchar(20) NOT NULL,
  `serviceDate` datetime NOT NULL,
  `plateNumber` varchar(20) NOT NULL,
  `packageNumber` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_packages`
--

INSERT INTO `service_packages` (`RecordNumber`, `serviceDate`, `plateNumber`, `packageNumber`, `createdAt`, `updatedAt`) VALUES
('McQUk', '2001-04-02 00:00:00', '530', 'PKG001', '2025-05-21 09:32:47', '2025-05-21 09:32:47'),
('pVeLr', '2008-04-11 00:00:00', 'ABC123', 'PKG023', '2025-05-21 09:12:45', '2025-05-21 09:12:45'),
('SVChCq3s', '1970-03-19 00:00:00', 'ABC123', 'PKG001', '2025-05-21 10:02:16', '2025-05-21 10:02:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`plateNumber`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`packageNumber`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`paymentNumber`),
  ADD UNIQUE KEY `RecordNumber` (`RecordNumber`),
  ADD KEY `idx_payment_service_package` (`RecordNumber`);

--
-- Indexes for table `service_packages`
--
ALTER TABLE `service_packages`
  ADD PRIMARY KEY (`RecordNumber`),
  ADD KEY `idx_service_package_car` (`plateNumber`),
  ADD KEY `idx_service_package_package` (`packageNumber`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`RecordNumber`) REFERENCES `service_packages` (`RecordNumber`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `service_packages`
--
ALTER TABLE `service_packages`
  ADD CONSTRAINT `service_packages_ibfk_1` FOREIGN KEY (`plateNumber`) REFERENCES `cars` (`plateNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `service_packages_ibfk_2` FOREIGN KEY (`packageNumber`) REFERENCES `packages` (`packageNumber`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
