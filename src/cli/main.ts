#!/usr/bin/env bun

import { Command } from 'commander'
import chalk from 'chalk'
import { initCommand } from './commands/init'
import { addCommand } from './commands/add'
import { listCommand } from './commands/list'

const program = new Command()

program.name('apa-ui').description('The chill UI component CLI for all your framework needs 😎').version('0.0.1')

// Register commands
program.addCommand(initCommand)
program.addCommand(addCommand)
program.addCommand(listCommand)

// Error handling
program.on('command:*', () => {
    console.log(chalk.red('Invalid command! Use --help to see the list of available commands.'))
    process.exit(1)
})

// Parse CLI arguments
program.parse(process.argv)
