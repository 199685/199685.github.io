<template>
  <div>
    <ul class="fruit-item pl-0 text-center">
      <li class="list-style-none">
        <a
          class="fruit p-3 d-block h6 m-0"
          href="#"
          :class="{ active: select === 'all' }"
          @click.prevent="touchKind('all')"
          >全部</a
        >
      </li>
      <li class="list-style-none">
        <a
          class="fruit p-3 d-block h6 m-0"
          href="#"
          :class="{ active: select === 'spring' }"
          @click.prevent="touchKind('spring')"
          >春季水果</a
        >
      </li>
      <li class="list-style-none">
        <a
          class="fruit p-3 d-block h6 m-0"
          href="#"
          :class="{ active: select === 'summer' }"
          @click.prevent="touchKind('summer')"
          >夏季水果</a
        >
      </li>
      <li class="list-style-none">
        <a
          class="fruit p-3 d-block h6 m-0"
          href="#"
          :class="{ active: select === 'autumn' }"
          @click.prevent="touchKind('autumn')"
          >秋季水果</a
        >
      </li>
      <li class="list-style-none">
        <a
          class="fruit p-3 d-block h6 m-0"
          href="#"
          :class="{ active: select === 'winter' }"
          @click.prevent="touchKind('winter')"
          >冬季水果</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['select'],
  methods: {
    touchKind(name) {
      const touchName = name;
      const vm = this;
      if (vm.beforeSelect !== touchName) {
        vm.$store.commit('UPDATELOADING', true);
        vm.$emit('touchKind', touchName);
        setTimeout(() => { vm.$store.commit('UPDATELOADING', false); }, 500);
      }
    },
  },
  computed: {
    beforeSelect() {
      return this.select;
    },
  },
};
</script>

<style lang="scss" scoped></style>
