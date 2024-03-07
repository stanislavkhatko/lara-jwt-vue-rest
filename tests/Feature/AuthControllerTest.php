<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use function Psy\debug;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_not_list_users_except_authenticated_user()
    {
        $response = $this->getJson('/api/users');

        $response->assertStatus(401)
            ->assertJson(['error' => 'Unauthorized']);
    }

    public function test_user_can_login_with_valid_credentials()
    {
        // Create a user
        $user = User::factory()->create([
            'name' => 'Test',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        // Make a POST request to the login endpoint
        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        // Assert the response status code is 200 (OK)
        $response->assertStatus(200)
            // Assert the response contains the access token
            ->assertJsonStructure(['access_token', 'token_type', 'user']);

        $user->delete();
    }

    /** @test */
    public function test_user_cannot_login_with_invalid_credentials()
    {
        // Make a POST request to the login endpoint with invalid credentials
        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'invalid-password',
        ]);

        // Assert the response status code is 401 (Unauthorized)
        $response->assertStatus(401)
            // Assert the response contains an error message
            ->assertJson(['error' => 'Unauthorized']);
    }

    /** @test */
    public function test_user_can_register_with_valid_data()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $response = $this->postJson('/api/auth/register', $userData);

        $response->assertStatus(200)
            ->assertJsonStructure(['access_token', 'token_type', 'user']);

        $user = User::where('email', 'john@example.com')->first();

        if ($user) $user->delete();
    }

    /** @test */
    public function test_user_cannot_register_with_invalid_data()
    {
        $userData = [
            // Invalid data, missing name
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $response = $this->postJson('/api/auth/register', $userData);

        $response->assertStatus(400);
//            ->assertJsonValidationErrors(['name']);
    }

    /** @test */
//    public function user_can_get_authenticated_user_details()
//    {
//        $user = User::factory()->create();
//
//        $response = $this->actingAs($user)->getJson('/api/user');
//
//        $response->assertStatus(200)
//            ->assertJson($user->toArray());
//    }

}
