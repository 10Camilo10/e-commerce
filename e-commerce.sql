-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-11-2024 a las 22:18:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `e-commerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `Id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `comment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`Id`, `name`, `lastname`, `city`, `email`, `comment`) VALUES
(5, 'Camilo', 'Mora', 'Bogotá', 'camilomoravilla@gmail.com', 'prueba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `Id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`Id`, `name`, `email`, `password`, `address`) VALUES
(1, 'camilo', 'camilomoravilla@gmail.com', '12345', 'Calle 5'),
(4, 'Camilo', 'camilo.mora@excellentiam.co', '12345', 'Calle 6'),
(8, 'Felipe', 'prueba1@gmail.com', '12345', 'Calle 6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `Id` int(255) NOT NULL,
  `valor` int(255) NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`Id`, `valor`, `fecha`, `usuario`) VALUES
(10, 8820000, '2024-11-19 00:00:00', 'prueba1@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `Id` int(255) NOT NULL,
  `image` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`Id`, `image`, `name`, `price`, `description`, `category`) VALUES
(3, 'pc1.avif', 'Lenovo Ryzen', 4500000, 'Bastante ligero y estilizado para tus necesidades', 'portatil'),
(4, 'pc2.avif', 'Asus Zenbook', 2800000, '25 GB de ram y 512 Gb de almacenamiento', 'portatil'),
(5, 'pc3.avif', 'Asus Vivobook', 3300000, 'La mejor pantalla con tasa de refresco de 120 Hz', 'portatil'),
(6, 'pc4.avif', 'Acer Nitro V', 5100000, 'GPU Nvidia 3090 para disfrutas de tus juegos', 'portatil'),
(7, 'audifonos.avif', 'JBL Tune 520', 250000, 'Diadema con almoadillas para mayor comodidad', 'audifonos'),
(8, 'audifonos2.avif', 'Kalley K-An1', 120000, 'Diadema color negro con mucho estilo', 'audifonos'),
(9, 'audifonos3.avif', 'JBL Tune 720', 280000, 'Cancelacion activa de sonido de ambiente', 'audifonos'),
(10, 'audifonos4.avif', 'Qcy H3 Anc', 310000, 'Gran diseño con mucha comodidad', 'audifonos'),
(11, 'smartphone.avif', 'Vivo V40', 4350000, 'Gran rendimiento para videojuegos', 'smartphone'),
(12, 'smartphone2.avif', 'Motorola G50', 2720000, 'Capacidad de 128 GB y gran pantalla', 'smartphone'),
(13, 'smartphone3.avif', 'Honor X7b', 2500000, 'Ultimo procesador y 12 GB de Ram', 'smartphone'),
(14, 'smartphone4.avif', 'Iphone 16 Pro', 1200000, 'Lente de 48 mpx y botones interactivos', 'smartphone'),
(15, 'smartwatch1.avif', 'SKG Reloj', 500000, 'Multiples modo para deportes', 'otros'),
(16, 'airpods.avif', 'Xiaomi Redmi Airdots', 200000, 'Tamaño compacto con sensor tactil', 'otros'),
(17, 'smartwatch2.avif', 'Redmi Watch 3', 390000, 'Gran bateria de hasta 300 horas', 'otros'),
(18, 'smartwatch3.avif', 'Samsung Galaxy Watch', 415000, 'Diseño estilizado y bastante comodo', 'otros');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
