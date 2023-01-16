const updateLink = (headingId) => {
  const tocSide = document.getElementById('toc')
  const tocLinks = tocSide.querySelectorAll('a')
  tocLinks.forEach((link) => {
    if (link.hash === `#${encodeURIComponent(`${headingId}`)}`)
      link.firstElementChild.classList.add('active-here')
    else link.firstElementChild.classList.remove('active-here')
  })
}

export const getCurrentHeading = () => {
  const article = document.querySelector('article')
  const allHeadings = article.querySelectorAll('h1,  h2,  h3')
  const allHeadingsHeight = Array.from(allHeadings.values()).map(
    (heading) => {
      const { top } = heading.getBoundingClientRect()
      const { id, innerHTML } = heading
      return { top, id, innerHTML }
    },
  )
  const lastHeading = allHeadingsHeight
    .reverse()
    .find(heading => heading.top < 100)
  updateLink(lastHeading.id)

  if (!lastHeading)
    return null

  if (scrollLock && lastHeading.id === location.hash.slice(1))
    return null

  return lastHeading
}
