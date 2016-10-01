<?php

namespace SettingsBundle\Controller;

use AppBundle\Entity\OrganizationUnit;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use SettingsBundle\Entity\Trademark;
use TdsBundle\Entity\User;

class TrademarkController extends Controller
{

    /**
     * Matches /trademark/*
     *
     * @Route("/trademark/{id}", name="trademark_get")
     * @Method("GET")
     *
     * @param integer $id
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function readAction($id)
    {
        /** @var Trademark $trademark */
        $trademark = $this->get('doctrine')
            ->getRepository('SettingsBundle:Trademark')
            ->find((int)$id);

        return $this->json($trademark);
    }

    /**
     * Matches /trademark
     *
     * @Route("/trademark", name="trademark_list")
     * @Method("GET")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getListAction(Request $request) {
        $responseData = [];

        $trademarkList = $this->get('doctrine')
            ->getRepository('SettingsBundle:Trademark')
            ->findAll();;

        /** @var Trademark $trademark */
        foreach($trademarkList as $trademark) {
            $trademarkData['id']      = $trademark->getId();
            $trademarkData['name']    = $trademark->getName();
            $trademarkData['created_by'] = $trademark->getCreatedByUser()->getFirstName();
            $trademarkData['dt_created'] = $trademark->getDtCreated()->format('d.m.Y H:i:s');

            $responseData[] = $trademarkData;
        }

        return $this->json(array('success' => true, 'count' => count($responseData), 'data' => $responseData));
    }

    /**
     * Matches /trademark
     *
     * @Route("/trademark", name="trademark_create")
     * @Method("POST")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function createAction(Request $request)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        /** @var Trademark $trademark */
        $trademark = $this->get('doctrine')
            ->getRepository('SettingsBundle:Trademark')
            ->find((int)$request->get('id'));

        /**
         * @var OrganizationUnit $organizationUnit
         */
        $organizationUnit = $this->get('doctrine')
            ->getRepository('AppBundle:OrganizationUnit')
            ->find((int)$request->get('organization_unit_id'));

        $trademark->setName($request->get('name'))
                ->setCreatedByUser($user)
                ->setDtCreated(new \DateTime())
                ->setModifiedByUser($user)
                ->setOrganizationUnit($organizationUnit)
                ->setDtModified(new \DateTime());

        $em = $this->getDoctrine()->getManager();
        $em->persist($trademark);
        $em->flush();

        return $this->json(
            array(
                'success' => !empty($trademark->getId()) ? true : false,
                'id'      => $trademark->getId()
            )
        );
    }

    /**
     * Matches /trademark/*
     *
     * @Route("/trademark/{id}", name="trademark_update")
     * @Method("PUT")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function updateAction(Request $request)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        /** @var Trademark $trademark */
        $trademark = $this->get('doctrine')
            ->getRepository('SettingsBundle:Trademark')
            ->find((int)$request->get('id'));

        $organizationUnit = $this->get('doctrine')
        ->getRepository('AppBundle:OrganizationUnit')
        ->find((int)$request->get('organization_unit_id'));


        $trademark->setName($request->get('name'))
                ->setModifiedByUser($user)
                ->setDtModified(new \DateTime())
                ->setOrganizationUnit($organizationUnit);

        $em = $this->getDoctrine()->getManager();
        $em->persist($trademark);
        $em->flush();

        return $this->json(
            array(
                'success' => !empty($trademark->getId()) ? true : false,
                'id'      => $trademark->getId()
            )
        );
    }
}
