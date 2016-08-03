<?php

namespace TdsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class LoginController extends Controller
{
    /**
     * @Route("/login")
     */
    public function indexAction()
    {
        if($this->get('session')->get('token')){
            return $this->redirect('/');
        }

        return $this->render('TdsBundle:Tds:login.html.twig');
    }

    /**
     * @Route("/logout")
     */
    public function logoutAction()
    {
        $this->get('session')->clear();

        return $this->render('TdsBundle:Tds:login.html.twig');
    }
}
