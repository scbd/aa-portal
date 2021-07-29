
import { getUnLocale            } from '@houlagins/locale'
import   siteNavigationElements   from '~/static/footerSiteNavigationElements'

const { DAPI } = process.env
const locale = getUnLocale()

const options = {
  host  : 'https://www.cbd.int',
  dapi  : DAPI,
  static: false,
  siteNavigationElements,
  locale
}

export default (opts={}) => ({ ...options, ...opts })