<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserControllerTest extends TestCase
{
    protected $user;
    protected $token;

    /**
     * Add Authorization header to the request.
     *
     * @return \Illuminate\Testing\TestResponse
     */
    protected function addRequestHeader()
    {
        // Make the request with the Authorization header
        return $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->actingAs($this->user);
    }

    /**
     * Setup the test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        // Perform setup actions here and create token. Make user accesible
        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);
    }

    public function test_it_can_list_users_except_authenticated_user()
    {
        $anotherUser = User::factory()->create();

        $response = $this->addRequestHeader()->getJson('/api/users');

        $response->assertStatus(200)
            ->assertJsonMissing(['id' => $this->user->id])
            ->assertJsonFragment(['id' => $anotherUser->id]);
    }

    /** @test */
    public function it_can_store_user()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john1@example.com',
            'password' => 'password',
        ];

        $response = $this->addRequestHeader()->postJson('/api/users', $userData);

        $response->assertStatus(200);

        $user = User::where('email', 'john1@example.com')->first();

        if ($user) $user->delete();
    }

    /** @test */
    public function it_can_show_user()
    {
        $response = $this->addRequestHeader()->getJson("/api/users/{$this->user->id}");

        $response->assertStatus(200)
            ->assertJson($this->user->toArray());
    }

    /** @test */
    public function it_can_update_user()
    {
        $user = User::factory()->create();

        $response = $this->addRequestHeader()->putJson("/api/users/{$user->id}", ['name' => 'Updated Name']);

        $response->assertStatus(200)
            ->assertJson(['name' => 'Updated Name']);

        $this->assertEquals('Updated Name', $user->fresh()->name);

        $user->delete();
    }

    /** @test */
    public function it_can_delete_user()
    {
        $user = User::factory()->create();

        $response = $this->addRequestHeader()->delete("/api/users/{$user->id}");

        $response->assertStatus(200)
            ->assertJson(['success' => true]);
    }
}
