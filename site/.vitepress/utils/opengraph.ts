import { resolve } from 'node:path'
import fs from 'node:fs'

function item(theTitle: string) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: '-.02em',
        fontWeight: 700,
        background: 'white',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              left: 42,
              top: 42,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: {
                    width: 24,
                    height: 24,
                    background: 'black',
                  },
                },
              },
              {
                type: 'span',
                props: {
                  style: {
                    marginLeft: 8,
                    fontSize: 20,
                  },
                  children: 'www.dustella.net',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '20px 40px',
              margin: '0 42px',
              fontSize: 40,
              width: 'auto',
              maxWidth: 550,
              textAlign: 'center',
              backgroundColor: 'black',
              color: 'white',
              lineHeight: 1.4,
            },
            children: theTitle,
          },
        },
      ],
    },
  }
}

async function generateOgSvg(title: string) {
  const satori = await import('satori')
  const theItem = item(title)
  const svg = await satori.default(theItem, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'MiSans',
        data: fs.readFileSync(resolve(__dirname, './assets/MiSans-Medium.ttf')),
        weight: 600,
        style: 'normal',
      },
    ],
  })
  return svg
}

export { generateOgSvg }
