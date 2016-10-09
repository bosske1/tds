<?php

namespace SettingsBundle\Entity;

use AppBundle\Entity\AbstractEntity;
use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\OrganizationUnit;

/**
 * Language
 *
 * @ORM\Table(name="languages")
 * @ORM\Entity(repositoryClass="SettingsBundle\Repository\LanguageRepository")
 */
class Language extends AbstractEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Lang")
     * @ORM\JoinColumn(name="lang_id", referencedColumnName="id")
     */
    private $lang;

    /**
     * @var int
     *
     * @ORM\Column(name="lang_id", type="integer")
     */
    protected $langId;

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
     * @return mixed
     */
    public function getLang()
    {
        return $this->lang;
    }

    /**
     * @param mixed $lang
     */
    public function setLang($lang)
    {
        $this->lang = $lang;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLangId()
    {
        return $this->langId;
    }

    /**
     * @param mixed $langId
     */
    public function setLangId($langId)
    {
        $this->langId = $langId;

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
     */
    public function setOrganizationUnitId($organizationUnitId)
    {
        $this->organizationUnitId = $organizationUnitId;

        return $this;
    }
}

