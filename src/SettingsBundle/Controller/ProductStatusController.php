<?php

namespace SettingsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use SettingsBundle\Entity\ProductStatus;
use AppBundle\Entity\User;

class ProductStatusController extends Controller
{
    /**
     * Matches /productStatus/*
     *
     * @Route("/productStatus/{id}", name="productStatus_get")
     * @Method("GET")
     *
     * @param $id
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function readAction($id)
    {
        /** @var productStatus $productStatus */
        $productStatus = $this->get('doctrine')
            ->getRepository('SettingsBundle:ProductStatus')
            ->find((int)$id);

        return $this->json($productStatus);
    }

    /**
     * Matches /productStatus
     *
     * @Route("/productStatus", name="productStatus_list")
     * @Method("GET")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getListAction(Request $request) {
        $responseData = [];

        $productStatusList = $this->get('doctrine')
            ->getRepository('SettingsBundle:ProductStatus')
            ->findAll();

        return $this->json(array('success' => true, 'count' => count($productStatusList), 'data' => $productStatusList));
    }

    /**
     * Matches /productStatus
     *
     * @Route("/productStatus", name="productStatus_create")
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

        $productStatus = new ProductStatus();

        /** @var ProductStatus $productStatus */
        $productStatus->setName($request->get('name'))
            ->setCreatedByUser($user)
            ->setDtCreated(new \DateTime())
            ->setModifiedByUser($user)
            ->setOrganizationUnit($organizationUnit)
            ->setDtModified(new \DateTime());

        $em = $this->getDoctrine()->getManager();
        $em->persist($productStatus);
        $em->flush();

        return $this->json(
            array(
                'success' => !empty($productStatus->getId()) ? true : false,
                'id'      => $productStatus->getId()
            )
        );
    }

    /**
     * Matches /productStatus/*
     *
     * @Route("/productStatus/{id}", name="productStatus_update")
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

        $productStatus = $this->get('doctrine')
            ->getRepository('SettingsBundle:ProductStatus')
            ->find((int)$request->get('id'));

        /** @var ProductStatus $productStatus */
        $productStatus->setName($request->get('name'))
            ->setOrganizationUnit($organizationUnit)
            ->setModifiedByUser($user)
            ->setDtModified(new \DateTime());

        $em = $this->getDoctrine()->getManager();
        $em->persist($productStatus);
        $em->flush();

        return $this->json(
            array(
                'success' => !empty($productStatus->getId()) ? true : false,
                'id'      => $productStatus->getId()
            )
        );
    }

    /**
     * Matches /productStatus/*
     *
     * @Route("/productStatus/{id}", name="productStatus_delete")
     * @Method("DELETE")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function deleteAction(Request $request, $id)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $productStatus = $this->get('doctrine')
            ->getRepository('SettingsBundle:ProductStatus')
            ->find((int)$id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($productStatus);
        $em->flush();

        return $this->json(
            array(
                'success' => true
            )
        );
    }
}
