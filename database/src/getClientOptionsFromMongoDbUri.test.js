const getClientOptionsFromMongoDbUri = require('./getClientOptionsFromMongoDbUri')

describe('when a valid Heroku mLab MongoDB URI is passed in', () => {
  describe('when the URI contains the username and password', () => {
    let clientOptions

    beforeAll(() => {
      clientOptions = getClientOptionsFromMongoDbUri('mongodb://heroku_12345678:random_password@ds029017.mLab.com:29017/heroku_12345678')
    })

    it('returns the scheme', () => {
      expect(clientOptions.scheme).toEqual('mongodb')
    })

    it('returns the username', () => {
      expect(clientOptions.username).toEqual('heroku_12345678')
    })

    it('returns the password', () => {
      expect(clientOptions.password).toEqual('random_password')
    })

    it('returns the hosts', () => {
      expect(clientOptions.hosts).toEqual([{host: 'ds029017.mLab.com', port: 29017}])
    })

    it('returns the database', () => {
      expect(clientOptions.database).toEqual('heroku_12345678')
    })
  })

  describe('when the URI does not contain the user name and password', () => {
    let clientOptions

    beforeAll(() => {
      clientOptions = getClientOptionsFromMongoDbUri('mongodb://localhost:27017/follow')
    })

    it('returns the scheme', () => {
      expect(clientOptions.scheme).toEqual('mongodb')
    })

    it('returns the username', () => {
      expect(clientOptions.username).toBeUndefined()
    })

    it('returns the password', () => {
      expect(clientOptions.password).toBeUndefined()
    })

    it('returns the hosts', () => {
      expect(clientOptions.hosts).toEqual([{host: 'localhost', port: 27017}])
    })

    it('returns the database', () => {
      expect(clientOptions.database).toEqual('follow')
    })
  })
})
