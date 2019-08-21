const getClientOptionsFromMongoDbUri = require('./getClientOptionsFromMongoDbUri')

describe('when a valid Heroku mLab MongoDB URI is passed in', () => {
  let clientOptions
  beforeAll(() => {
    clientOptions = getClientOptionsFromMongoDbUri('mongodb://heroku_12345678:random_password@ds029017.mLab.com:29017/heroku_12345678')
  })

  it('returns the url', () => {
    expect(clientOptions.url).toEqual('mongodb://ds029017.mLab.com:29017/heroku_12345678')
  })

  it('returns the username', () => {
    expect(clientOptions.username).toEqual('heroku_12345678')
  })

  it('returns the password', () => {
    expect(clientOptions.password).toEqual('random_password')
  })
})
