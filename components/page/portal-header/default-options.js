import { getUnLocale                                  } from '@houlagins/locale'

const { DAPI   } = process.env
const   locale   = getUnLocale()

const options = {
  host                 : 'https://www.cbd.int',
  dapi                 : DAPI,
  static               : true,
  siteNavigationElement: {},
  locale
}


export default (opts={}) => ({ ...options, ...opts })