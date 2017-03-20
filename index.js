function decode (o, opts) {
  opts = opts || {}
  let decoded = decodeMongo(o)
  if (opts.dialect === 'sequelize') {
    decoded = transformSequelize(decoded)
  }
  return decoded
}

function decodeMongo (o) {
  const result = {}
  for (let key in o) {
    const matches = String(key).match(/^(or-)?(not-)?(\w+)-(.*)$/)
    if (matches) {
      let value = o[key]
      if (matches[3] === 'in') {
        value = String(value).split(',')
      }
      let compare = {['$' + matches[3]]: value}
      if (matches[2]) {
        switch(matches[3]) {
          case 'eq':
            compare = {$ne: value}
            break
          case 'in':
            compare = {$nin: value}
            break
          default:
            compare = {$not: compare}
        }
      }
      result[matches[4]] = compare
    }
  }
  return result
}

function transformSequelize (o) {
  return o
}

module.exports = {
  decode
}
