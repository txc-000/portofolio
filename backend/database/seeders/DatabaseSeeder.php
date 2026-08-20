<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use App\Models\Profile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Profile::query()->updateOrCreate(
            ['id' => 1],
            [
                'name' => 'Nama Anda',
                'title' => 'Software Developer',
                'bio' => 'Tulis cerita singkat tentang diri Anda di sini. Ceritakan pengalaman, minat, dan apa yang membuat Anda unik sebagai profesional.',
                'photo_url' => null,
                'email' => 'nama@email.com',
                'social_links' => [
                    'github' => 'https://github.com/username',
                    'linkedin' => 'https://linkedin.com/in/username',
                    'instagram' => 'https://instagram.com/username',
                ],
                'skills' => ['PHP', 'Laravel', 'React', 'JavaScript', 'MySQL'],
            ]
        );

        $portfolios = [
            [
                'title' => 'Proyek Contoh Satu',
                'description' => 'Deskripsi singkat mengenai proyek ini, teknologi yang digunakan, dan peran Anda di dalamnya.',
                'image_url' => null,
                'project_url' => null,
                'repo_url' => null,
                'tech_stack' => ['React', 'Laravel'],
                'order' => 1,
            ],
            [
                'title' => 'Proyek Contoh Dua',
                'description' => 'Deskripsi singkat mengenai proyek ini, teknologi yang digunakan, dan peran Anda di dalamnya.',
                'image_url' => null,
                'project_url' => null,
                'repo_url' => null,
                'tech_stack' => ['Vue', 'Node.js'],
                'order' => 2,
            ],
            [
                'title' => 'Proyek Contoh Tiga',
                'description' => 'Deskripsi singkat mengenai proyek ini, teknologi yang digunakan, dan peran Anda di dalamnya.',
                'image_url' => null,
                'project_url' => null,
                'repo_url' => null,
                'tech_stack' => ['Flutter', 'Firebase'],
                'order' => 3,
            ],
        ];

        foreach ($portfolios as $portfolio) {
            Portfolio::query()->updateOrCreate(
                ['title' => $portfolio['title']],
                $portfolio
            );
        }
    }
}
