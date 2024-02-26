<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ApiUserController extends AbstractController
{
    #[Route('/user', name: 'app_api_user', methods:['GET','POST'])]
    public function index(EntityManagerInterface $entityManager, Request $request, UserPasswordHasherInterface $userPasswordHasher): JsonResponse
    {
        
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $user->setUsername($data['username']);
        $user->setEmail($data['email']);
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $data["password"]
            )
        );

        $entityManager->persist($user);
        $entityManager->flush();


        return new JsonResponse($request->getContent());

    }
}
