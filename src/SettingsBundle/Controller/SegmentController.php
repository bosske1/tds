<?php

namespace SettingsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use SettingsBundle\Entity\Segment;
use TdsBundle\Entity\User;

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
            ->findAll();;

        /** @var Segment $segment */
        foreach($segmentList as $segment) {
            $segmentData['id']      = $segment->getId();
            $segmentData['name']    = $segment->getName();
            $segmentData['created_by'] = $segment->getCreatedByUser()->getFirstName();
            $segmentData['dt_created'] = $segment->getDtCreated()->format('d.m.Y H:i:s');

            $responseData[] = $segmentData;
        }

        return $this->json(array('success' => true, 'count' => count($responseData), 'data' => $responseData));
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

        $segment = $this->get('doctrine')
            ->getRepository('SettingsBundle:Segment')
            ->find((int)$request->get('id'));

        /** @var Segment $segment */
        $segment->setName($request->get('name'))
                ->setCreatedByUser($user)
                ->setDtCreated(new \DateTime())
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

        $segment = $this->get('doctrine')
            ->getRepository('SettingsBundle:Segment')
            ->find((int)$request->get('id'));

        /** @var Segment $segment */
        $segment->setName($request->get('name'))
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
}
