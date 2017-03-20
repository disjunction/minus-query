decode/encode query string prepended with *sequelize* or *mongo/mongoose* comparison operators

Sample (in express environment):
```javascript
const minusQuery = requrie('minus-query')

app.use('/items', (req, res, next) => {
  const decoded = minusQuery.decode(req.query);
  model.find(decoded, {raw: true})
    .then(items => res.json(items))
    .catch(next)
})
```

In the example above the URL like:
`/items?eq-name=John&gte-age=30`
would return all Johns who have their age greater or equal `30`,
by decoding the query parameters into where-expression like:

```javascript
{
  name: {$eq: 'John'},
  age: {$gte: '30'}}
}
```
