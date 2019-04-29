export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://www.vanorama.fr/backoffice' : 'http://localhost:8888/vanorama/backoffice'
export const API = `${BASE_URL}/wp-json/wp/v2`
export const ACF_API = `${BASE_URL}/wp-json/acf/v3`
export const POSTS = '/posts?orderby=date&order=desc'
export const PER_PAGE = 10
export const PHOTORAMAS = `/photoramas?orderby=date&order=desc&per_page=${PER_PAGE}`
