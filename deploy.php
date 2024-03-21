<?php

namespace Deployer;

require 'recipe/laravel.php';

// Config

set('repository', 'https://github.com/stanislavkhatko/lara-jwt-vue-rest.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts

host('34.72.101.32')
//    ->set('http_user', 'deployer')
    ->set('http_user', 'www-data')
    ->set('remote_user', 'stan')
    ->set('deploy_path', '/home/stan');

// Hooks

after('deploy:failed', 'deploy:unlock');
