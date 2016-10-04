<?php

namespace SettingsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\User;

/**
 * ProductStatus
 *
 * @ORM\Table(name="product_status")
 * @ORM\Entity(repositoryClass="SettingsBundle\Repository\ProductStatusRepository")
 */
class ProductStatus
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=55)
     */
    private $name;

    /**
     * @var int
     *
     * @ORM\Column(name="created_by", type="integer")
     */
    private $createdBy;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(name="created_by", referencedColumnName="id")
     */
    private $createdByUser;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dt_created", type="datetime")
     */
    private $dtCreated;

    /**
     * @var int
     *
     * @ORM\Column(name="modified_by", type="integer")
     */
    private $modifiedBy;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(name="modified_by", referencedColumnName="id")
     */
    private $modifiedByUser;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dt_modified", type="datetime")
     */
    private $dtModified;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

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
     * Set createdBy
     *
     * @param integer $createdBy
     *
     * @return ProductStatus
     */
    public function setCreatedBy($createdBy)
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    /**
     * Get createdBy
     *
     * @return int
     */
    public function getCreatedBy()
    {
        return $this->createdBy;
    }

    /**
     * Set dtCreated
     *
     * @param \DateTime $dtCreated
     *
     * @return ProductStatus
     */
    public function setDtCreated($dtCreated)
    {
        $this->dtCreated = $dtCreated;

        if(isset($this->dtCreated)){
            $this->dtCreated = new \DateTime();
        }

        return $this;
    }

    /**
     * Get dtCreated
     *
     * @return \DateTime
     */
    public function getDtCreated()
    {
        return $this->dtCreated;
    }

    /**
     * @param User $user
     * @return ProductStatus
     */
    public function setCreatedByUser(User $user)
    {
        $this->createdByUser = $user;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCreatedByUser()
    {
        return $this->createdByUser;
    }

    /**
     * @return \DateTime
     */
    public function getDtModified()
    {
        return $this->dtModified;
    }

    /**
     * @param \DateTime $dtModified
     */
    public function setDtModified($dtModified)
    {
        $this->dtModified = $dtModified;
    }

    /**
     * @return int
     */
    public function getModifiedBy()
    {
        return $this->modifiedBy;
    }

    /**
     * @param int $modifiedBy
     */
    public function setModifiedBy($modifiedBy)
    {
        $this->modifiedBy = $modifiedBy;
    }

    /**
     * @return mixed
     */
    public function getModifiedByUser()
    {
        return $this->modifiedByUser;
    }

    /**
     * @param User $user
     * @return ProductStatus
     */
    public function setModifiedByUser(User $user)
    {
        $this->modifiedByUser = $user;

        return $this;
    }
}
