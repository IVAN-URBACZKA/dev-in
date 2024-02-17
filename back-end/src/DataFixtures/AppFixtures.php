<?php

namespace App\DataFixtures;

use DateTimeImmutable;
use App\Entity\Article;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $article = new Article();
        $date = new DateTimeImmutable();

        $article->setName('Jean')
                ->setCreatedAt($date)
                ->setContent('Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deserunt soluta incidunt ex. Maxime ipsa exercitationem voluptas explicabo sapiente ad maiores, vitae earum aliquam libero voluptates perspiciatis nesciunt, eius adipisci? ');

        $manager->persist($article);

        $manager->flush();
    }
}
