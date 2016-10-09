<?php

namespace TdsBundle\Services;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Query\ResultSetMapping;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * TdsSearchingService
 *
 * Search for tds based on filter request param
 */
class TdsSearchingService
{

    /**
     * \Doctrine\ORM\QueryBuilder $queryBuilder
     */
    protected $queryBuilder;

    private $request;
    private $entityManager;

    public function __construct(RequestStack $requestStack, EntityManager $entityManager)
    {
        $this->request       = $requestStack->getCurrentRequest();
        $this->entityManager = $entityManager;
    }

    public function findByFilters() {
        return $this->setQueryBuilder()->setFilters($this->request->get('filter'))->getResult();
    }

    protected function setQueryBuilder()
    {
        $this->queryBuilder = $this->entityManager->getRepository('TdsBundle\Entity\Tds')->createQueryBuilder('t');

        return $this;
    }

    protected function setFilters($filter)
    {
        if(!$filter){
            $filter = array();
        }

        $filterIndex = 0;
        foreach($filter as $filterKey => $filterValue){
            $this->assignFilter($filterIndex, $filterKey, $filterValue);

            $filterIndex++;
        }

        return $this;
    }

    protected function assignFilter($filterIndex, $filterKey, $filterValue)
    {
        if($filterIndex === 0){
            return $this->queryBuilder->where("t.{$filterKey} = '{$filterValue}'");
        }

        return $this->queryBuilder->andWhere("t.{$filterKey} = '{$filterValue}'");
    }

    protected function getResult()
    {
        return $this->queryBuilder->getQuery()->getResult();
    }
}
