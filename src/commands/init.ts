import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import ora from 'ora'
import { getFrameworkComponents, isTypeScriptFramework } from '~/utils/framework'
import { dirname } from '~/utils/dirname'
import { installDependencies } from '~/utils/install-dependencies'

export const initCommand = new Command('init').description('Initialize apa-ui configuration file').action(async () => {
    const configPath = 'apa.config.json'
    if (fs.existsSync(configPath)) {
        const { overwrite } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                message: 'Config file already exists. Overwrite it?',
                default: false,
            },
        ])

        if (!overwrite) {
            console.log(chalk.yellow('No changes made. Exiting...'))
            process.exit(0)
        }
    }

    const frameworks = Object.keys(getFrameworkComponents())

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'componentDir',
            message: 'Where should the components be generated? (e.g., src/components)',
            default: 'src/components',
        },
        {
            type: 'list',
            name: 'framework',
            message: 'Which framework are you using?',
            choices: frameworks,
            default: 'react',
        },
        {
            type: 'input',
            name: 'utilsDir',
            message: 'Where should utilities like `cn` be stored? (e.g., src/utils)',
            default: 'src/utils',
        },
    ])

    const aliases = await inquirer.prompt([
        {
            type: 'input',
            name: 'componentsAlias',
            message: 'What should the alias be for components folder?',
            default: '@/' + answers.componentDir.replace('src/', ''),
        },
        {
            type: 'input',
            name: 'utilsAlias',
            message: 'What should the alias be for utilities folder?',
            default: '@/' + answers.utilsDir.replace('src/', ''),
        },
    ])

    const config = {
        componentDir: answers.componentDir,
        framework: answers.framework,
        utilsDir: answers.utilsDir,
        componentsAlias: aliases.componentsAlias,
        utilsAlias: aliases.utilsAlias,
    }

    const spinner = ora("Let's get you set up with apa-ui! 🚀").start()

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    spinner.succeed('Configuration file created successfully! 🎉')

    const componentDir = path.resolve(answers.componentDir)
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true })
        spinner.succeed(`Output directory "${answers.componentDir}" created successfully! 🎉`)
    } else {
        spinner.info(`Output directory "${answers.componentDir}" already exists.`)
    }

    const utilsDir = path.resolve(answers.utilsDir)
    if (!fs.existsSync(utilsDir)) {
        fs.mkdirSync(utilsDir, { recursive: true })
        spinner.succeed(`Utilities directory "${answers.utilsDir}" created successfully! 🎉`)
    } else {
        spinner.info(`Utilities directory "${answers.utilsDir}" already exists.`)
    }

    const isTS = isTypeScriptFramework(answers.framework)

    const utils = isTS ? 'cn.ts' : 'cn.js'

    const srcCnPath = path.join(dirname, '../utils', utils)
    const destCnPath = path.join(utilsDir, utils)

    if (fs.existsSync(destCnPath)) {
        const { overwriteUtils } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'overwriteUtils',
                message: `Utility file "${path.basename(destCnPath)}" already exists. Overwrite it?`,
                default: false,
            },
        ])

        if (!overwriteUtils) {
            spinner.info('No changes made to utility files.')
        } else {
            fs.copyFileSync(srcCnPath, destCnPath)
            spinner.succeed(`Utility file "${path.basename(destCnPath)}" replaced successfully! `)
        }
    } else {
        fs.copyFileSync(srcCnPath, destCnPath)
        spinner.succeed(`Utility file "${path.basename(destCnPath)}" copied successfully!`)
    }

    const { shouldInstall } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'shouldInstall',
            message: 'Do you want to install the required dependencies automaticly?',
            default: true,
        },
    ])

    if (shouldInstall) {
        spinner.succeed('Initialization complete! Now installing dependencies...')

        const dependencies = [
            { package: 'tailwind-merge' },
            { package: 'clsx' },
            { package: 'class-variance-authority' },
        ]

        await installDependencies(dependencies)
    } else {
        spinner.info('Initialization complete! You can manually install dependencies later.')
    }
})
