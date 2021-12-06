const request = require('request')
const querystring = require('querystring')

// Pengaturan default badge
const DEFAULT_OPTIONS = {
  label: 'visitor',
  message: 0,
  color: 'green',
  style: 'for-the-badge',
  logo: '',
  type: 'svg'
}

// Fungsi filter object
Object.filter = (obj, predicate) =>
  Object.fromEntries(Object.entries(obj).filter(predicate))

// ----------------------------------------------
// Membuat badge
const makeBadge = (
  options = {
    label: '',
    message: '',
    color: '',
    style: '',
    logo: '',
    type: ''
  }
) => {
  const newOptions = userOptions(options)

  const type = options.type !== '' ? options.type : DEFAULT_OPTIONS.type
  const url = makeUrl(newOptions, type)

  return request(url)
}

// ----------------------------------------------
// Membuat pengaturan user
const userOptions = (newOptions) => {
  const defaultOptions = Object.filter(
    DEFAULT_OPTIONS,
    ([key, value]) => value !== '' && key !== 'type'
  )

  const userOptions = Object.filter(
    newOptions,
    ([key, value]) => value !== undefined && value !== '' && key !== 'type'
  )

  return {
    ...defaultOptions,
    ...userOptions
  }
}

// ----------------------------------------------
// Membuat URL untuk fetch badge
const makeUrl = (options, type) => {
  let qs, url

  // Content Type SVG (default)
  qs = querystring.stringify(options)

  url = `https://img.shields.io/static/v1?${qs}`

  // Content Type PNG
  if (type === 'png') {
    qs = querystring.stringify(
      Object.filter(
        options,
        ([key, value]) => key !== 'message' && key !== 'color'
      )
    )

    url = `https://raster.shields.io/badge/${options.message}-${options.color}.png?${qs}`
  }

  return url
}

module.exports = {
  makeBadge
}
