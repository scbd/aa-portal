<template>
  <div class="position-relative">
    <div class="container ">
      <div class="row pt-5">
        <div class="col-lg-5 p-lg-0 z-10">
          <video width="100%" controls>
            <source src=" https://www.cbd.int/action-agenda/action%20agenda%20video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="col-lg-2 p-lg-0  px-lg-3 z-10">
          <Counts :pledges="pledges" :partnerships="partnerships" />
        </div>
        <div class="col-lg-5 p-lg-0 z-10 img-size">
          <img class="img-fluid" src="~/assets/wg2020-background-1.jpg" />
          <div class="caption">
            <a href="https://www.cbd.int/action-agenda/infosession.shtml">
              <h4 class="text-box-1">
                {{ $t("WG2020-4 Information Session") }}
              </h4>
              <h4 class="text-box-2">
                {{ $t("on the Sharm El-Sheikh to Kunming Action Agenda for Nature and People") }}
              </h4>
            </a>
          </div>
        </div>
      </div>

      <div class="row ">
        <div class="col-12 px-0 z-10 mb-5">
          <AACats />
        </div>
      </div>
    </div>

    <ClientOnly v-if="true">
      <div v-if="loaded" class="particles-cont">
        <VueParticles class="particles" color="#000000" :particleOpacity="0.7" linesColor="#000000" :particlesNumber="80" shapeType="circle" :particleSize="5" :linesWidth="2" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"> </VueParticles>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import VueParticles from "vue-particles/src/vue-particles/vue-particles.vue";
import Counts from "~/components/widgets/action-agenda/counts/index.vue";
import AACats from "~/components/widgets/action-agenda/aa-cats/index.vue";

export default {
  name: "PoratalAppIndex",
  components: {
    Counts,
    AACats,
    VueParticles,
  },

  methods: {
    getNumberOfPledges,
    getNumberOfPartnerships,
  },
  created,
  mounted() {
    setTimeout(() => (this.loaded = true), 3000);
  },
  asyncData,
};

function asyncData(ctx) {
  return {
    pledges: 0,
    partnerships: 0,
    loaded: false,
  };
}
async function created() {
  this.pledges = await this.getNumberOfPledges();
  this.partnerships = await this.getNumberOfPartnerships();
}
async function getNumberOfPledges() {
  const { count } = (await this.$axios.get("https://api.cbd.int/api/v2019/actions", { params: { c: 1 } })).data;

  return count;
}
async function getNumberOfPartnerships() {
  const q = { "partners.0.name.en": { $exists: 1 } };
  const { count } = (await this.$axios.get("https://api.cbd.int/api/v2019/actions", { params: { q, c: 1 } })).data;

  return count;
}
</script>

<style scoped>
img {
  display: block;
  filter: brightness(70%);
  width: 100%;
  max-height: 38vh;
}

.caption {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
}

.text-box-1 {
  text-align: center;
  color: white;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 5vh;
  text-decoration: underline;
  text-shadow: 1px 1px rgb(30, 29, 29);

  padding-bottom: 10px;
}

.text-box-2 {
  text-align: center;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 4.5vh;
  text-shadow: 0.5px 0.5px rgb(30, 29, 29);
}

.text-box-1:hover {
  font-size: 5.5vh;
  font-weight: 1000;
  text-shadow: 1.5px 1.5px rgb(30, 29, 29);
}

.text-box-2:hover {
  font-size: 4.55vh;
  font-weight: 1000;
  text-shadow: 1px 1px rgb(30, 29, 29);
}

.z-10 {
  z-index: 10;
}

.particles-cont {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.particles {
  width: 100vw;
  height: 100%;
  z-index: 1;
}
</style>
