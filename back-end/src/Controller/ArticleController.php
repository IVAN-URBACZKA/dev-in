<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
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

    #[Route('/articles/{slug}', name: 'app_article_single')]
    public function articleSingle(SerializerInterface $serializer, Article $article): JsonResponse
    {
        $articleJson = $serializer->serialize($article,'json');

        return new JsonResponse($articleJson, Response::HTTP_OK, ['Content-Type' => 'application/json']);


    }

    #[Route('/add/article', name:'app_article_add', methods:['POST', 'GET'])]
    public function addArticle(EntityManagerInterface $entityManager, Request $request):JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = new Article();
        $user->setName($data['name']);
        $user->setContent($data['content']);
       

        $entityManager->persist($user);
        $entityManager->flush();


        return new JsonResponse(Response::HTTP_OK);
    }

    #[Route('update/article', name:'app_article_update', methods:['POST', 'GET'])]
    public function updateArticle(EntityManagerInterface $entityManager, Request $request):JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $article = $entityManager->getRepository(Article::class)->findOneBy(['id' => $data['id']]);

        $article->setName($data['name']);
        $article->setContent($data['content']);

        $entityManager->persist($article);
        $entityManager->flush();

        return new JsonResponse(Response::HTTP_OK);
    }

    #[Route('/article/{id}', name: 'app_api_article_delete', methods:['GET', 'POST'])]
    public function deleteUser(Request $request, EntityManagerInterface $entityManager, Article $article): JsonResponse
    {
        $entityManager->remove($article);
        $entityManager->flush();

        return new JsonResponse(Response::HTTP_OK);
    }


}
