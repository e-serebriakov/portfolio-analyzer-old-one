db.createUser({
  user: 'pa_user',
  pwd: '1234',
  roles: [{
    role: 'readWrite',
    db: 'pa_db'
  }]
})