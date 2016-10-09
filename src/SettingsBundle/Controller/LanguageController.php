<?php

namespace SettingsBundle\Controller;

use AppBundle\Entity\OrganizationUnit;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use SettingsBundle\Entity\Language;
use AppBundle\Entity\User;
use AppBundle\Entity\Lang;

class LanguageController extends Controller
{
    /**
     * Matches /language/*
     *
     * @Route("/language/{id}", name="language_get")
     * @Method("GET")
     *
     * @param integer $id
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function readAction($id)
    {
        /** @var Language $language */
        $language = $this->get('doctrine')
            ->getRepository('SettingsBundle:Language')
            ->find((int)$id);

        return $this->json($language);
    }

    /**
     * Matches /language
     *
     * @Route("/language", name="language_list")
     * @Method("GET")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getListAction(Request $request) {
        $languageList = $this->get('doctrine')
            ->getRepository('SettingsBundle:Language')
            ->findAll();

        return $this->json(array(
            'success'   => true,
            'count'     => count($languageList),
            'data'      => $languageList
        ));
    }

    /**
     * Matches /language
     *
     * @Route("/language", name="language_create")
     * @Method("POST")
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function createAction(Request $request)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        /** @var OrganizationUnit $organizationUnit */
        $organizationUnit = $this->get('doctrine')
            ->getRepository('AppBundle:OrganizationUnit')
            ->find($request->get('organizationUnitId'));

        /** @var Lang $lang */
        $lang = $this->get('doctrine')
            ->getRepository('AppBundle:Lang')
            ->find($request->get('langId'));

        /** @var Language $language */
        $language = new Language();

        /** @var Language $language */
        $language->setLang($lang)
            ->setCreatedByUser($user)
            ->setDtCreated(new \DateTime())
            ->setModifiedByUser($user)
            ->setOrganizationUnit($organizationUnit)
            ->setDtModified(new \DateTime());

        $em = $this->getDoctrine()->getManager();
        $em->persist($language);
        $em->flush();

        return $this->json(array(
                'success' => !empty($language->getId()) ? true : false,
                'id'      => $language->getId()
        ));
    }


    /**
     * Matches /language/*
     *
     * @Route("/language/{id}", name="language_update")
     * @Method("PUT")
     *
     * @param Request $request
     * @param $id
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function updateAction(Request $request, $id)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        /** @var OrganizationUnit $organizationUnit */
        $organizationUnit = $this->get('doctrine')
            ->getRepository('AppBundle:OrganizationUnit')
            ->find($request->get('organizationUnitId'));

        /** @var Lang $lang */
        $lang = $this->get('doctrine')
            ->getRepository('AppBundle:Lang')
            ->find($request->get('langId'));

        $language = $this->get('doctrine')
            ->getRepository('SettingsBundle:Language')
            ->find((int)$id);

        /** @var Language $language */
        $language->setLang($lang)
            ->setOrganizationUnit($organizationUnit)
            ->setModifiedByUser($user)
            ->setDtModified(new \DateTime());

        $em = $this->getDoctrine()->getManager();
        $em->persist($language);
        $em->flush();

        return $this->json(array(
            'success' => !empty($language->getId()) ? true : false,
            'id'      => $language->getId()
        ));
    }

    /**
     * Matches /language/*
     *
     * @Route("/language/{id}", name="language_delete")
     * @Method("DELETE")
     *
     * @param Request $request
     * @param $id
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function deleteAction(Request $request, $id)
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        /** @var Language $language */
        $language = $this->get('doctrine')
            ->getRepository('SettingsBundle:Language')
            ->find((int)$id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($language);
        $em->flush();

        return $this->json(
            array(
                'success' => true
            )
        );
    }
}
