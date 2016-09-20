<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160920190142 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql("CREATE TABLE `user` (
                      `user_id` INT(11) NOT NULL,
                      `first_name` VARCHAR(45) NULL,
                      `last_name` VARCHAR(45) NULL,
                      PRIMARY KEY (`user_id`));");
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $this->addSql("DROP TABLE IF EXISTS `user`;");
    }
}
