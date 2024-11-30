import fs from 'fs'
import path from 'path'

// Read available frameworks and components
export const getFrameworkComponents = () => {
    const componentsDir = path.join('components')
    if (!fs.existsSync(componentsDir)) {
        return {}
    }

    const frameworks = fs.readdirSync(componentsDir).filter((item) => {
        const frameworkPath = path.join(componentsDir, item)
        return fs.lstatSync(frameworkPath).isDirectory()
    })

    const frameworkComponents: Record<string, string[]> = {}
    frameworks.forEach((framework) => {
        const frameworkPath = path.join(componentsDir, framework)
        const components = fs
            .readdirSync(frameworkPath)
            .filter((file) => fs.lstatSync(path.join(frameworkPath, file)).isFile())
            .map((file) => path.basename(file, path.extname(file))) // Get filenames without extensions
        frameworkComponents[framework] = components
    })

    return frameworkComponents
}
