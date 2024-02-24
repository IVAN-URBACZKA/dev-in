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
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;


class ApiLoginController extends AbstractController
{
    #[Route('/api/login', name: 'app_api_login')]
    public function index(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasher, JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email']) || !isset($data['password'])) {
            return new JsonResponse(['error' => 'Email and password are required.'], Response::HTTP_BAD_REQUEST);
        }


        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);

        $token = $JWTManager->create($user);

        if($user && $userPasswordHasher->isPasswordValid($user, $data['password'])){
            
            return new JsonResponse(['message' => 'Login successful.', 'token' => $token], Response::HTTP_OK);
        }

        else{
            return new JsonResponse(['error' => 'Invalid credentials.'], Response::HTTP_UNAUTHORIZED);
        }


        
    }
}
