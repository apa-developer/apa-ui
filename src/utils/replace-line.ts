import fs from 'fs'

/**
 * Replaces a line in a file with a new value.
 *
 * @param {string} filePath The path to the file to update.
 * @param {string} searchValue The value to search for in the file. The entire line
 *      will be replaced with the replaceValue.
 * @param {string} replaceValue The value to replace the line with. The leading whitespace
 *      of the original line will be preserved.
 */
export function replaceLine(filePath: string, searchValue: string, replaceValue: string) {
    if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`)

    const fileContent = fs.readFileSync(filePath, 'utf8')

    const lines = fileContent.split('\n')
    const updatedLines = lines.map((line) => {
        if (!line.includes(searchValue)) return line

        const leadingWhitespace = line.match(/^s*/)?.[0] || ''
        return `${leadingWhitespace}${replaceValue}`
    })

    const updatedContent = updatedLines.join('\n')

    fs.writeFileSync(filePath, updatedContent)
}
