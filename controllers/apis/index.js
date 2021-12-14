exports.index = (req, res) => {
  res.json({
    title: 'Fibadge API',
    description: 'Kumpulan data publik Fibadge',
    author: {
      name: 'Feri Irawan',
      github: 'feri-irawan'
    },
    created_at: '2021-11-25T14:05:55.000Z',
    updated_at: '2021-11-25T14:05:55.000Z',
    endpoints: [
      {
        description: 'Mendapatkan semua pengguna.',
        url: '/api/visitor'
      },
      {
        description: 'Mendapatkan data satu pengguna.',
        url: '/api/visitor/:username'
      },
      {
        description: 'Mendapatkan repositori pengguna.',
        url: '/api/visitor/:username/:repo'
      }
    ]
  })
}
