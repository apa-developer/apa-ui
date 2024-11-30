import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'

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
            choices: ['react', 'vue', 'svelte', 'angular', 'lit'],
            default: 'react',
        },
    ])

    const config = {
        outputDir: answers.outputDir,
        framework: answers.framework,
    }

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    console.log(chalk.green('Configuration file created successfully! 🎉'))
})
