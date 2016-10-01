<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * OrganizationUnit
 *
 * @ORM\Table(name="organization_unit")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\OrganizationUnitRepository")
 */
class OrganizationUnit extends AbstractEntity
{
	/**
	 * @var string
	 *
	 * @ORM\Column(name="name", type="string", length=55)
	 */
	protected $name;

	/**
	 * @return string
	 */
	public function getName()
	{
		return $this->name;
	}

	/**
	 * @param string $name
	 * @return OrganizationalUnit
	 */
	public function setName($name)
	{
		$this->name = $name;
		return $this;
	}

}
