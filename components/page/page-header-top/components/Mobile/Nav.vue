<template>
  <div v-show="show" class="mobile-nav-wrapper ml-auto mobile-menu" style="min-width:88vw;">
      <div  class="navbar-collapse" style="width:100%">
        <hr >
          <TopMenuDropDown  :opts="{...opts, siteNavElms: mobileSiteNavElms}"/>
        <hr >
        <div class="mobile-top-menu">
          <LoginNav v-bind="$props" />
          <SearchNav :siteNavElms="opts.siteNavElms" v-bind="$props" is-mobile="Mobile"/>
        </div>
      </div>

  </div>
</template>

<script>
import TopMenuDropDown from '../TopMenuDropDown.vue'
import LoginNav        from '../LoginNav.vue'
import SearchNav       from '../SearchNav.vue'


export default {
  name      : 'MobileNav',
  components: { TopMenuDropDown, LoginNav, SearchNav},
  props     : {
    opts: { type: Object, required: true },
    show: { type: Boolean, default: false }
  },
  computed: { mobileSiteNavElms }
}

function mobileSiteNavElms (){ return [this.opts.mainSNEs, ...this.opts.siteNavElms]}
</script>

<style scoped>
.mobi-name{
  font-size: 18px;
  color: #ffffff !important;
  word-break: break-word;
}
</style>