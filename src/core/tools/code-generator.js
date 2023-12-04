/* eslint-disable no-console */
const dotenv = require('dotenv')
const fs = require('fs')
const axios = require('axios')
const path = require('path')

const sleep = ms => {
  return new Promise(resolve => setInterval(resolve, ms))
}

const removeDir = function (path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)
    if (files.length <= 1) return
    const directories = files.filter(dir => dir !== '.gitkeep')

    if (directories.length > 0) {
      directories.forEach(function (filename) {
        if (fs.statSync(`${path}/${filename}`).isDirectory()) {
          removeDir(`${path}/${filename}`)
        } else {
          fs.unlinkSync(`${path}/${filename}`)
        }
      })
    } else {
      fs.rmdir(`${path}/`, { recursive: true, force: true }, err => {
        if (err) {
          console.log(err)
        }
      })
    }
    if (directories.length > 0) directories.forEach(filename => fs.rmdir(`${path}/${filename}`, () => undefined))
  } else {
    console.log('Directory path not found.')
  }
}

const codeGenerator = async (baseURL, idsBaseURL, destination) => {
  const orvalConfigPath = path.resolve(__dirname, `${destination}/services/orval.config.js`)
  const generatedServicesPath = path.resolve(__dirname, `${destination}/services`)
  const customInstancePath = path.resolve(__dirname, `${destination}/core/api/custom-instance.ts`)

  try {
    removeDir(generatedServicesPath)

    const response = await axios.get(`${baseURL}/definitions2`)
    const data = response.data
    data.push({ name: 'ids', url: `${idsBaseURL}/swagger/v1/swagger.json` })
    const config = data.reduce((acc, definition) => {
      acc[definition.name] = {
        output: {
          target: `${generatedServicesPath}/${definition.name}-services/${definition.name}.ts`,
          client: 'react-query',
          mode: 'split',
          prettier: true,
          baseUrl: `${definition.name === 'ids' ? idsBaseURL : baseURL}`,
          override: {
            mutator: {
              path: customInstancePath,
              name: 'customInstance',
            },
          },
        },
        input: {
          target: definition.url,
        },
      }
      return acc
    }, {})
    fs.writeFileSync(orvalConfigPath, `module.exports = ${JSON.stringify(config, null, 2)};`, 'utf8')
    sleep(1000)
  } catch (error) {
    console.error('Error generating code:', error)
  }
}

const destination = `../../../${process.argv[2]}`
const envPath = `.env`
dotenv.config({ path: envPath })

let baseURL = process.env.NEXT_PUBLIC_GATEWAY
let idsBaseURL = process.env.NEXT_PUBLIC_IDS

codeGenerator(baseURL, idsBaseURL, destination)
