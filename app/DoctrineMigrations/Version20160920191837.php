<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160920191837 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql("CREATE TABLE `tds` (
                      `id` INT(11) NOT NULL AUTO_INCREMENT,
                      `created_by` INT(11) NULL,
                      `name` VARCHAR(255) NULL,
                      `dt_created` DATETIME NULL,
                      `data` TEXT NULL,
                      PRIMARY KEY (`id`));
                    ");

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $this->addSql("DROP TABLE IF EXISTS `tds`;");

    }
}
