-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 05-12-2017 a las 08:11:10
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `conexo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artists`
--

CREATE TABLE `artists` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `nombre_artista` varchar(255) NOT NULL,
  `foto_perfil` text NOT NULL,
  `foto_portada` text NOT NULL,
  `categoria` int(11) NOT NULL,
  `subcategoria` int(11) NOT NULL,
  `facebook` text NOT NULL,
  `instagram` text NOT NULL,
  `youtube` text NOT NULL,
  `video` text NOT NULL,
  `perfil` text NOT NULL,
  `valor` text NOT NULL,
  `descuento` text NOT NULL,
  `descservicio` text NOT NULL,
  `estado` int(11) NOT NULL,
  `vencimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `artists`
--

INSERT INTO `artists` (`id`, `id_user`, `nombre_artista`, `foto_perfil`, `foto_portada`, `categoria`, `subcategoria`, `facebook`, `instagram`, `youtube`, `video`, `perfil`, `valor`, `descuento`, `descservicio`, `estado`, `vencimiento`) VALUES
(1, 4, 'Rancid 2', 'URL_TO_PATH', 'URL_TO_PATH_port', 0, 0, 'rancid', 'rancid', 'UCFSjnN55tV-mecyG0mYvhdQ', '9SCF1zbsBfU', 'Cualquier texto', '50000000', '10', 'Incluye<br />- 10 temas<br />-Equipo tecnico', 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `id_artista` int(11) NOT NULL,
  `id_calificador` int(11) NOT NULL,
  `originalidad` int(11) NOT NULL,
  `contenido` int(11) NOT NULL,
  `propuesta` int(11) NOT NULL,
  `imagen` int(11) NOT NULL,
  `calidad` int(11) NOT NULL,
  `comentario` text COLLATE utf32_spanish2_ci NOT NULL,
  `fecha` date NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`id_artista`, `id_calificador`, `originalidad`, `contenido`, `propuesta`, `imagen`, `calidad`, `comentario`, `fecha`, `estado`) VALUES
(1, 1, 3, 3, 5, 5, 5, 'El artista se ve muy bien pero le falta originalida', '0000-00-00', 1),
(1, 1, 3, 3, 5, 5, 5, 'El artista se ve muy bien pero le falta originalida', '0000-00-00', 1),
(1, 1, 3, 3, 5, 5, 5, 'El artista se ve muy bien pero le falta originalida', '0000-00-00', 1),
(1, 1, 3, 3, 5, 5, 5, 'El artista se ve muy bien pero le falta originalida', '0000-00-00', 1),
(1, 1, 1, 1, 2, 2, 2, 'El artista se ve muy bien pero le falta originalida', '0000-00-00', 1),
(1, 1, 1, 1, 2, 2, 2, 'El artista se ve muy bien pero le falta originalida', '0000-00-00', 1),
(1, 1, 5, 5, 5, 5, 5, 'El artista se ve muy bien pero le falta originalida', '0000-00-00', 1),
(1, 1, 5, 5, 5, 5, 5, 'El artista se ve muy bien pero le falta originalida', '0000-00-00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificador`
--

CREATE TABLE `calificador` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `tipo_cal` varchar(255) COLLATE utf32_spanish2_ci NOT NULL,
  `foto_perfil` text COLLATE utf32_spanish2_ci NOT NULL,
  `foto_portada` text COLLATE utf32_spanish2_ci NOT NULL,
  `preferencias` text COLLATE utf32_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Volcado de datos para la tabla `calificador`
--

INSERT INTO `calificador` (`id`, `id_user`, `tipo_cal`, `foto_perfil`, `foto_portada`, `preferencias`) VALUES
(1, 3, 'empresa', 'URL_TO_PATH', 'URL_TO_PATH_port', '[{\'cat\':\'rock\',\'subcat\': [\'punk\',\'grounge\']},{\'cat\':\'tropical\',\'subcat\': [\'salsa\',\'merengue\',\'bachata\']}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `tipo` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf32_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Volcado de datos para la tabla `tipo`
--

INSERT INTO `tipo` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'artista'),
(3, 'calificador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `cc_nit` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` text NOT NULL,
  `type` int(2) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `cc_nit`, `first_name`, `last_name`, `email`, `pass`, `type`) VALUES
(1, '1129572380', 'Sergio Andres', 'Blanco Caballero', 'sergioblanco86@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 1),
(3, '112957238', 'Andres', 'Blanco', 'andresblanco86@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 3),
(4, '11295557777', 'Sergio', 'FandiÃ±o', 'sergiofandino@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_user` (`id_user`);

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD KEY `id_artista` (`id_artista`,`id_calificador`),
  ADD KEY `id_calificador` (`id_calificador`);

--
-- Indices de la tabla `calificador`
--
ALTER TABLE `calificador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_user` (`id_user`);

--
-- Indices de la tabla `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `calificador`
--
ALTER TABLE `calificador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipo`
--
ALTER TABLE `tipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `artists`
--
ALTER TABLE `artists`
  ADD CONSTRAINT `artists_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`id_artista`) REFERENCES `artists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`id_calificador`) REFERENCES `calificador` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `calificador`
--
ALTER TABLE `calificador`
  ADD CONSTRAINT `calificador_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`type`) REFERENCES `tipo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
