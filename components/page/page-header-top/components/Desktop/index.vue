<template >
  <nav id="pageFixedNav" class="navbar navbar-expand-lg top-nav desktop-only">
    <div class="limited-width-content">

      <div class="navbar-collapse">
        <TopMenuDropDown v-bind="$props"/>
      
        <LoginNav v-bind="$props"/>

        <div id="block-topsearchblock" class="block-top-search-block" >
          <SearchNav v-bind="$props"/>
        </div>
      </div>

    </div>
  </nav>
</template>

<script>
import i18n            from '../../locales/index.mjs'
import TopMenuDropDown from '../TopMenuDropDown.vue'
import SearchNav       from '../SearchNav.vue'
import LoginNav        from '../LoginNav.vue'

export default {
  props     : [ 'siteNavElms', 'opts' ],
  components: { TopMenuDropDown, SearchNav, LoginNav },
  i18n
}
</script>