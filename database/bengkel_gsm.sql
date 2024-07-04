-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 22, 2024 at 05:13 AM
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
-- Database: `bengkel_gsm`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_code`
--

CREATE TABLE `access_code` (
  `id_code` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `access_code`
--

INSERT INTO `access_code` (`id_code`, `code`, `type`) VALUES
(1, '12345', 'admin'),
(2, '123', 'cashier');

-- --------------------------------------------------------

--
-- Table structure for table `cashier`
--

CREATE TABLE `cashier` (
  `id_cashier` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cashier`
--

INSERT INTO `cashier` (`id_cashier`, `nama`, `created`) VALUES
(1, 'Asep Kasep', '2024-02-03'),
(3, 'assa', '2024-02-03');

-- --------------------------------------------------------

--
-- Table structure for table `laporan`
--

CREATE TABLE `laporan` (
  `id_laporan` int(11) NOT NULL,
  `file` varchar(200) NOT NULL,
  `tipe` varchar(50) NOT NULL,
  `tgl_laporan` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laporan`
--

INSERT INTO `laporan` (`id_laporan`, `file`, `tipe`, `tgl_laporan`) VALUES
(20, 'pembelian-stok-1708572606.pdf', 'pembelian', '2024-02-22 10:30:06'),
(31, 'barang-masuk-1708574953.pdf', 'masuk', '2024-02-22 11:09:13'),
(32, 'barang-masuk-1708575078.pdf', 'masuk', '2024-02-22 11:11:18');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `id_cashier` int(11) NOT NULL,
  `items` text NOT NULL,
  `discount` varchar(50) NOT NULL,
  `quantity` varchar(200) NOT NULL,
  `jasa_pemasangan` varchar(100) DEFAULT NULL,
  `total_price` varchar(200) NOT NULL,
  `created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id_order`, `id_cashier`, `items`, `discount`, `quantity`, `jasa_pemasangan`, `total_price`, `created`) VALUES
(45, 1, '[{\"prd_id\":\"6\",\"prd_name\":\"Product C\",\"prd_buy\":\"4500\",\"prd_price\":\"5000\",\"prd_quantity\":1,\"prd_total_price\":5000}]', '0', '1', '10000', '15000', '2024-02-22'),
(46, 1, '[{\"prd_id\":\"5\",\"prd_name\":\"Product B\",\"prd_buy\":\"19000\",\"prd_price\":\"20000\",\"prd_quantity\":1,\"prd_total_price\":20000}]', '0', '1', '-', '20000', '2024-02-22');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id_products` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `buy` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `created_date` date NOT NULL,
  `update_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id_products`, `name`, `description`, `stock`, `buy`, `price`, `created_date`, `update_date`) VALUES
(4, 'Product A', 'lampu motor', 32, '9000', '10000', '2024-01-27', NULL),
(5, 'Product B', 'aki motor', 8, '19000', '20000', '2024-01-27', NULL),
(6, 'Product C', 'Ban Motor', 37, '4500', '5000', '2024-01-27', NULL),
(7, 'produk tes edit', 'asds', 15, '14500', '15000', '2024-01-27', NULL),
(10, 'sahaa', 'sahaas', 30, '2500', '5000', '2024-02-22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `report_cashier`
--

CREATE TABLE `report_cashier` (
  `id_report` int(11) NOT NULL,
  `id_cashier` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `income` varchar(200) NOT NULL,
  `working_hours` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report_cashier`
--

INSERT INTO `report_cashier` (`id_report`, `id_cashier`, `tanggal`, `income`, `working_hours`) VALUES
(3, 1, '2024-02-03', '60000', '0 jam 13 menit');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_code`
--
ALTER TABLE `access_code`
  ADD PRIMARY KEY (`id_code`);

--
-- Indexes for table `cashier`
--
ALTER TABLE `cashier`
  ADD PRIMARY KEY (`id_cashier`);

--
-- Indexes for table `laporan`
--
ALTER TABLE `laporan`
  ADD PRIMARY KEY (`id_laporan`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_cashier` (`id_cashier`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_products`);

--
-- Indexes for table `report_cashier`
--
ALTER TABLE `report_cashier`
  ADD PRIMARY KEY (`id_report`),
  ADD KEY `id_cashier` (`id_cashier`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_code`
--
ALTER TABLE `access_code`
  MODIFY `id_code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cashier`
--
ALTER TABLE `cashier`
  MODIFY `id_cashier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `laporan`
--
ALTER TABLE `laporan`
  MODIFY `id_laporan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id_products` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `report_cashier`
--
ALTER TABLE `report_cashier`
  MODIFY `id_report` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_cashier`) REFERENCES `cashier` (`id_cashier`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report_cashier`
--
ALTER TABLE `report_cashier`
  ADD CONSTRAINT `report_cashier_ibfk_1` FOREIGN KEY (`id_cashier`) REFERENCES `cashier` (`id_cashier`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
