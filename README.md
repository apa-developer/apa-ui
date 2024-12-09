# Apa UI

**Apa UI** is a UI component library built with TailwindCSS, designed with a unique Neo-Brutalism style. This library provides a set of customizable and reusable components to accelerate your development process.

## Features

- Neo-Brutalism styled UI components.
- Fully customizable using TailwindCSS.
- Easy-to-use commands for adding components to your project.

## Usage

Follow the steps below to integrate Apa UI into your project:

### 1. Install TailwindCSS

First, install the latest version of TailwindCSS:

```bash
npm install tailwindcss@next
```

### 2. Install Dependencies for Utility Functions

To ensure smooth integration, install the required utility dependencies:

```bash
npm install tailwind-merge clsx
```

### 3. Initialize Apa UI

Run the initialization command to set up Apa UI in your project:

```bash
npx @apa-dev/ui@sigma init
```

This command will configure the necessary files and settings for Apa UI.

### 4. Add a Component

To add a specific component, use the `add` command. For example, to add a button component:

```bash
npx @apa-dev/ui@sigma add button
```

Replace `button` with the desired component name to include it in your project.

### 5. List All Available Components

To view all available components in the Apa UI library, use the following command:

```bash
npx @apa-dev/ui@sigma list
```

## Development

> _Coming soon_

## Releasing

Since the release process is handled by [semantic-release](https://semantic-release.gitbook.io/) you can just follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification and the release will be handled automatically. Please consult the references below for more understanding about how the `semantic-release` works:

- [Workflow Configuration](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration)
- [Release Workflow](https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow)
- [Commit Message Format](https://semantic-release.gitbook.io/semantic-release#commit-message-format)

## Contributing

> _Coming soon_

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
