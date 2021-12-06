const dataBaseShema = {
  title: 'Database - Visitor Badge',
  description: 'Menampung semua pengguna yang sudah membuat visitor badge',
  author: {
    name: 'Feri Irawan',
    github: 'feri-irawan'
  },
  created_at: '2021-11-25T14:05:55.000Z', // Tanggal data ini pertama kali dibuat
  updated_at: '2021-11-26T13:36:23.171Z', // Tanggal terakhir data ini diperbarui
  data: [
    // Daftar pengguna
    {
      id: 1, // Id pengguna (unik)
      username: 'feri-irawan', // Nama pengguna (unik)
      created_at: '2021-11-26T13:02:29.390Z', // Tanggal pengguna ini dibuat
      updated_at: '2021-11-26T13:35:31.201Z', // Tanggal terakhir data user diperbarui
      repos: [
        {
          id: 1, // Id repositori (unik)
          name: 'feri-irawan', // Nama repositori
          visitor: 15, // Jumlah visitor repositori
          github_token: false, // Github token tidak aktif (tidak mengambil visitor dari github)
          created_at: '2021-11-26T13:02:29.391Z', // Tanggal repositori ini dibuat
          updated_at: '2021-11-26T13:35:06.656Z' // Tanggal jumlah repositori ini diperbarui
        }
        // ... Repositori lainnya
      ]
    }
    // ... Pengguna lainnya
  ]
}
