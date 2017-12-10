const path = require('path')
const { execSync } = require('child_process')
const createShortcut = require('./create-shortcut')

module.exports = function run(installer) {
  const dir = path.dirname(installer)
  const re = /^Firefox Setup ([\d.]+)[ \w]*\.exe$/
  const result = path.basename(installer).match(re)
  if (!result) {
    throw new Error('RegExp matches nothing')
  }
  const version = result[1]
  const name = 'Firefox ' + version
  const output = path.join(dir, name)
  execSync(`7z.exe x "${installer}" -o"${output}" -y`)
  createShortcut(output)
}
