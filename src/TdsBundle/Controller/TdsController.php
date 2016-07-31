<?php

namespace TdsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class TdsController extends Controller
{
    /**
     * Matches /tds/create
     *
     * @Route("/tds/create", name="tds_create")
     */
    public function createAction(Request $request)
    {
        var_dump(json_decode($request->getContent()));die();
    }

    /**
     * Matches /tds/update/*
     *
     * @Route("/tds/update/{id}", name="tds_update")
     */
    public function updateAction(Request $request)
    {
        var_dump(json_decode($request->getContent()));die();
    }

    /**
     * Matches /tds/read/*
     *
     * @Route("/tds/read/{id}", name="tds_get")
     */
    public function readAction($id)
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

    /**
     * Matches /tds/generate/*
     *
     * @Route("/tds/generate/{id}", name="tds_generate")
     */
    public function generateAction($id)
    {
        $this->get('knp_snappy.image')->generate('http://www.google.fr', '/web/test.jpg');
    }
}
