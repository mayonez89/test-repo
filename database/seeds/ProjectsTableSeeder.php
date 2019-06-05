<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('projects')->insert([
            'name'          => 'Camkitty',
            'description'   => 'Camkitty is live webcam site',
            'live_url'      => 'https://camkitty.com',
            'stage_url'     => 'https://stage.camkitty.com',
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at'    => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('projects')->insert([
            'name'          => 'Bunnycam',
            'description'   => 'Bunnycam is live webcam site. It\'s clone of the Camkitty project',
            'live_url'      => 'https://bunnycam.com',
            'stage_url'     => 'https://stage.bunnycam.com',
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at'    => Carbon::now()->format('Y-m-d H:i:s')

        ]);
        DB::table('projects')->insert([
            'name'          => 'SportEdTV',
            'description'   => 'SportEdTV is sport coaching platform',
            'live_url'      => 'https://sportsedtv.com',
            'stage_url'     => 'https://stage.sportsedtv.com',
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at'    => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}
