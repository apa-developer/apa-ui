import { Command } from 'commander'
import chalk from 'chalk'
import { getFrameworkComponents } from '~/utils/framework'
import Table from 'cli-table3'
import terminalLink from 'terminal-link'

const generateLink = (component: string): string => {
    return terminalLink(component, '#')
}

export const listCommand = new Command('list').description('List available frameworks and components').action(() => {
    const frameworkComponents = getFrameworkComponents()

    if (Object.keys(frameworkComponents).length === 0) {
        console.log(chalk.red('No components found!'))
        process.exit(1)
    }

    console.log(chalk.cyan('Available frameworks and components:'))

    const table = new Table({
        head: ['Framework', 'Components'],
        style: { head: ['cyan'] },
        colWidths: [20, 50],
    })

    Object.entries(frameworkComponents).map(([framework, components]) => {
        const linkedComponents = components.map((component) => generateLink(component))
        table.push([framework, linkedComponents.join(', ')])
    })

    console.log(table.toString())

    console.log(chalk.yellow('Note: Component name are clickable links that will take you to the documentation.'))
})
