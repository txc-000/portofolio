<?php

namespace Database\Seeders;

use App\Models\Experience;
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
                'name' => 'Faidzul Umam',
                'title' => 'Fullstack Web Developer',
                'bio' => "Fullstack Developer yang suka membangun aplikasi web modern dari ujung ke ujung — dari frontend yang interaktif sampai infrastruktur server yang stabil.\n\nBerlatar belakang Teknik Informatika dari UDINUS, dengan pengalaman langsung memakai React.js dan Laravel untuk proyek-proyek yang lebih kompleks.\n\nTertarik juga pada arsitektur jaringan dan server high-availability memakai Linux dan Nginx.",
                'photo_url' => '/images/profile.jpg',
                'email' => 'umamfaidzul@gmail.com',
                'location' => 'Semarang, Indonesia',
                'phone' => '0812-2878-2538',
                'cv_url' => '/documents/CV_FaidzulUmam_2026.pdf',
                'social_links' => [
                    'github' => 'https://github.com/txc-000',
                    'linkedin' => 'https://www.linkedin.com/in/faidzul-umam',
                ],
                'skills' => [
                    'JavaScript', 'TypeScript', 'PHP',
                    'React.js', 'HTML', 'CSS', 'Vite',
                    'Node.js', 'Laravel', 'RESTful API',
                    'PostgreSQL', 'Supabase',
                ],
                'tools' => [
                    'Git', 'GitHub', 'Docker', 'Vercel', 'Figma', 'VS Code',
                    'Cisco Packet Tracer', 'Mikrotik',
                ],
            ]
        );

        Experience::query()->delete();

        $experiences = [
            [
                'role' => 'Fullstack Developer',
                'organization' => 'MHB Bakul (Skripsi Project)',
                'type' => 'project',
                'period' => 'Ags 2026 – Sekarang',
                'description' => 'Merancang & membangun sistem informasi POS dan manajemen gudang berbasis web untuk bisnis grosir sepatu/sandal, dengan 4 role pengguna (Owner, Sales, Kasir, Gudang) dan alur kerja terpisah per role | Mendesain dan mengimplementasikan algoritma pembagian stok proporsional untuk penjualan dus sebagian (setengah/sepertiga/seperempat dus) yang menjamin tiap paket penjualan tetap memuat seluruh ukuran secara adil — menggantikan pendekatan pembagian rentang ukuran yang konvensional | Membangun dashboard analitik (tren penjualan, kontribusi bulanan, ringkasan per kategori) dengan visualisasi data interaktif | Mengimplementasikan struktur kategori produk 2 level (segmen × tipe) dan sistem harga dinamis per pasar/pelanggan | Full-stack: REST API (Laravel) + SPA (React), dengan autentikasi berbasis role dan session-based auth (Sanctum).',
                'link' => null,
                'order' => 1,
            ],
            [
                'role' => 'Frontend Developer Intern',
                'organization' => 'PT Kreasi Bali Sasmita',
                'type' => 'internship',
                'period' => 'Jul 2026 – Okt 2026',
                'description' => 'Mengembangkan dan memelihara antarmuka pengguna berbasis Laravel Blade untuk platform web sustainability/ESG perusahaan | Melakukan migrasi komponen frontend dari data statis (hardcoded) menjadi data dinamis yang terhubung ke database, mencakup halaman listing dan detail | Mengimplementasikan empty state, penanganan gambar yang aman, serta logika tampilan kondisional (conditional rendering) berdasarkan ketersediaan data dari backend | Menulis automated test untuk memastikan tampilan frontend sesuai dengan kontrak data yang disediakan tim backend | Berkolaborasi dengan tim backend melalui alur kerja Git berbasis feature branch dan code review untuk menjaga konsistensi integrasi data.',
                'link' => null,
                'order' => 2,
            ],
            [
                'role' => 'Software Engineer Intern',
                'organization' => 'LPK Universal Japan Course',
                'type' => 'internship',
                'period' => 'Mar 2026 – Jul 2026',
                'description' => 'Membangun aplikasi ERP terpusat untuk menghubungkan data lintas divisi (Rekrutmen, Keuangan, Dokumen) | Mengembangkan frontend interaktif dengan React.js dan Vite, termasuk fitur Gantt chart dan cetak PDF otomatis | Merancang backend dengan Supabase/PostgreSQL dan Role-Level Security.',
                'link' => null,
                'order' => 3,
            ],
            [
                'role' => 'Fullstack Web Developer',
                'organization' => 'Tuku-Tiket',
                'type' => 'project',
                'period' => 'Feb 2026',
                'description' => 'Aplikasi web untuk cari dan pesan tiket acara secara online | Autentikasi pengguna aman pakai Supabase | UI modern dengan filter kategori dan transaksi real-time.',
                'link' => null,
                'order' => 4,
            ],
            [
                'role' => 'Fullstack Web Developer',
                'organization' => 'Sistem Manajemen Gudang Grosir Sepatu (v1)',
                'type' => 'project',
                'period' => 'Jan 2026',
                'description' => 'Aplikasi manajemen inventaris kustom untuk bisnis grosir sepatu, bantu pantau supply chain lebih efisien | Autentikasi pengguna dan data real-time pakai React dan Supabase | Deploy ke production dengan CI/CD di Vercel.',
                'link' => null,
                'order' => 5,
            ],
        ];

        foreach ($experiences as $experience) {
            Experience::query()->create($experience);
        }

        Portfolio::query()->delete();

        $portfolios = [
            [
                'title' => 'MHB Bakul — Sistem Informasi POS & Manajemen Gudang Grosir Sepatu/Sandal',
                'category' => 'website',
                'description' => 'MHB Bakul adalah sistem informasi POS (Point of Sale) dan manajemen gudang berbasis web yang dirancang untuk bisnis grosir sepatu dan sandal, dikembangkan sebagai proyek skripsi menggunakan metode RAD (Rapid Application Development). Sistem ini mendukung 4 peran pengguna dengan alur kerja masing-masing — Owner (dashboard analitik, master data, harga), Sales (input pesanan lapangan), Kasir (transaksi POS & verifikasi), dan Gudang (monitor stok, barang masuk, audit). Kontribusi teknis utama proyek ini adalah algoritma pembagian stok proporsional yang menyelesaikan masalah nyata di lapangan: memastikan penjualan sebagian dus (bukan 1 dus utuh) tetap membagi setiap ukuran secara adil dan merata ke setiap paket, alih-alih memotong berdasarkan rentang ukuran yang berisiko membuat stok satu ukuran cepat habis. Sistem ini juga dilengkapi dashboard analitik dengan visualisasi tren penjualan, manajemen kategori produk berjenjang, serta skema harga dinamis per pasar dan per pelanggan.',
                'image_url' => null,
                'project_url' => null,
                'repo_url' => null,
                'tech_stack' => ['Laravel', 'Sanctum', 'MySQL', 'React', 'Vite', 'Zustand', 'Tailwind CSS', 'Recharts'],
                'order' => 1,
            ],
            [
                'title' => 'Sistem ERP LPK Universal Japan Course',
                'category' => 'website',
                'description' => 'Aplikasi ERP terpusat untuk menghubungkan data lintas divisi, lengkap dengan timeline Gantt chart dan cetak PDF otomatis.',
                'image_url' => null,
                'project_url' => null,
                'repo_url' => null,
                'tech_stack' => ['React.js', 'Vite', 'Supabase', 'PostgreSQL'],
                'order' => 2,
            ],
            [
                'title' => 'Tuku-Tiket',
                'category' => 'website',
                'description' => 'Cari dan pesan tiket acara secara online, dengan filter kategori dan transaksi real-time.',
                'image_url' => null,
                'project_url' => null,
                'repo_url' => null,
                'tech_stack' => ['React', 'Supabase'],
                'order' => 3,
            ],
            [
                'title' => 'Sistem Manajemen Gudang Grosir Sepatu (v1)',
                'category' => 'website',
                'description' => 'Manajemen inventaris kustom untuk bisnis grosir sepatu, bantu pantau supply chain lebih efisien.',
                'image_url' => null,
                'project_url' => null,
                'repo_url' => null,
                'tech_stack' => ['React', 'Supabase', 'Vercel'],
                'order' => 4,
            ],
        ];

        foreach ($portfolios as $portfolio) {
            Portfolio::query()->create($portfolio);
        }
    }
}
