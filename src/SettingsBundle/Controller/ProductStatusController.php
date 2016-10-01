<?php

namespace SettingsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use SettingsBundle\Entity\ProductStatus;
use TdsBundle\Entity\User;

class ProductStatusController extends Controller
{
    /**
     * Matches /productStatuses/*
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
}
