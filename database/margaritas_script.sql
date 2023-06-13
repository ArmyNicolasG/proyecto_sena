SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `margaritas` ;

CREATE SCHEMA IF NOT EXISTS `margaritas` DEFAULT CHARACTER SET utf8 ;
USE `margaritas` ;


-- Table `margaritas`.`proveedores`

DROP TABLE IF EXISTS `margaritas`.`proveedores` ;

CREATE TABLE IF NOT EXISTS `margaritas`.`proveedores` (
  `id_proveedor` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(64) NOT NULL,
  `telefono` VARCHAR(13) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_proveedor`))
ENGINE = InnoDB;


-- Table `margaritas`.`pedidos`

DROP TABLE IF EXISTS `margaritas`.`pedidos` ;

CREATE TABLE IF NOT EXISTS `margaritas`.`pedidos` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `id_proveedor` INT NOT NULL,
  `fecha` DATETIME NOT NULL,
  `fecha_llegada` DATETIME NULL,
  PRIMARY KEY (`id_pedido`),
  INDEX `id_proveedor_idx` (`id_proveedor` ASC),
  CONSTRAINT `id_proveedor`
    FOREIGN KEY (`id_proveedor`)
    REFERENCES `margaritas`.`proveedores` (`id_proveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Table `margaritas`.`articulos`

DROP TABLE IF EXISTS `margaritas`.`articulos` ;

CREATE TABLE IF NOT EXISTS `margaritas`.`articulos` (
  `id_articulo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(64) NOT NULL,
  `precio_sugerido` INT NULL,
  PRIMARY KEY (`id_articulo`))
ENGINE = InnoDB;


-- Table `margaritas`.`detalle_pedidos`

DROP TABLE IF EXISTS `margaritas`.`detalle_pedidos` ;

CREATE TABLE IF NOT EXISTS `margaritas`.`detalle_pedidos` (
  `id_pedido` INT NOT NULL,
  `id_articulo` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `costo` INT NOT NULL,
  INDEX `id_pedido_idx` (`id_pedido` ASC),
  INDEX `id_articulo_idx` (`id_articulo` ASC),
  CONSTRAINT `id_pedido`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `margaritas`.`pedidos` (`id_pedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_articulo`
    FOREIGN KEY (`id_articulo`)
    REFERENCES `margaritas`.`articulos` (`id_articulo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Table `margaritas`.`ventas`

DROP TABLE IF EXISTS `margaritas`.`ventas` ;

CREATE TABLE IF NOT EXISTS `margaritas`.`ventas` (
  `id_venta` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `total` INT NOT NULL,
  PRIMARY KEY (`id_venta`))
ENGINE = InnoDB;


-- Table `margaritas`.`detalle_ventas`

DROP TABLE IF EXISTS `margaritas`.`detalle_ventas` ;

CREATE TABLE IF NOT EXISTS `margaritas`.`detalle_ventas` (
  `id_venta` INT NOT NULL,
  `id_articulo` INT NOT NULL,
  `cantidad` INT NOT NULL,
  INDEX `id_articulo_idx` (`id_articulo` ASC),
  INDEX `id_venta_idx` (`id_venta` ASC),
  CONSTRAINT `id_articulo`
    FOREIGN KEY (`id_articulo`)
    REFERENCES `margaritas`.`articulos` (`id_articulo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_venta`
    FOREIGN KEY (`id_venta`)
    REFERENCES `margaritas`.`ventas` (`id_venta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
