const config = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (message) => /^Repo visualizer: update diagram$/m.test(message),
    (message) => /^Bumps [.+](.+) from .+ to .+.$/m.test(message)
  ],
  rules: {
    'header-max-length': async () => [2, 'always', 72],
    'body-max-length': async () => [0, 'always', 100]
  }
}

export default config
