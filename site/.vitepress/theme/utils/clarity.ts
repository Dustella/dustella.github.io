interface ClarityCommand {
  (...args: unknown[]): void
  q?: IArguments[]
}

export const initClarity = async (id: string) => {
  if (import.meta.env.DEV)
    return

  const clarityWindow = window as Window & { clarity?: ClarityCommand }
  const clarityCommand: ClarityCommand = function () {
    // eslint-disable-next-line prefer-rest-params
    (clarityCommand.q ||= []).push(arguments)
  }
  clarityWindow.clarity ||= clarityCommand
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${id}`

  const firstScript = document.getElementsByTagName('script')[0]
  if (firstScript?.parentNode)
    firstScript.parentNode.insertBefore(script, firstScript)
  else
    document.head.append(script)
}
