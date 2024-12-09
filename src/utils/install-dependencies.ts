import ora from 'ora'
import { detectPackageManager } from './package-manager'
import { execSync } from 'child_process'

export const installDependencies = async (dependencies: { package: string; version?: string; isDev?: boolean }[]) => {
    const pm = detectPackageManager()

    const pmCommands: Record<string, (pkg: string, isDev: boolean) => string> = {
        pnpm: (pkg, isDev) => `pnpm add ${isDev ? '--save-dev' : ''} ${pkg}`,
        yarn: (pkg, isDev) => `yarn add ${isDev ? '--dev' : ''} ${pkg}`,
        bun: (pkg, isDev) => `bun add ${isDev ? '--dev' : ''} ${pkg}`,
        npm: (pkg, isDev) => `npm install ${isDev ? '--save-dev' : ''} ${pkg}`,
    }

    const buildDependencyString = ({
        package: pkg,
        version,
        isDev,
    }: {
        package: string
        version?: string
        isDev?: boolean
    }) => {
        const dependencyString = version ? `${pkg}@${version}` : pkg
        return pmCommands[pm]?.(dependencyString, isDev ?? false) || pmCommands.npm(dependencyString, isDev ?? false)
    }

    const installCommand = dependencies.map(buildDependencyString).join(' && ')

    const spinner = ora('Installing dependencies...').start()

    try {
        execSync(installCommand, { stdio: 'ignore' })
        spinner.succeed('Dependencies installed successfully! 🎉')
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}
