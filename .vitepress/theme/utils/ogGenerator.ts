import { resolve } from 'node:path'
import fs from 'node:fs'

const item = (theTitle: string) => ({
  type: 'div',
  props: {
    style: {
      display: 'flex',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      letterSpacing: '-.02em',
      backgroundColor: 'white',
      background: 'linear-gradient(0deg, rgba(121,121,121,1) 0%, rgba(167,167,167,1) 15%, rgba(251,251,251,1) 60%, rgba(255,255,255,1) 100%)',
      fontWeight: 700,
    },
    children: [
      {
        type: 'div',
        props: {
          style: {
            left: 82,
            top: 112,
            right: 82,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                },
                children: [
                  {
                    type: 'span',
                    props: {
                      style: {
                        fontSize: 24,
                      },
                      children: 'Dustella',
                    },
                  },
                  {
                    type: 'span',
                    props: {
                      style: {
                        fontSize: 26,
                        width: 300,
                      },
                      children: theTitle,
                    },
                  },
                ],
              },
            },
            {
              type: 'img',
              props: {
                style: {
                  width: 140,
                  height: 140,
                  background: 'black',
                  borderRadius: '50%',
                },
                width: 140,
                height: 140,
                src: 'https://img-cdn.dustella.net/avtr.jpg',
              },
            }],
        },
      },
    ],

  },
})

const generator = async (title: string) => {
  const satori = await import('satori')
  const theItem = item(title)
  const svg = await satori.default(theItem,
    {
      width: 600,
      height: 400,
      fonts: [{
        name: 'MiSans',
        data: fs.readFileSync(resolve(__dirname, './assets/MiSans-Medium.ttf')),
        weight: 600,
        style: 'normal',
      }],
    })
  return svg
}

export default generator
