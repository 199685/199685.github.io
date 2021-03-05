<template>
  <div class="col-12 d-flex justify-content-center">
    <loading :active.sync="isLoading">
      <div class="loading-blue">
        <div class="ldio-loading">
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
        </div>
      </div>
    </loading>
    <nav aria-label="Page navigation example">
      <ul class="pagination mt-xl-5">
        <li class="page-item" :class="{disabled: PaginationData.nowPage === 1}">
          <a class="page-link" href="#" @click.prevent="changePage('reduce')">上一頁</a>
        </li>

        <li
          class="page-item"
          v-for="page in PaginationData.allPage"
          :class="{ active: PaginationData.nowPage === page }"
          :key="page"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>

        <li class="page-item"
        :class="{disabled: PaginationData.nowPage === PaginationData.allPage}">
          <a class="page-link" href="#" @click.prevent="changePage('add')">下一頁</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  props: ['PaginationData'],
  methods: {
    changePage(page) {
      const nextPage = this.PaginationData.nowPage;
      switch (page) {
        case 'add': {
          const maxPage = this.PaginationData.nowPage < this.PaginationData.allPage;
          if (maxPage) {
            this.PaginationData.nowPage += 1;
            this.isLoading = true;
            this.Top();
          }
          break;
        }
        case 'reduce': {
          const minPage = this.PaginationData.nowPage > 1;
          if (minPage) {
            this.PaginationData.nowPage -= 1;
            this.isLoading = true;
            this.Top();
          }
          break;
        }
        default:
          this.PaginationData.nowPage = parseInt(page, 10);
          if (nextPage !== this.PaginationData.nowPage) {
            this.isLoading = true;
            this.Top();
          }
          break;
      }
      this.$emit('pagination-event', this.PaginationData.nowPage);
    },
    Top() {
      window.scrollTo({
        top: 0,
        left: 0,
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.page-link {
  color: white;
  background-color: #4e6c8a;
  &:hover {
    color: black;
    background-color: #a6c6e8;
    border-color: #a6c6e8;
  }
}
.page-link:focus{
  box-shadow: 0 0 0 0 transparent;
}
</style>
