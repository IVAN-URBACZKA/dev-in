<?php

namespace App\DataFixtures;


use Faker\Factory;
use App\Entity\User;
use DateTimeImmutable;
use App\Entity\Article;
use Cocur\Slugify\Slugify;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{


    private $passwordHasher;

    public function __construct( UserPasswordHasherInterface $passwordHasher){
        $this->passwordHasher = $passwordHasher;
    }

    
    public function load(ObjectManager $manager): void
    {
        $plaintextPassword = "password";

        $faker = Factory::create();

        $user = new User();
        $user->setEmail("jean@gmail.com");
        $user->setUsername("jean");
        $user->setRoles(["ROLE_USER"]);  
                
        $hashedPassword = $this->passwordHasher->hashPassword(
                $user,
                $plaintextPassword
                );
        $user->setPassword($hashedPassword);

        
        $slugify = new Slugify();

        $article = new Article();
        $date = new DateTimeImmutable();

        $article->setName("Javascript ou Typescript")
                ->setContent('Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deserunt soluta incidunt ex. Maxime ipsa exercitationem voluptas explicabo sapiente ad maiores, vitae earum aliquam libero voluptates perspiciatis nesciunt, eius adipisci? ');

        $manager->persist($article);
        $manager->persist($user);

        $manager->flush();
    }
}
