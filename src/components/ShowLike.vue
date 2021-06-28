<template>
      <div class="">
          <span v-for="like in showLike" :key="like.id"> 
              {{like.count}}
          </span>
      </div>
</template>

<script>
import BaseRequest from '../core/BaseRequest.js'

export default {
  name: '',
  data() {
      return {
           showLike: []
      }
  },
  mounted() {
      this.getLike();
  },

  methods: {
    getLike: function() {
        BaseRequest.get('getlike')
        .then (response => {
          console.log(response);
          this.showLike = response.data;
        })
    },
  },
  props: {
    id: Number
  }
}
</script>

<style scoped>

</style>
