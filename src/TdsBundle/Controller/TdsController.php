<?php

namespace TdsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class TdsController extends Controller
{
    /**
     * Matches /tds/get/*
     *
     * @Route("/tds/get/{id}", name="tds_get")
     */
    public function getAction($id)
    {

        return new JsonResponse(array(
            'id' => $id,
            'data' => array(
                array('x' => 0, 'y' => 0, 'width' => 2, 'height' => 2),
                array('x' => 3, 'y' => 1, 'width' => 1, 'height' => 2),
                array('x' => 4, 'y' => 1, 'width' => 1, 'height' => 1),
                array('x' => 2, 'y' => 3, 'width' => 3, 'height' => 1)
            )
        ));
    }
}
