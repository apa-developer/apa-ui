import { Command } from 'commander'
import chalk from 'chalk'
import { getFrameworkComponents } from '~/utils'

export const listCommand = new Command('list').description('List available frameworks and components').action(() => {
    const frameworkComponents = getFrameworkComponents()

    if (Object.keys(frameworkComponents).length === 0) {
        console.log(chalk.red('No components found!'))
        return
    }

    console.log(chalk.cyan('Available frameworks and components:'))

    console.table(
        Object.entries(frameworkComponents).map(([framework, components]) => ({
            Framework: framework,
            Components: components.join(', '),
        }))
    )
})
