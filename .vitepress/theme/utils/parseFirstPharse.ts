export default (text: string) => {
// parse the first paassage of the markdown file,
// the first passage is the first block after first title starting with `#`

  // first, we have to clear frontmatter content in --- ---

  text = text.replace(/---[\s\S]*?---/, '')

  const lines = text.split('\n')
  let firstPass = ''
  let firstTitle = ''
  let firstTitleFound = false
  for (const line of lines) {
    if (line.startsWith('#')) {
      if (!firstTitleFound) {
        firstTitleFound = true
        firstTitle = line
      }
      else {
        break
      }
    }
    else {
      firstPass += line
    }
  }

  return firstPass
}
