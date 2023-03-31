-- CreateTable
CREATE TABLE `token` (
    `itokenid` INTEGER NOT NULL AUTO_INCREMENT,
    `dtcreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dtupdated` DATETIME(3) NOT NULL,
    `vtoken` VARCHAR(255) NOT NULL,
    `dtvigencia` DATETIME(3) NOT NULL,
    `iused` BOOLEAN NOT NULL DEFAULT false,
    `ireferenciaid` INTEGER NOT NULL,
    `icattokenid` INTEGER NOT NULL,

    PRIMARY KEY (`itokenid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cattoken` (
    `icattokenid` INTEGER NOT NULL AUTO_INCREMENT,
    `dtcreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dtupdated` DATETIME(3) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`icattokenid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `catorganizacion` (
    `iorganizacionid` INTEGER NOT NULL AUTO_INCREMENT,
    `dtcreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dtupdated` DATETIME(3) NOT NULL,
    `vorganizacionnombre` VARCHAR(255) NOT NULL,
    `vrfc` VARCHAR(20) NOT NULL,
    `iactivo` BOOLEAN NOT NULL DEFAULT true,
    `iownerid` INTEGER NOT NULL,

    PRIMARY KEY (`iorganizacionid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rel_usuariorganizacionrole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `iusuarioid` INTEGER NOT NULL,
    `iorgid` INTEGER NOT NULL,
    `iroleid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_icattokenid_fkey` FOREIGN KEY (`icattokenid`) REFERENCES `cattoken`(`icattokenid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_usuariorganizacionrole` ADD CONSTRAINT `rel_usuariorganizacionrole_iorgid_fkey` FOREIGN KEY (`iorgid`) REFERENCES `catorganizacion`(`iorganizacionid`) ON DELETE RESTRICT ON UPDATE CASCADE;
