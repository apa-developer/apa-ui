/**
 * Configuration for semantic-release
 *
 * @see https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration
 * @see https://semantic-release.gitbook.io/semantic-release/usage/configuration
 *
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    branches: ['main', { name: 'sigma', prerelease: true }],
}
