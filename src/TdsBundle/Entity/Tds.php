<?php

namespace TdsBundle\Entity;

use AppBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Tds
 *
 * @ORM\Table(name="tds")
 * @ORM\Entity(repositoryClass="TdsBundle\Repository\TdsRepository")
 */
class Tds
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
     * @ORM\Column(name="name", type="string", length=45)
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
     * @var string
     *
     * @ORM\Column(name="data", type="text", nullable=true)
     */
    private $data;

    /**
     * @var int
     *
     * @ORM\Column(name="is_template", type="integer", nullable=true)
     */
    private $isTemplate;

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
     * @return Tds
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
     * @return Tds
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
     * @return Tds
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
     * Set data
     *
     * @param string $data
     *
     * @return Tds
     */
    public function setData($data)
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Get data
     *
     * @return string
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param User $user
     * @return $this
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
     * @return Tds
     */
    public function setModifiedByUser(User $user)
    {
        $this->modifiedByUser = $user;

        return $this;
    }

    /**
     * Set isTemplate
     *
     * @param int $isTemplate
     *
     * @return Tds
     */
    public function setIsTemplate($isTemplate)
    {
        $this->isTemplate = $isTemplate;

        return $this;
    }

    /**
     * Get isTemplate
     *
     * @return int
     */
    public function getIsTemplate()
    {
        return $this->isTemplate;
    }
}

