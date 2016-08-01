<?php

namespace TdsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use TdsBundle\Entity\Tds;
use TdsBundle\Entity\User;
use TdsBundle\Security\TdsVoter;

class TdsController extends Controller
{
    /**
     * Matches /tds/create
     *
     * @Route("/tds/create", name="tds_create")
     */
    public function createAction(Request $request)
    {
        // No token for now, until we figure out entire login
        /** @var User $user */
        $user = $this->get('doctrine')
            ->getRepository('TdsBundle:User')
            ->find(1);

        /** @var Tds $tds */
        $tds = new Tds();
        $tds->setName('test')
            ->setCreatedByUser($user)
            ->setDtCreated(new \DateTime())
            ->setData($request->get('data'));

        $em = $this->getDoctrine()->getManager();
        $em->persist($tds);
        $em->flush();

        return new JsonResponse(
            array(
                'success' => !empty($tds->getId()) ? true : false,
                'id'      => $tds->getId()
            )
        );
    }

    /**
     * Matches /tds/update/*
     *
     * @Route("/tds/update/{id}", name="tds_update")
     */
    public function updateAction(Request $request)
    {
        // No token for now, until we figure out entire login
        /** @var User $user */
        $user = $this->get('doctrine')
            ->getRepository('TdsBundle:User')
            ->find(1);

        $tds = $this->get('doctrine')
            ->getRepository('TdsBundle:Tds')
            ->find((int)$request->get('id'));

        //new cool voter functionality
        if(!$this->isGranted(TdsVoter::EDIT, $tds)){

        }
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
     * Matches /tds/generate
     *
     * @Route("/tds/generate", name="tds_generate")
     */
    public function generateAction(Request $request)
    {
        //based on serialization data create html container and render it to pdf file... for now just login as test
        $html = $this->renderView('TdsBundle:Tds:login.html.twig');

        $fileName = $this->generateFileName($html);

        if($fileName){
            return new JsonResponse(
                array(
                    'file_name' => $fileName
                )
            );
        }
    }

    protected function generateFileName($html)
    {
        $fileName = 'test.pdf';

        $this->get('knp_snappy.pdf')->generateFromHtml(
            $html,
            $this->get('kernel')->getPdfDir() . '/' . $fileName
        );

        return $fileName;
    }

    /**
     * Matches /tds/list
     *
     * @Route("/tds/list", name="tds_list")
     */
    public function getListAction(){
        $data = [
            ['name' => 'Mrkcina',
            'created_by' => 'napravo neko',
            'dt_created' => '01-03-1968'],
            ['name' => 'Stogodus',
            'created_by' => 'Nemanja',
            'dt_created' => '01-03-1968']
        ];

        return  new JsonResponse(array('success' => true, 'count' => 4, 'data' => $data));
    }
}
