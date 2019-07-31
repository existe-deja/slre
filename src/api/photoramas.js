import { API, PER_PAGE } from '@/config'

export default {
  query (offset) {
    return `${API}/photoramas?orderby=date&order=desc&per_page=${PER_PAGE}&offset=${offset}`
  },

  async getContent (offset = 0, cb, errorCb) {
    try {
      const photoramas = await fetch(this.query(offset), {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      })
      let content = await photoramas.json()
      cb(content)
    } catch (e) {
      errorCb(e)
    }
  }
}
