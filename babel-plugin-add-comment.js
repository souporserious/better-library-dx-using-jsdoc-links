const createComment = (value) => ` * ${value}`

const REPO_BASE = `https://github.com/souporserious/better-dx-using-rich-inline-documentation/tree/main/src`

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
            .concat([`* `, `* [Edit on GitHub](${REPO_BASE}${filePath})`, `* `])
            .concat(lines.slice(endIndex, lines.length))
            .join('\n')
        }
      },
    },
  }
}
