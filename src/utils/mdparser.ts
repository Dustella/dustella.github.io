export const parseMdToTitles = (content: string) =>
  content.split('\n').filter(line => line.startsWith('#')).map(line => line.replace('\r', '').trim())

export const getFirstParagraph = (content: string) => {
  const lines = content.split('\n')
  const firstParagraph = lines.find(line => (!line.startsWith('#') && line.trim() !== ''))
  return firstParagraph || ''
}
