/**
 * read themes from https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/electerm
 * Only include popular themes
 */

const {
  resolve
} = require('path')
const {
  mkdir, rm
} = require('shelljs')
const fs = require('fs')
const json5 = require('json5')

const popularThemes = [
  'Dracula.txt',
  'Dracula+.txt',
  'Nord.txt',
  'Nord Light.txt',
  'Nordfox.txt',
  'Nord Wave.txt',
  'Onenord.txt',
  'Onenord Light.txt',
  'One Dark Two.txt',
  'Atom One Dark.txt',
  'iTerm2 Solarized Dark.txt',
  'iTerm2 Solarized Light.txt',
  'Solarized Dark Patched.txt',
  'Solarized Dark Higher Contrast.txt',
  'Solarized Darcula.txt',
  'Solarized Osaka Night.txt',
  'Gruvbox Dark.txt',
  'Gruvbox Light.txt',
  'Gruvbox Dark Hard.txt',
  'Gruvbox Light Hard.txt',
  'Gruvbox Material.txt',
  'Gruvbox Material Dark.txt',
  'Gruvbox Material Light.txt',
  'Monokai Classic.txt',
  'Monokai Pro.txt',
  'Monokai Pro Spectrum.txt',
  'Monokai Pro Ristretto.txt',
  'Monokai Pro Octagon.txt',
  'Monokai Pro Machine.txt',
  'Monokai Pro Light.txt',
  'Monokai Pro Light Sun.txt',
  'Monokai Soda.txt',
  'Monokai Vivid.txt',
  'Dimmed Monokai.txt',
  'Monokai Remastered.txt',
  'Tomorrow Night.txt',
  'Tomorrow Night Eighties.txt',
  'Tomorrow Night Blue.txt',
  'Tomorrow Night Bright.txt',
  'Tomorrow Night Burns.txt',
  'Zenburn.txt',
  'Zenburned.txt',
  'Catppuccin Mocha.txt',
  'Catppuccin Latte.txt',
  'Catppuccin Frappe.txt',
  'Catppuccin Macchiato.txt',
  'Duotone Dark.txt'
]

const folder = resolve(
  __dirname,
  'iTerm2-Color-Schemes/electerm'
)
const all = popularThemes.map(f => {
  const content = fs.readFileSync(
    resolve(folder, f), 'utf8'
  )
  return content.split('\n').filter(line => !line.startsWith('terminal:')).join('\n')
})
rm('-rf', resolve(__dirname, '../dist'))
mkdir('-p', resolve(__dirname, '../dist/cjs'))
mkdir('-p', resolve(__dirname, '../dist/esm'))
fs.writeFileSync(
  resolve(__dirname, '../dist/cjs/package.json'),
  JSON.stringify({ type: 'commonjs' }, null, 2)
)
const t1 = resolve(__dirname, '../dist/cjs/index.js')
fs.writeFileSync(t1, 'module.exports = ' + json5.stringify(all, null, 2))
const t2 = resolve(__dirname, '../dist/esm/index.mjs')
fs.writeFileSync(t2, 'export default ' + json5.stringify(all, null, 2))
