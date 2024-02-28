<?php
namespace App\Service;

class ValidationService
{
    public function validateLoginCredentials(array $credentials): array
    {
        $errors = [];
        if (empty($credentials['email'])) {
            $errors['email'] = 'Email is required.';
        }

        if (empty($credentials['password'])) {
            $errors['password'] = 'Password is required.';
        }

        return $errors;
    }
}
