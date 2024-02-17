<?php

namespace App\Controller;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class ArticleController extends AbstractController
{
    #[Route('/articles', name: 'app_article')]
    public function index(EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {

        $articles = $entityManager->getRepository(Article::class)->findAll();

        $articleJson = $serializer->serialize($articles,'json');

        return new JsonResponse($articleJson, Response::HTTP_OK, ['Content-Type' => 'application/json']);

    }
}
