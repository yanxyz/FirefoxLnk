#!/usr/bin/env node

const args = process.argv.slice(2)
const arg = args[0]
if (!arg || arg.startsWith('-')) {
  console.log('Usage: cli.js <installer>')
  process.exit(2)
}

if (arg === 'lnk') {
  const output = args[1]
  if (!output) {
    console.log('Usage: cli.js lnk <output>')
    process.exit(2)
  }
  require('./lib/create-shortcut')(output)
} else {
  require('./lib/run')(arg)
}
