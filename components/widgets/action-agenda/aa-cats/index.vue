<template>
  <div class="block block-cbd-utility block-filters-block my-4 py-2">
    <UpdatesWidgetHeader />

    <div class="view-filtered-items">
      <div class="container-fluid">
        <transition-group name="flip-list" tag="div" class="row">
          <div v-for="({ image, url, identifier, name, count }, index) in cats" v-bind:key="identifier" :class="{ 'col-md-3': index < 8, 'col-md-4': index >= 8 }" class="cont  p-0">
            <a :href="url">
              <img class="img-fluid" :src="image[0]" />
              <div class="overlay">
                <h3 class="absolute-center" style="color: white; height: 50%;">{{ name }}</h3>
                <div class="background-circle" style="color: white;">
                  {{ count.count }}
                  <!-- Testing count.count -->
                </div>
              </div>
            </a>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
import { getData } from "@action-agenda/cached-apis";
import UpdatesWidgetHeader from "./header";

export default {
  name: "AACatsWidget",
  components: { UpdatesWidgetHeader },
  methods: { getCategoryCount },
  created,
  data,
};

function data() {
  return {
    cats: [],
    // categoryCount: [],
  };
}

async function created() {
  this.cats = await this.getCategoryCount();
}

async function getCategoryCount() {
  const catNumber = Promise.all(
    (await getData("actionCategories"))
      .map(async (cat) => {
        cat.image = [`https://attachments.cbd.int/${cat.identifier}.jpg`, cat.image];

        const q = { "actionDetails.actionCategories": { identifier: cat.identifier } };
        cat.count = (await this.$axios.get("https://api.cbd.int/api/v2019/actions", { params: { q, c: 1 } })).data;

        return cat;
      })
      .sort(() => 0.5 - Math.random())
  );

  setTimeout(() => {
    this.cats = this.cats.sort(compare);
  }, 1000);

  return catNumber;
}

function compare(a, b) {
  if (a.identifier < b.identifier) return -1;
  if (a.identifier > b.identifier) return 1;

  return 0;
}
</script>

<style scoped>
img {
  width: 100%;
}

.flip-list-move {
  transition: transform 1s;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: #000;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.background-circle {
  height: 15vh;
  width: 5vw;
  text-align: center;
  font-size: 2rem;
  vertical-align: middle;
  border-radius: 50%;
  background: rgb(88, 88, 88);

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
}

.absolute-center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.cont:hover .overlay {
  opacity: 0.9;
}

@media (min-width: 768px) {
  img {
    max-height: 120px;
  }
}

@media (min-width: 992px) {
  img {
    max-height: 155px;
  }
}

@media (min-width: 1200px) {
  img {
    max-height: 155px;
  }
}

@media (min-width: 1600px) {
  img {
    max-height: 230px;
  }
}
</style>
