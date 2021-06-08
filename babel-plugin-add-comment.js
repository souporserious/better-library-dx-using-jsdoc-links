const { repository } = require('./package.json')

module.exports = function () {
  return {
    name: 'add-comment',
    visitor: {
      FunctionDeclaration(path, state) {
        const [, filePath] = state.filename.split('src')
        const [leadingComment] = path.node.leadingComments
        if (leadingComment) {
          const lines = leadingComment.value.split('\n')
          const endIndex = lines.findIndex((line) => line.startsWith(' * @'))
          leadingComment.value = lines
            .slice(0, endIndex)
            .concat([
              `* `,
              `* [Edit on GitHub](${repository.url}${filePath})`,
              `* `,
            ])
            .concat(lines.slice(endIndex, lines.length))
            .join('\n')
        }
      },
    },
  }
}
