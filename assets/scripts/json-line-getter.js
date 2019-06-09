export default obj => {
  return getLineArray(null, obj)
}

const getLineArray = (key, value, hasNext, depth = 0) => {
  let data = []
  const type = getType(value)
  if (key) key = '"' + key + '"'
  let item = { key, depth }

  switch (type) {
    case 'object':
      data.push({ ...item, value: '{' })
      Object.keys(value).forEach((k, i) => {
        data = [
          ...data,
          ...getLineArray(
            k,
            value[k],
            i + 1 < Object.keys(value).length,
            depth + 1
          )
        ]
      })
      data.push({ depth, value: '}', hasNext })
      break

    case 'array':
      data.push({ ...item, value: '[' })
      value.forEach((v, i) => {
        data = [
          ...data,
          ...getLineArray(null, v, i + 1 < value.length, depth + 1)
        ]
      })
      data.push({ depth, value: ']', hasNext })
      break

    case 'string':
      data.push({ ...item, type, value: '"' + value + '"', hasNext })
      break

    case 'boolean':
    case 'number':
      data.push({ ...item, type, value: value.toString(), hasNext })
      break
  }

  return data
}

const getType = item => {
  if (typeof item === 'boolean') return 'boolean'
  if (!item) return false
  if (typeof item === 'string') return 'string'
  if (Number.isInteger(item)) return 'number'
  if (Array.isArray(item)) return 'array'
  if (Object.keys(item).length) return 'object'
  return 'other'
}
