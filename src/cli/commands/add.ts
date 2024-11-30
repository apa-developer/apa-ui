import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import ora from 'ora'
import { z } from 'zod'
import { getFrameworkComponents } from '../utils'

const configSchema = z.object({
    outputDir: z.string(),
    framework: z.string(),
})

export const addCommand = new Command('add')
    .description('Add a component to your project')
    .argument('[component]', 'The component to add')
    .option('--framework <framework>', 'Specify a framework (overrides config)')
    .option('--config <path>', 'Specify a custom config file')
    .action(async (component, options) => {
        const spinner = ora('Loading configuration...').start()

        // Load config
        const configPath = options.config || 'apa.config.json'
        if (!fs.existsSync(configPath)) {
            spinner.fail(chalk.red('Configuration file not found! Please run `npx apa-ui init` first.'))
            process.exit(1)
        }

        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
        const parsedConfig = configSchema.safeParse(config)

        if (!parsedConfig.success) {
            spinner.fail(chalk.red('Invalid configuration file!'))
            console.error(parsedConfig.error.errors)
            process.exit(1)
        }

        const { outputDir, framework } = parsedConfig.data
        const selectedFramework = options.framework || framework

        const frameworkComponents = getFrameworkComponents()

        // Validate framework
        if (!frameworkComponents[selectedFramework]) {
            spinner.fail(chalk.red(`Framework "${selectedFramework}" is not supported or has no components.`))
            process.exit(1)
        }

        spinner.succeed('Configuration loaded!')

        // Prompt for component if not provided
        let selectedComponent = component
        if (!selectedComponent) {
            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'component',
                    message: 'Which component would you like to add?',
                    choices: frameworkComponents[selectedFramework],
                },
            ])
            selectedComponent = answer.component
        }

        // Validate component
        if (!frameworkComponents[selectedFramework].includes(selectedComponent)) {
            console.log(chalk.red(`Component "${selectedComponent}" not found for framework "${selectedFramework}"!`))
            process.exit(1)
        }

        const fileExtension = path.extname(
            fs
                .readdirSync(path.join('src', 'components', selectedFramework))
                .find((file) => file.startsWith(selectedComponent)) || ''
        )
        const srcPath = path.join('src', 'components', selectedFramework, `${selectedComponent}${fileExtension}`)
        const destPath = path.join(outputDir, `${selectedComponent}${fileExtension}`)

        // Confirm overwrite if file exists
        if (fs.existsSync(destPath)) {
            const { overwrite } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'overwrite',
                    message: `Component "${selectedComponent}" already exists. Overwrite it?`,
                    default: false,
                },
            ])

            if (!overwrite) {
                console.log(chalk.yellow('No changes made. Exiting...'))
                process.exit(0)
            }
        }

        // Copy component
        spinner.start(`Adding ${selectedComponent} to your project...`)
        fs.copyFileSync(srcPath, destPath)
        spinner.succeed(chalk.green(`${selectedComponent} added successfully to ${outputDir}! 🎉`))
    })
