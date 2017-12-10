const { spawn } = require('child_process')

module.exports = function (lnk, exe, args = []) {
  spawn('cscript.exe', [
    __dirname + '\\create.vbs',
    '//Nologo',
    lnk,
    exe,
    args.join(' ')
  ], {
    io: 'inherit'
  })
}
