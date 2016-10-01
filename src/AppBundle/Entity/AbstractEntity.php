<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class AbstractEntity
 * @package AppBundle\Entity
 */
abstract class AbstractEntity
{
	/**
	 * @var int
	 *
	 * @ORM\Column(name="id", type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	protected $id;

	/**
	 * @var int
	 *
	 * @ORM\Column(name="created_by", type="integer")
	 */
	protected $createdBy;

	/**
	 * @ORM\ManyToOne(targetEntity="TdsBundle\Entity\User")
	 * @ORM\JoinColumn(name="created_by", referencedColumnName="id")
	 */
	protected $createdByUser;

	/**
	 * @var \DateTime
	 *
	 * @ORM\Column(name="dt_created", type="datetime")
	 */
	protected $dtCreated;

	/**
	 * @var int
	 *
	 * @ORM\Column(name="modified_by", type="integer")
	 */
	protected $modifiedBy;

	/**
	 * @ORM\ManyToOne(targetEntity="TdsBundle\Entity\User")
	 * @ORM\JoinColumn(name="modified_by", referencedColumnName="id")
	 */
	protected $modifiedByUser;

	/**
	 * @var \DateTime
	 *
	 * @ORM\Column(name="dt_modified", type="datetime")
	 */
	protected $dtModified;

	/**
	 * @return int
	 */
	public function getId()
	{
		return $this->id;
	}

	/**
	 * @param int $id
	 * @return AbstractEntity
	 */
	public function setId($id)
	{
		$this->id = $id;

		return $this;
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
	 * @return AbstractEntity
	 */
	public function setDtModified($dtModified)
	{
		$this->dtModified = $dtModified;
		return $this;
	}

	/**
	 * @return int
	 */
	public function getCreatedBy()
	{
		return $this->createdBy;
	}

	/**
	 * @param int $createdBy
	 * @return AbstractEntity
	 */
	public function setCreatedBy($createdBy)
	{
		$this->createdBy = $createdBy;
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
	 * @param mixed $createdByUser
	 * @return AbstractEntity
	 */
	public function setCreatedByUser($createdByUser)
	{
		$this->createdByUser = $createdByUser;
		return $this;
	}

	/**
	 * @return \DateTime
	 */
	public function getDtCreated()
	{
		return $this->dtCreated;
	}

	/**
	 * @param \DateTime $dtCreated
	 * @return AbstractEntity
	 */
	public function setDtCreated($dtCreated)
	{
		$this->dtCreated = $dtCreated;
		return $this;
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
	 * @return AbstractEntity
	 */
	public function setModifiedBy($modifiedBy)
	{
		$this->modifiedBy = $modifiedBy;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getModifiedByUser()
	{
		return $this->modifiedByUser;
	}

	/**
	 * @param mixed $modifiedByUser
	 * @return AbstractEntity
	 */
	public function setModifiedByUser($modifiedByUser)
	{
		$this->modifiedByUser = $modifiedByUser;
		return $this;
	}

}