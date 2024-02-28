<?php
namespace App\Controller;

use App\Service\ValidationService;
use App\Service\AuthenticationService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiLoginController extends AbstractController
{
    #[Route('/api/login', name: 'app_api_login')]
    public function index(Request $request, AuthenticationService $authenticationService, ValidationService $validationService): JsonResponse
    {
        $credentials = json_decode($request->getContent(), true);
    
        $errors = $validationService->validateLoginCredentials($credentials);
        if (!empty($errors)) {
            return $this->json(['errors' => $errors], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        $token = $authenticationService->authenticate($credentials['email'], $credentials['password']);
    
        if (!$token) {
            return $this->json(['error' => 'Invalid credentials.'], JsonResponse::HTTP_UNAUTHORIZED);
        }
    
        return $this->json(['message' => 'Login successful.', 'token' => $token]);
    }
    
}
