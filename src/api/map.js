import { API, PER_PAGE } from '@/config'

export default {
  query () {
    return `${API}/map?per_page=${PER_PAGE}`
  },

  async getContent (cb, errorCb) {
    try {
      const map = await fetch(this.query(), {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      })
      let content = await map.json()
      cb(content)
    } catch (e) {
      errorCb(e)
    }
  },

  async getGeoData (isItAMobile, cb, errorCb) {
    let query = isItAMobile ? 'https://unpkg.com/world-atlas@1.1.4/world/110m.json' : 'https://unpkg.com/world-atlas@1.1.4/world/50m.json'
    try {
      const geodata = await fetch(query, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      })
      let content = await geodata.json()
      cb(content)
    } catch (e) {
      errorCb(e)
    }
  }
}
