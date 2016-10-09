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
     * @Route("/template/{id}", name="template_get", requirements={"id": "\d+"})
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

        $tdsList = $this->get('tds.searchingService')->findByFilters();

        /** @var Tds $tds */
        foreach($tdsList as $tds) {
            $tdsData['id']      = $tds->getId();
            $tdsData['name']    = $tds->getName();
            $tdsData['createdBy'] = $tds->getCreatedByUser()->getFirstName();
            $tdsData['dtCreated'] = $tds->getDtCreated()->format('Y/m/d H:i:s');
            $tdsData['can_read'] = $this->isGranted(TdsVoter::READ, $tds);
            $tdsData['can_edit'] = $this->isGranted(TdsVoter::EDIT, $tds);;

            $responseData[] = $tdsData;
        }

        return $this->json(array('success' => true, 'count' => count($responseData), 'data' => $responseData));
    }

    /**
     * Matches /template/fetchTemplateBasedOnUser
     *
     * @Route("/template/fetchTemplateBasedOnUser", name="template_bre")
     * @Method("GET")
     */
    public function fetchTemplateBasedOnUser()
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        //for now just return first template
        /** @var Tds $tds */
        $tds = $this->get('doctrine')
            ->getRepository('TdsBundle:Tds')
            ->findOneBy(array('isTemplate' => 1, 'createdBy' => $user->getId()));

        return $this->json(array(
            'id'   => $tds->getId(),
            'data' => json_decode($tds->getData(), true)
        ));
    }
}
