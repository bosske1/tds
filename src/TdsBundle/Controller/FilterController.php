<?php

namespace TdsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\User;

class FilterController extends Controller
{
    /**
     * Matches /filter
     *
     * @Route("/filter", name="filter_create")
     * @Method("POST")
     */
    public function createAction(Request $request)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        return $this->json(
            array(
                'success' => true,
                'id'      => 1
            )
        );
    }

    /**
     * Matches /filter/*
     *
     * @Route("/filter/{id}", name="filter_update")
     * @Method("PUT")
     */
    public function updateAction(Request $request)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $id = $request->get('id');

        return $this->json(
            array(
                'success' => true,
                'id'      => $id
            )
        );
    }
}
