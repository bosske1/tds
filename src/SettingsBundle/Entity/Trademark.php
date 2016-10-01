<?php

namespace SettingsBundle\Entity;

use AppBundle\Entity\AbstractEntity;
use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\OrganizationUnit;

/**
 * Segment
 *
 * @ORM\Table(name="trademark")
 * @ORM\Entity(repositoryClass="SettingsBundle\Repository\TrademarkRepository")
 */
class Trademark extends AbstractEntity
{

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=55)
     */
    protected $name;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\OrganizationUnit")
     * @ORM\JoinColumn(name="organization_unit_id", referencedColumnName="id")
     */
    protected $organizationUnit;

    /**
     * @var int
     *
     * @ORM\Column(name="organization_unit_id", type="integer")
     */
    protected $organizationUnitId;

}
