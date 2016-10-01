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

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return Trademark
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getOrganizationUnit()
    {
        return $this->organizationUnit;
    }

    /**
     * @param mixed $organizationUnit
     * @return Trademark
     */
    public function setOrganizationUnit($organizationUnit)
    {
        $this->organizationUnit = $organizationUnit;
        return $this;
    }

    /**
     * @return int
     */
    public function getOrganizationUnitId()
    {
        return $this->organizationUnitId;
    }

    /**
     * @param int $organizationUnitId
     * @return Trademark
     */
    public function setOrganizationUnitId($organizationUnitId)
    {
        $this->organizationUnitId = $organizationUnitId;
        return $this;
    }



}
