<?php 

namespace App\Service;

use Symfony\Component\Validator\Validator\ValidatorInterface;

class DataValidatorService
{
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function validate($entity)
    {
        $errors = $this->validator->validate($entity);
        $errorMessages = [];

        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()][] = $error->getMessage();
            }
        }

        return $errorMessages;
    }
}
