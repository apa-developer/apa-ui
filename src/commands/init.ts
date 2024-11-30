import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { getFrameworkComponents, isTypeScriptFramework } from '~/utils'

export const initCommand = new Command('init').description('Initialize apa-ui configuration file').action(async () => {
    console.log(chalk.cyan("Let's get you set up with apa-ui! 🚀"))

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
            name: 'outputDir',
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

    const config = {
        outputDir: answers.outputDir,
        framework: answers.framework,
        utilsDir: answers.utilsDir,
    }

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    console.log(chalk.green('Configuration file created successfully! 🎉'))

    const outputDir = path.resolve(answers.outputDir)
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
        console.log(chalk.green(`Output directory "${answers.outputDir}" created successfully! 🎉`))
    } else {
        console.log(chalk.yellow(`Output directory "${answers.outputDir}" already exists.`))
    }

    const utilsDir = path.resolve(answers.utilsDir)
    if (!fs.existsSync(utilsDir)) {
        fs.mkdirSync(utilsDir, { recursive: true })
        console.log(chalk.green(`Utilities directory "${answers.utilsDir}" created successfully! 🎉`))
    } else {
        console.log(chalk.yellow(`Utilities directory "${answers.utilsDir}" already exists.`))
    }

    const isTS = isTypeScriptFramework(answers.framework)
    const srcCnPath = path.join(__dirname, '../../utils', isTS ? 'cn.ts' : 'cn.js')
    const destCnPath = path.join(utilsDir, isTS ? 'cn.ts' : 'cn.js')

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
            console.log(chalk.yellow('No changes made to utility files. Exiting...'))
            return
        }
    }

    fs.copyFileSync(srcCnPath, destCnPath)
    console.log(chalk.green(`Utility file "${path.basename(destCnPath)}" copied successfully! 🎉`))
})
