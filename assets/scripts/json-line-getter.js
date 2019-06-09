export default obj => {
  return getLineArray(null, obj)
}

const getLineArray = (key, value, hasNext, depth = 0) => {
  let data = []
  const type = getType(value)
  if (key) key = '"' + key + '"'
  let item = { key, indent: depth }

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
      value = '}'
      if (hasNext) value += ','
      data.push({ indent: depth, value })
      break

    case 'array':
      data.push({ ...item, value: '[' })
      value.forEach((v, i) => {
        data = [
          ...data,
          ...getLineArray(null, v, i + 1 < value.length, depth + 1)
        ]
      })
      value = ']'
      if (hasNext) value += ','
      data.push({ indent: depth, value })
      break

    case 'string':
      value = '"' + value + '"'
      if (hasNext) value += ','
      data.push({ ...item, type, value })
      break

    case 'boolean':
    case 'number':
      value = value.toString()
      if (hasNext) value += ','
      data.push({ ...item, type, value })
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
