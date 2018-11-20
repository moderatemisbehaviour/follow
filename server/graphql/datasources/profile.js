const {DataSource} = require('apollo-datasource');

class ProfileDataSource extends DataSource {
  getPerson (id) {
    switch (id) {
      case '1':
        return {
          id,
          name: 'Elon Musk',
          profiles: [
            {
              id: 1,
              platform: 'TWITTER',
              url: 'https://twitter.com/elonmusk'
            }
          ]
        }
      case '2':
        return {
          id,
          name: 'Siobhan Wilson',
          profiles: [
            {
              id: 2,
              platform: 'TWITTER',
              url: 'https://twitter.com/siobhanisback'
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
          },
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