function decode (o) {
  const result = {}
  for (let key in o) {
    const matches = String(key).match(/^(or-)?(not-)?(\w+)-(.*)$/)
    if (matches) {
      result[matches[4]] = {['$' + matches[3]]: o[key]}
    }
  }
  return result
}

module.exports = {
  decode
}
