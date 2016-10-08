<?php

namespace TdsBundle\Repository;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\Query\ResultSetMapping;
use Symfony\Component\HttpFoundation\Request;

/**
 * TdsRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class TdsRepository extends \Doctrine\ORM\EntityRepository
{

    /**
     * \Doctrine\ORM\QueryBuilder $queryBuilder
     */
    protected $queryBuilder;

    public function findByFilters($filter) {
        return $this->setQueryBuilder()->setFilters($filter)->getResult();
    }

    protected function setQueryBuilder()
    {
        $this->queryBuilder = $this->getEntityManager()->getRepository('TdsBundle\Entity\Tds')->createQueryBuilder('t');

        return $this;
    }

    protected function setFilters($filter)
    {
        foreach($filter as $filterKey => $filterValue){

            $this->queryBuilder->where("t.{$filterKey} = :{$filterKey}")->setParameter("{$filterKey}", "{$filterValue}");
        }



        return $this;
    }

    protected function getResult()
    {
        return $this->queryBuilder->getQuery()->getResult();
    }
}
