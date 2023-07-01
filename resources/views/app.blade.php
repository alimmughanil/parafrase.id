<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description"
        content="parafrase.id merupakan alat yang dapat digunakan untuk mengubah atau menyajikan ulang teks dengan cara yang baru dan orisinal. Dengan menggunakan algoritma canggih, tool ini mampu mengganti kata-kata dan frase dalam teks asli dengan sinonim atau ekspresi yang setara, sehingga menghasilkan hasil yang unik dan berbeda. Dengan fitur-fitur seperti deteksi plagiat dan kemampuan untuk mempertahankan makna inti dari teks, tool parafrase online ini membantu penulis, siswa, dan peneliti dalam menciptakan konten yang segar, tanpa risiko plagiarisme. Coba sekarang dan tingkatkan kreativitas tulisan Anda dengan tool parafrase online bahasa Indonesia!">

    <meta name="keywords"
        content="Tool parafrase online, Parafrase bahasa Indonesia, Alat ubah teks, Ganti kata online, Sinonim generator, Rephrasing tool, Rewording tool, Tool menghindari plagiarisme, Tool menulis ulang teks, Algoritma parafrase, Alat pengganti kata-kata, Tool menciptakan variasi teks, Alat penulis kreatif, Alat menyajikan ulang teks, Generator teks baru, Alat menghasilkan konten unik, Tool mengubah frasa, Alat menghindari duplikasi teks, Alat membuat tulisan orisinal, Tool mengembangkan ide tulisan.">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
