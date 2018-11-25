const { DataSource } = require('apollo-datasource')

class ProfileDataSource extends DataSource {
  getPerson (id) {
    switch (id) {
      case '1':
        return {
          id,
          name: 'Siobhan Wilson',
          photo: 'https://pbs.twimg.com/profile_images/950898677991780353/7sbTf7Wl_400x400.jpg',
          profiles: [
            {
              id: 2,
              platform: 'TWITTER',
              url: 'https://twitter.com/siobhanisback',
            }
          ]
        }
      case '2':
        return {
          id,
          name: 'Elon Musk',
          photo: 'https://pbs.twimg.com/profile_images/972170159614906369/0o9cdCOp_400x400.jpg',
          profiles: [
            {
              id: 1,
              platform: 'TWITTER',
              url: 'https://twitter.com/elonmusk'
            }
          ]
        }
    }
  }

  getPeople () {
    return [
      {
        id: 1,
        name: 'Elon Musk',
        profiles: [
          {
            id: 1,
            platform: 'TWITTER',
            url: 'https://twitter.com/elonmusk'
          }
        ]
      },
      {
        id: 2,
        name: 'Siobhan Wilson',
        profiles: [
          {
            id: 2,
            platform: 'TWITTER',
            url: 'https://twitter.com/siobhanisback'
          }
        ]
      }
    ]
  }

  updateProfile () {
    return true;
  }
}

module.exports = ProfileDataSource
