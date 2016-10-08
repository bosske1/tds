<?php

namespace TdsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\User;
use TdsBundle\Entity\Tds;
use TdsBundle\Security\TdsVoter;

class TemplateController extends Controller
{
    /**
     * Matches /template/*
     *
     * @Route("/template/{id}", name="template_get")
     * @Method("GET")
     */
    public function readAction($id)
    {
        /** @var Tds $tds */
        $tds = $this->get('doctrine')
            ->getRepository('TdsBundle:Tds')
            ->find((int)$id);

        if(!$this->isGranted(TdsVoter::READ, $tds)){
            throw new \Exception('You cannot read this TDS!');
        }

        return $this->json(array(
            'id'   => $id,
            'data' => json_decode($tds->getData(), true)
        ));
    }

    /**
     * Matches /template
     *
     * @Route("/template", name="template_list")
     * @Method("GET")
     */
    public function getListAction(Request $request)
    {
        $responseData = [];

        $tdsList = $this->get('doctrine')
            ->getRepository('TdsBundle:Tds')
            ->findByFilters($request->get('filter'));

        /** @var Tds $tds */
        foreach($tdsList as $tds) {
            $tdsData['id']      = $tds->getId();
            $tdsData['name']    = $tds->getName();
            $tdsData['created_by'] = $tds->getCreatedByUser()->getFirstName();
            $tdsData['dt_created'] = $tds->getDtCreated()->format('Y/m/d H:i:s');
            $tdsData['can_read'] = $this->isGranted(TdsVoter::READ, $tds);
            $tdsData['can_edit'] = $this->isGranted(TdsVoter::EDIT, $tds);;

            $responseData[] = $tdsData;
        }

        return $this->json(array('success' => true, 'count' => count($responseData), 'data' => $responseData));
    }
}
