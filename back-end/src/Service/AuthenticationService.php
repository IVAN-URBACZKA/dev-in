<?php
namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class AuthenticationService
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;
    private JWTTokenManagerInterface $JWTManager;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $JWTManager
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->JWTManager = $JWTManager;
    }

    public function authenticate(string $email, string $password): ?string
    {
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        if (!$user || !$this->passwordHasher->isPasswordValid($user, $password)) {
            return null;
        }

        return $this->JWTManager->create($user);
    }
}
