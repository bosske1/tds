<?php

namespace TdsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use TdsBundle\Entity\Tds;
use AppBundle\Entity\User;
use TdsBundle\Security\TdsVoter;

class TdsController extends Controller
{
    /**
     * Matches /tds
     *
     * @Route("/tds", name="tds_create")
     * @Method("POST")
     */
    public function createAction(Request $request)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        /** @var Tds $tds */
        $tds = new Tds();
        $tds->setName('test')
            ->setCreatedByUser($user)
            ->setDtCreated(new \DateTime())
            ->setData($request->get('data'))
            ->setModifiedByUser($user)
            ->setDtModified(new \DateTime());

        $em = $this->getDoctrine()->getManager();
        $em->persist($tds);
        $em->flush();

        return $this->json(
            array(
                'success' => !empty($tds->getId()) ? true : false,
                'id'      => $tds->getId()
            )
        );
    }

    /**
     * Matches /tds/*
     *
     * @Route("/tds/{id}", name="tds_update")
     * @Method("PUT")
     */
    public function updateAction(Request $request)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $tds = $this->get('doctrine')
            ->getRepository('TdsBundle:Tds')
            ->find((int)$request->get('id'));

        if(!$this->isGranted(TdsVoter::EDIT, $tds)){
            throw new \Exception('You cannot edit this TDS!');
        }

        /** @var Tds $tds */
        $tds->setData($request->get('data'))
            ->setModifiedByUser($user)
            ->setDtModified(new \DateTime());

        $em = $this->getDoctrine()->getManager();
        $em->persist($tds);
        $em->flush();

        return $this->json(
            array(
                'success' => !empty($tds->getId()) ? true : false,
                'id'      => $tds->getId()
            )
        );
    }

    /**
     * Matches /tds/*
     *
     * @Route("/tds/{id}", name="tds_get")
     * @Method("GET")
     */
    public function readAction($id)
    {
        /** @var Tds $tds */
        $tds = $this->get('doctrine')
            ->getRepository('TdsBundle:Tds')
            ->find((int)$id);

        if(!$this->isGranted(TdsVoter::READ, $tds)){
            throw new \Exception('You cannot read this TDS!');
        }

        return $this->json(array(
            'id'   => $id,
            'data' => json_decode($tds->getData(), true)
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

        if(!$fileName){
            throw new \Exception('File not created!');
        }

        return $this->json(
            array(
                'file_name' => $fileName
            )
        );
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
     * Matches /tds
     *
     * @Route("/tds", name="tds_list")
     * @Method("GET")
     */
    public function getListAction(Request $request)
    {

        $responseData = [];

        $tdsList = $this->get('doctrine')
            ->getRepository('TdsBundle:Tds')
            ->findByFilters($request->get('filter'));

        /** @var Tds $tds */
        foreach($tdsList as $tds) {
            $tdsData['id']      = $tds->getId();
            $tdsData['name']    = $tds->getName();
            $tdsData['created_by'] = $tds->getCreatedByUser()->getFirstName();
            $tdsData['dt_created'] = $tds->getDtCreated()->format('Y/m/d H:i:s');
            $tdsData['can_read'] = $this->isGranted(TdsVoter::READ, $tds);
            $tdsData['can_edit'] = $this->isGranted(TdsVoter::EDIT, $tds);;

            $responseData[] = $tdsData;
        }

        return $this->json(array('success' => true, 'count' => count($responseData), 'data' => $responseData));
    }
}
