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
  data() {
    return {

    };
  },
  methods: {
    touchKind(name) {
      const touchName = name;
      // this.select = touchName;
      this.$emit('touchKind', touchName);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
