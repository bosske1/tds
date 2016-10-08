<?php

namespace SettingsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use SettingsBundle\Entity\Segment;
use AppBundle\Entity\User;

class SegmentController extends Controller
{

    /**
     * Matches /segment/*
     *
     * @Route("/segment/{id}", name="segment_get")
     * @Method("GET")
     *
     * @param integer $id
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function readAction($id)
    {
        /** @var Segment $segment */
        $segment = $this->get('doctrine')
            ->getRepository('SettingsBundle:Segment')
            ->find((int)$id);

        return $this->json($segment);
    }

    /**
     * Matches /segment
     *
     * @Route("/segment", name="segment_list")
     * @Method("GET")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getListAction(Request $request) {
        $responseData = [];

        $segmentList = $this->get('doctrine')
            ->getRepository('SettingsBundle:Segment')
            ->findAll();

        return $this->json(array('success' => true, 'count' => count($segmentList), 'data' => $segmentList));
    }

    /**
     * Matches /segment
     *
     * @Route("/segment", name="segment_create")
     * @Method("POST")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function createAction(Request $request)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();
        $organizationUnit = $this->get('doctrine')
            ->getRepository('AppBundle:OrganizationUnit')
            ->find($request->get('organizationUnitId'));

        $segment = new Segment();

        /** @var Segment $segment */
        $segment->setName($request->get('name'))
                ->setCreatedByUser($user)
                ->setDtCreated(new \DateTime())
                ->setModifiedByUser($user)
                ->setOrganizationUnit($organizationUnit)
                ->setDtModified(new \DateTime());

        $em = $this->getDoctrine()->getManager();
        $em->persist($segment);
        $em->flush();

        return $this->json(
            array(
                'success' => !empty($segment->getId()) ? true : false,
                'id'      => $segment->getId()
            )
        );
    }

    /**
     * Matches /segment/*
     *
     * @Route("/segment/{id}", name="segment_update")
     * @Method("PUT")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function updateAction(Request $request)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();
        $organizationUnit = $this->get('doctrine')
            ->getRepository('AppBundle:OrganizationUnit')
            ->find($request->get('organizationUnitId'));

        $segment = $this->get('doctrine')
            ->getRepository('SettingsBundle:Segment')
            ->find((int)$request->get('id'));

        /** @var Segment $segment */
        $segment->setName($request->get('name'))
                ->setOrganizationUnit($organizationUnit)
                ->setModifiedByUser($user)
                ->setDtModified(new \DateTime());

        $em = $this->getDoctrine()->getManager();
        $em->persist($segment);
        $em->flush();

        return $this->json(
            array(
                'success' => !empty($segment->getId()) ? true : false,
                'id'      => $segment->getId()
            )
        );
    }

    /**
     * Matches /segment/*
     *
     * @Route("/segment/{id}", name="segment_delete")
     * @Method("DELETE")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function deleteAction(Request $request, $id)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $segment = $this->get('doctrine')
            ->getRepository('SettingsBundle:Segment')
            ->find((int)$id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($segment);
        $em->flush();

        return $this->json(
            array(
                'success' => true
            )
        );
    }

}
