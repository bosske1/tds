<?php

namespace AppBundle\Controller;

use AppBundle\Entity\OrganizationUnit;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class OrganizationUnitController extends Controller
{
    /**
     * Matches /organizationunit
     *
     * @Route("/organizationunit", name="organization_unit_list")
     * @Method("GET")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getListAction(Request $request) {
        $responseData = [];

        $organizationUnitList = $this->get('doctrine')
            ->getRepository('AppBundle:OrganizationUnit')
            ->findAll();

        /** @var OrganizationUnit $segment */
        foreach($organizationUnitList as $organizationUnit) {
            $organizationUnitData['id']      = $organizationUnit->getId();
            $organizationUnitData['name']    = $organizationUnit->getName();
            $organizationUnitData['created_by'] = $organizationUnit->getCreatedByUser()->getFirstName();
            $organizationUnitData['dt_created'] = $organizationUnit->getDtCreated()->format('d.m.Y H:i:s');
            $organizationUnitData['modified_by'] = $organizationUnit->getModifiedByUser()->getFirstName();
            $organizationUnitData['dt_modified'] = $organizationUnit->getDtModified()->format('d.m.Y H:i:s');

            $responseData[] = $organizationUnitData;
        }

        return $this->json(array('success' => true, 'count' => count($responseData), 'data' => $responseData));
    }
}
