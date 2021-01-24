<template>
  <div class="col-12 d-flex justify-content-center">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
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

        <li class="page-item">
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
      randomProducts: [],
      isLoading: false,
      products: [],
      cartProductID: [],
      cartID: [],
      quantityValue: 1,
      favourite: [],
    };
  },
  props: ['PaginationData'],
  methods: {
    changePage(page) {
      switch (page) {
        case 'add': {
          const maxPage = this.PaginationData.nowPage < this.PaginationData.allPage;
          if (maxPage) {
            this.PaginationData.nowPage += 1;
          }
          break;
        }
        case 'reduce': {
          const minPage = this.PaginationData.nowPage > 1;
          if (minPage) {
            this.PaginationData.nowPage -= 1;
          }
          break;
        }
        default:
          this.PaginationData.nowPage = parseInt(page, 10);
          break;
      }
      this.$emit('pagination-event', this.PaginationData.nowPage);
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

</style>
