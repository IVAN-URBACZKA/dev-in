<?php
namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService
{
    private $entityManager;
    private $userPasswordHasher;
    private $dataValidatorService;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasher, DataValidatorService $dataValidatorService)
    {
        $this->entityManager = $entityManager;
        $this->userPasswordHasher = $userPasswordHasher;
        $this->dataValidatorService = $dataValidatorService;
    }

    public function createUser(array $data): User
    {
        $user = new User();
        $user->setUsername($data['username'])
             ->setEmail($data['email'])
             ->setRoles(['ROLE_USER'])
             ->setPassword($this->userPasswordHasher->hashPassword($user, $data['password']));
        
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }

    public function validateUser(User $user): array
    {
        return $this->dataValidatorService->validate($user);
    }
}
