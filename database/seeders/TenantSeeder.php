<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tenant;

class TenantSeeder extends Seeder
{
    public function run(): void
    {
        $tenants = [
            [
                'room' => '01',
                'name' => 'Nicole Ednilan',
                'gender' => 'Female',
                'contact' => '0909090901',
                'email' => 'n.ednilan.sekret@edu.ph',
                'avatar' => 'avatar1.png',
            ],
            [
                'room' => '02',
                'name' => 'Faith Gawan',
                'gender' => 'Female',
                'contact' => '0909090902',
                'email' => 'f.gawan.sekret@edu.ph',
                'avatar' => 'avatar2.png',
            ],
            [
                'room' => '03',
                'name' => 'Joren Montejo',
                'gender' => 'Male',
                'contact' => '0909090903',
                'email' => 'j.montejo.sekret@edu.ph',
                'avatar' => 'avatar3.png',
            ],
            [
                'room' => '04',
                'name' => 'Spongebob Squarepants',
                'gender' => 'Male',
                'contact' => '0909090904',
                'email' => 's.bob.sekret@edu.ph',
                'avatar' => 'avatar4.png',
            ],
        ];

        foreach ($tenants as $tenant) {
            Tenant::create($tenant);
        }
    }
}
