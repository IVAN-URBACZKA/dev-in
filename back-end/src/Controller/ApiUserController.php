<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\UserService;
use App\Service\DataValidatorService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ApiUserController extends AbstractController
{
    #[Route('/user', name: 'app_api_user', methods: ['GET', 'POST'])]
    public function createUser(Request $request, UserService $userService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $requiredFields = ['username', 'email', 'password'];
        $missingFields = array_filter($requiredFields, fn($field) => empty($data[$field]));
        if ($missingFields) {
            return $this->json(['error' => 'Missing data: ' . implode(', ', $missingFields)], Response::HTTP_BAD_REQUEST);
        }

        $user = $userService->createUser($data);

        if ($errorMessages = $userService->validateUser($user)) {
            return $this->json($errorMessages, Response::HTTP_BAD_REQUEST);
        }
       
        return $this->json(['message' => 'User created successfully', 'userId' => $user->getId()], Response::HTTP_CREATED);
    }

}
