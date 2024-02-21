<?php

namespace App\DataFixtures;

use DateTimeImmutable;
use App\Entity\Article;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Cocur\Slugify\Slugify;


class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $slugify = new Slugify();

        $article = new Article();
        $date = new DateTimeImmutable();

        $article->setName("Javascript ou Typescript")
                ->setContent('Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deserunt soluta incidunt ex. Maxime ipsa exercitationem voluptas explicabo sapiente ad maiores, vitae earum aliquam libero voluptates perspiciatis nesciunt, eius adipisci? ');

        $manager->persist($article);

        $manager->flush();
    }
}
