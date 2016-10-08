<?php

namespace SettingsBundle\Entity;

use AppBundle\Entity\AbstractEntity;
use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\User;

/**
 * ProductStatus
 *
 * @ORM\Table(name="product_status")
 * @ORM\Entity(repositoryClass="SettingsBundle\Repository\ProductStatusRepository")
 */
class ProductStatus extends AbstractEntity
{


    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=55)
     */
    private $name;

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
     * Set name
     *
     * @param string $name
     *
     * @return ProductStatus
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
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
