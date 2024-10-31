<?php

return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Here you may specify an array of paths that should be checked for
    | your views. Laravel will default to looking in the `resources/views`
    | directory. You are free to add additional paths as needed.
    |
    */

    'paths' => [
        resource_path('views'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Compiled View Path
    |--------------------------------------------------------------------------
    |
    | This option determines where compiled views will be stored for your
    | application. Typically, this is within the storage framework directory.
    |
    */

    'compiled' => realpath(storage_path('framework/views')),
];
