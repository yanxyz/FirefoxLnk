const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const createShortcut = require('./shortcut/create')

module.exports = function (output) {
  const dir = path.resolve(output)
  if (!isDir(dir)) {
    throw new Error('Not directory: ' + output)
  }
  const name = path.basename(dir)
  const lnk = path.join(dir, '..', name + '.lnk')
  const exe = path.join(dir, 'core', 'firefox.exe')

  // firefox -CreateProfile "Firefox 57.0.2" => error
  // firefox -CreateProfile ""Firefox 57.0.2"" => Firefox
  const profileName = name.toLocaleLowerCase().replace(/ /g, '_')
  createProfile(exe, profileName)

  // firefox command line arguments
  // http://kb.mozillazine.org/Command_line_arguments
  const args = [
    `-P %22${profileName}%22`,
  ]
  createShortcut(lnk, exe, args)
}

function isDir(path) {
  return fs.statSync(path).isDirectory()
}

function createProfile(firefox, profileName) {
  execFileSync(firefox, ['-CreateProfile', profileName])

  // https://support.mozilla.org/en-US/kb/profiles-where-firefox-stores-user-data#w_finding-your-profile-without-opening-firefox
  const root = path.join(process.env['APPDATA'], 'Mozilla/Firefox/Profiles')
  const entries = fs.readdirSync(root)
  let profile
  entries.some(x => {
    if (x.endsWith('.' + profileName)) {
      profile = path.join(root, x)
      return true
    }
  })

  // disable update
  // https://support.mozilla.org/en-US/questions/1003777
  fs.writeFileSync(path.join(profile, 'user.js'), `
// turn off application updates:
user_pref("app.update.enabled", false);
  `)
}
