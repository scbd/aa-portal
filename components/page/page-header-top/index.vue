<template >
  <header v-if="siteNavElms.length" id="pageHeaderFixed" ref="pageHeaderFixed" class="header" role="banner" :aria-label="$t('Page Header')">
    <WPHeader v-bind="{ siteNavElms, opts }"/>

    <Icons />

    <Desktop  v-show="!isMobile" v-bind="{ siteNavElms, opts }"/>
    <Mobile   v-show="isMobile"  v-bind="{ siteNavElms, opts }"/>
  </header>
</template>

<script>
import NuxtSSRScreenSize   from 'nuxt-ssr-screen-size'
import i18n                from './locales/index.mjs'
import debounce            from 'tiny-debounce'
import WPHeader            from './components/StructuredData/WPHeader.vue'
import Icons               from './components/Icons.vue'
import Mobile              from './components/Mobile/index.vue'
import Desktop             from './components/Desktop/index.vue'
import getDefaultOptionsFn from './default-options'

export default {
  name      : 'PageHeaderFixed',
  mixins    : [ NuxtSSRScreenSize.NuxtSSRScreenSizeMixin ],
  components: { WPHeader, Icons, Mobile, Desktop },
  computed  : { opts, isMobile },
  methods   : { readMenusFromApi, getTopMenu, getMain },
  props     : { options: { type: Object, default: () => {} } },
  mounted, data, created, i18n
}

function created(){ setTimeout(() => this.readMenusFromApi(), 100) }

async function readMenusFromApi(){
  this.mainSNEs    = (await this.getMain(this.opts))
  this.siteNavElms = (await this.getTopMenu(this.opts))
}

function data(){ return { siteNavElms: [], mainSNEs: {} } }

function opts(){
  const { drupalApi, drupalMenuName } = this.$config
  const   defaultOpts                 = getDefaultOptionsFn({ ...this.options, dapi: drupalApi })


  defaultOpts.siteNavElms = this.siteNavElms
  defaultOpts.mainSNEs    = Object.keys(this.mainSNEs).length? this.mainSNEs : defaultOpts.mainSNEs

  return { ...defaultOpts, drupalMenuName }
}

function isMobile(){ return this.$vssWidth < 990 }

function mounted(){
  const self = this

  this.$nextTick(() => window.addEventListener('resize', () => debounce(self.$forceUpdate(), 500)))
  setTimeout(() => this.readMenusFromApi(), 600)
}

async function getMain({ dapi, drupalMenuName }){
  const menuData = await this.$axios.$get(`${dapi}/menus/${drupalMenuName}?postfix=WPHF`)
    .then((d) =>  ({ identifier: [ { name: 'drupalMenuName', value: drupalMenuName } ], name: 'Action Agenda', position: 3, hasPart: d }))

  return menuData
}

function getTopMenu({ dapi }){ return this.$axios.$get(`${dapi}/menus/topmenu?postfix=WPHF`) }

</script>

<style>
  .slide-fade-enter-active { transition:  all .1s ease; }
  .slide-fade-enter, .slide-fade-leave-to { transform: translateY(-20px); opacity  : 0; }
</style>
<style scoped>
#pageHeaderFixed{width: 100vw; z-index: 3; }
</style>