# FiBadge

Visitor Badge untuk Website atau Github repository, dibuat dengan ❤ dan [NodeJs](https://nodejs.org/) oleh [Saya](https://github.com/feri-irawan).

Projek ini sangat mirip dengan projek visitor badge versi PHP saya sebelumnya, yaitu [Visitor Badge](https://github.com/feri-irawan/visitor-badge).

## Demo Langsung

[![Visitor Badge](https://fibadge.vercel.app/visitor/feri-irawan/fibadge)]([https://](https://fibadge.vercel.app/visitor/feri-irawan/fibadge))

Refresh halaman ini untuk melihat perubahan badge!

## Daftar Badge

Untuk saat ini badge yang sudah ada tersedia adalah:

- Visitor Badge
- Clones Badge

### Visitor Badge

Rute:

```plaintext
GET /visitor/:username/:repo
```

- `:username` Username kamu (bebas, tapi disarankan menggunakan username Github)
- `:repo` Nama repositori, (babas, tapi disarankan menggunakan nama repo yang sudah ada di github-mu)

Query string:
| Nama    | Deskripsi                                                                                                                                                                                                      |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label` | Untuk mengganti label default (`VISITOR`) dengan label lainnya, misalnya `label=views` atau `label=pengunjung`                                                                                                 |
| `color` | Untuk mengubah warna background badge, misalnya `color=red` atau `color=ff0000` (mendukung hex, rgb, rgba, hsl, hsla dan nama warna css)                                                                       |
| `style` | Untuk mengubah gaya badge, untuk nilainnya kamu bisa lihat style yang disediakan [shields.io](https://shields.io/), misal `style=social`, dll.                                                                 |
| `logo`  | Untuk menambahkan logo pada badge, misal `logo=github`, untuk daftar logo kamu bisa menggunakan logo yang disediakan oleh [Simple Icons](https://simpleicons.org/)                                             |
| `token` | Berisi Personal Access Token untuk menyamakan visitor asli dari repositori (mengambil data views dari Github API). Lihat [Panduan Penggunaan Personal Access Token](#panduan-penggunaan-personal-access-token) |
| `type`  | Untuk mengubah Content Type badge (default: `svg`), misalnya `type=png` untuk mengganti ke Content Type `png`                                                                                                  |

### Clones Badge

Rute:

```plaintext
GET /clones/:username/:repo/:token
```

- `:username` Username Github-mu.
- `:repo` Nama repositori yang sudah ada di Github-mu.
- `:token` Personal Access Token. Lihat [Panduan Penggunaan Personal Access Token](#panduan-penggunaan-personal-access-token)

Query string:
| Nama    | Deskripsi                                                                                                                                                                                                      |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label` | Untuk mengganti label default (`VISITOR`) dengan label lainnya, misalnya `label=views` atau `label=pengunjung`                                                                                                 |
| `color` | Untuk mengubah warna background badge, misalnya `color=red` atau `color=ff0000` (mendukung hex, rgb, rgba, hsl, hsla dan nama warna css)                                                                       |
| `style` | Untuk mengubah gaya badge, untuk nilainnya kamu bisa lihat style yang disediakan [shields.io](https://shields.io/), misal `style=social`, dll.                                                                 |
| `logo`  | Untuk menambahkan logo pada badge, misal `logo=github`, untuk daftar logo kamu bisa menggunakan logo yang disediakan oleh [Simple Icons](https://simpleicons.org/)                                             |
| `token` | Berisi Personal Access Token untuk menyamakan visitor asli dari repositori (mengambil data views dari Github API). Lihat [Panduan Penggunaan Personal Access Token](#panduan-penggunaan-personal-access-token) |
| `type`  | Untuk mengubah Content Type badge (default: `svg`), misalnya `type=png` untuk mengganti ke Content Type `png`                                                                                                  |

## Panduan Penggunaan Personal Access Token

*Personal Access Token* (Token Akses Pribadi) digunakan untuk meminta data ke Github API, seperti data views, clone, dll.

> Bagaimana cara membuat Token?

Untuk membuat token pribadi, kamu bisa membaca dokumentasi dari Github, yaitu [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token) atau langsung mengikuti langkah-langkah berikut.

1. [Verifikasi alamat email](https://docs.github.com/en/github/getting-started-with-github/verifying-your-email-address) kamu, jika belum diverifikasi.
2. Di sudut kanan atas halaman, klik foto profil kamu, lalu klik **Settings**.
3. Lalu, di sidebar sebelah kiri, klik **Developer settings**.
4. Di sidebar sebelah kiri, klik **Personal access tokens**.
5. Klik **Generate new token**.
6. Berikan nama pada tokenmu dengan mengisi input **Note**.
7. Atur tanggal kadaluarsa.
8. Centang scope `repo:public_repo`, lalu klik **Generate token**
9. Salin token token yang telah dihasilkan, lalu gunakan sesuai pentunjuk querystring atau parameter pada badge-badge di atas.

Gambar langkah-langkah:
![membuat-personal-access-token-untuk-fibadge](https://user-images.githubusercontent.com/57158078/144798578-618d4512-1c55-4fc3-9538-3f205ca2bae6.png)

## Terima Kasih

Terima kasih banyak untuk [shields.io](https://shields.io/) dan semua developer yang dependensi-nya digunakan di projek ini. 🙏🏻

## Donasi

[![Saweria](https://img.shields.io/badge/-SAWERIA-orange?style=for-the-badge&logo=GitHub-Sponsors&logoColor=white)](https://saweria.co/feriirawans)

Terima kasih banyak atas dukungannya.
