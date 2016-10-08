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
}
