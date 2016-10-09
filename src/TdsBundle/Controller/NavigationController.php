<?php

namespace TdsBundle\Controller;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use TdsBundle\Entity\Filter;

class NavigationController extends Controller
{
    /**
     * @Route("/navigation/get")
     */
    public function getAction()
    {
        $data = array(
            array(
                'label'     => 'Dashboard',
                'link'      => 'dashboard',
                'icon'      => 'fa fa-fw fa-dashboard',
                'active'    => true,
                'visible'   => true
            ),
            array(
                'label'     => 'Settings',
                'link'      => 'set-options',
                'icon'      => 'fa fa-fw fa-wrench',
                'visible'   => true,
                'children'  => array(
                    array(
                        'label'     => 'Segments',
                        'link'      => 'settings/segments',
                        'visible'   => true
                    ),
                    array(
                        'label'     => 'Product statuses',
                        'link'      => 'settings/productStatuses',
                        'visible'   => true
                    ),
                    array(
                        'label'     => 'Trademarks',
                        'link'      => 'settings/trademarks',
                        'visible'   => true
                    ),
                    array(
                        'label'     => 'Pre-fixes',
                        'link'      => 'settings/prefixes',
                        'visible'   => true
                    ),
                    array(
                        'label'     => 'Labels',
                        'link'      => 'settings/labels',
                        'visible'   => true
                    ),
                    array(
                        'label'     => 'Units',
                        'link'      => 'settings/units',
                        'visible'   => true
                    ),
                    array(
                        'label'     => 'Languages',
                        'link'      => 'settings/lang',
                        'visible'   => true
                    )
                )
            ),
            array(
                'label'     => 'Templates',
                'link'      => 'templates',
                'icon'      => 'fa fa-files-o',
                'visible'   => true
            ),
            array(
                'label'     => 'Translate',
                'link'      => 'translate',
                'icon'      => 'fa fa-language',
                'visible'   => true
            ),
            array(
                'label'     => 'Create TDS',
                'link'      => 'tds/create',
                'icon'      => 'fa fa-fw fa-edit',
                'visible'   => true
            ),
            array(
                'label'     => 'Search',
                'link'      => 'filter',
                'icon'      => 'fa fa-list-ul',
                'visible'   => true,
                'children'  => $this->getSearchData()
            )
        );

        return $this->json(array(
            'success' => true,
            'length'    => count($data),
            'data' => $data
        ));
    }

    protected function getSearchData()
    {
        $filterData = array();

        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $filterList = $this->get('doctrine')
            ->getRepository('TdsBundle:Filter')
            ->findBy(array('createdBy' => $user->getId()));

        /** @var Filter $filter */
        foreach($filterList as $filter){
            $filterData[] = array(
                'label'   => $filter->getName(),
                'link'    => 'tds/filter/' . $filter->getId(),
                'visible' => true
            );
        }

        return $filterData;
    }
}
