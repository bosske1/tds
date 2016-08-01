<?php

namespace TdsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class NavigationController extends Controller
{
    /**
     * @Route("/navigation/get")
     */
    public function getAction()
    {
        return new JsonResponse(array(
            'data' => array(
                array(
                    'index'   => 'dashboard',
                    'link'    => '#dashboard',
                    'name'    => 'Dashboard',
                    'visible' => true
                ),
                array(
                    'index'   => 'settings',
                    'link'    => '#set-options',
                    'name'    => 'Settings',
                    'visible' => true,
                    'children'=> array(

                    )
                ),
                array(
                    'index'   => 'templates',
                    'link'    => '#templates',
                    'name'    => 'Templates',
                    'visible' => true
                )
            )
        ));
    }
}
