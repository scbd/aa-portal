
import { getUnLocale } from '@houlagins/locale'

const{ DAPI } = process.env
const locale  = getUnLocale()

const options = {
  accountsUrl: 'https://accounts.cbd.int',
  searchUrl  : 'https://www.cbd.int/kb/Results?q=',
  host       : 'https://www.cbd.int',
  signOutUrl : 'https://www.cbd.int/user/signout',
  dapi       : DAPI,
  static     : true,
  basePath   : 'https://www.cbd.int/',
  loginSNEs  : [],
  mainSNEs   : {},
  siteNavElms: [],
  locale
}

export default (opts={}) => ({ ...options, ...opts })