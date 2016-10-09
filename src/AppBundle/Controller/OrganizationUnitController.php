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

        return $this->json(array(
            'success' => true,
            'count' => count($responseData),
            'data' => $organizationUnitList)
        );
    }
}
