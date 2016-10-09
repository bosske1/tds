<?php

namespace AppBundle\Controller;

use AppBundle\Entity\OrganizationUnit;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class LangController extends Controller
{
    /**
     * Matches /lang
     *
     * @Route("/lang", name="lang_list")
     * @Method("GET")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getListAction(Request $request) {
        $langList = $this->get('doctrine')
            ->getRepository('AppBundle:Lang')
            ->findAll();

        return $this->json(array(
            'success' => true,
            'count' => count($langList),
            'data' => $langList)
        );
    }
}
