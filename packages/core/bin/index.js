#!/usr/bin/env node

const path = require('path')
// process.argv.push('build')
const configPath = path.resolve(__dirname, '../vite.config.ts')
process.argv.push('--config', configPath)


require('vite/bin/vite')