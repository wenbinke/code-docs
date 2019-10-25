# Node.js

## 常用代码片段

### 并行执行任务

[https://github.com/caolan/async](https://github.com/caolan/async)

```js
const async2 = require('async')

const results = await async2.map(tasks, async it => {
    return await processTask(it)
})
```

### Axios

[https://github.com/axios/axios](https://github.com/axios/axios)

```js
const axios = require('axios')

const request = axios.create({
    baseURL: 'https://...../'
})

request.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (!error.response) {
            console.log(error)
        }
        return error.response
})

const res = await request.get('/api/users')
console.log(res.data)
assert.equal(res.status, 200)

await request.post('/api/users', {
    nickname: 'xxxx'
}, {
    headers: {
        authorization: `Bearer xxxx`
    }
})

await request.patch('/api/users/1', {
    nickname: 'xxxx'
})

await request.put('/api/users/1', {
    nickname: 'xxxx'
})

await request.delete('/api/users/1')
```

### Moment

[https://github.com/moment/moment](https://github.com/moment/moment)

```js
const moment = require('moment)

moment().add(-1, 'days').format('YYYY-MM-DD HH:mm')
moment().add(6, 'days').format('YYYY-MM-DD HH:mm')
moment().format('YYYY-MM-DD')
```

### Faker

[https://github.com/Marak/Faker.js](https://github.com/Marak/Faker.js)

```js
const faker = require('faker')

faker.phone.phoneNumber('152########')
faker.image.image()
faker.lorem.sentences()
```

### Shelljs

[https://github.com/shelljs/shelljs](https://github.com/shelljs/shelljs)

```js
const shelljs = require('shelljs')

shell.exec(`ruby /path/to/code.rb`)
```

### UUID

[https://github.com/uuidjs/uuid](https://github.com/uuidjs/uuid)

```js
const uuid = require('uuid')

uuid.v4()
```

### Redis

[https://github.com/NodeRedis/node-redis](https://github.com/NodeRedis/node-redis)

```js
const config = require('config')
const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

// redis.debug_mode = true

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
    password: 'xx'
})

client.on('error', function (e) {
    console.error('Redis error: ' + e.message)
})

await client.getAsync('key')
await client.setAsync('key', 'value')

await client
  .multi()
  .scard("key")
  .smembers("key")
  .keys("*")
  .dbsize()
  .execAsync()
```

### Sharp

[https://github.com/lovell/sharp](https://github.com/lovell/sharp)

```js
const sharp = require('sharp')

const meta = await sharp(path).metadata()
// 截掉图片底部50px
await sharp(path)
    .resize(meta.width, meta.height - 50, {
        position: 'top',
    })
    .toFile(newPath)
```

### CartesianProduct

[https://github.com/izaakschroeder/cartesian-product](https://github.com/izaakschroeder/cartesian-product)

```js
const product = require('cartesian-product')
console.log(product([
	[1,2],
	[4,5]
]))

// [ [1,4], [1,5], [2,4], [2,5] ]
```

### Sequelize

[https://github.com/sequelize/sequelize](https://github.com/sequelize/sequelize)

1. Model定义

[DateTypes](https://sequelize.org/v5/manual/data-types.html)

```js
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('categories', {
        title: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    }, {
        paranoid: true, // 假删
    })

    return model
}
```

2. Db定义

```js
const config = require('config').get('mysql')
const Sequelize = require('sequelize')
const path = require('path')
const basename = path.basename(__filename)
const fs = require('fs')
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  logging: (process.env.NODE_ENV !== 'production' ? console.log : null),
  timezone: '+08:00', // 默认UTC
  define: {
    underscored: true,
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_unicode_ci'
    },
    timestamps: true
  },
  dialectOptions: {
    decimalNumbers: true
  }
})

const db = {}
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

module.exports = db
```

3. 使用

[Operators](https://sequelize.org/v5/manual/querying.html#operators)

```js
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('./db')

const items = await db.items.findAll({
    limit: page_size,
    offset: page_index * page_size, // https://sequelize.org/v5/manual/querying.html#pagination---limiting
    order: [['display_order', 'DESC'], ['id', 'DESC']], // https://sequelize.org/v5/manual/querying.html#ordering
    where: {
        name: {
            [Op.like]: '%hat'
        }
    },
    attributes: ['id', 'name']
})

const result = await db.items.findAndCountAll({
  where: {
      name: {
        [Op.in]: [1, 2, 3]
      }
  },
  limit: 12,
  offset: 12
}) // result.count result.rows

const item = await db.items.findByPk(1)
const item = await db.items.findOne({
    where: {
        name: 'xx'
    }
})

await db.items.create({
  name: 'yyy'
})

await db.items.update({
  name: 'yyy'
}, {
  where: {
    id: 1
  }
})

await db.items.upsert({
  name: 'yyy'
})

await db.items.destory({
  where: {
    id: 1
  }
})
```

### HashPassword

[https://github.com/kelektiv/node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js)

```js
const bcrypt = require('bcrypt')

const saltRounds = 10
const myPlaintextPassword = '123456'
const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds)
// Store hash in your password DB.

// Load hash from your password DB.
bcrypt.compareSync(myPlaintextPassword, hash)  // true
```

### JsonWebToken

[https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

```js
const jwt = require('jsonwebtoken')

const token = jwt.sign({
    id: user.id,
    env: process.env.NODE_ENV
}, config.get('jwt_secret_key'))

const tokenUser = jwt.verify(token, config.get('jwt_secret_key'))
```

### Rabbitmq

### Elasticsearch

