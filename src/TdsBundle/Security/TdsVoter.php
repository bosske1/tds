<?php

namespace TdsBundle\Security;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use TdsBundle\Entity\Tds;
use TdsBundle\Entity\User;

class TdsVoter extends Voter
{
    const READ = 'read';
    const EDIT = 'edit';

    public function supports($attribute, $subject)
    {
        return $subject instanceof Tds && in_array($attribute, array(
            self::READ, self::EDIT
        ));
    }

    /**
     * @param string $attribute
     * @param mixed $tds
     * @param TokenInterface $token
     * @return bool
     */
    protected function voteOnAttribute($attribute, $tds, TokenInterface $token)
    {

        if ($attribute === self::READ) {
            return true;
        }

        /* no token for now

        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }
        */

        //just return true, until we get user from token...
        return true;
    }
}