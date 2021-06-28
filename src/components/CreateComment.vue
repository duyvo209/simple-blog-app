<template>
  <div class="container">
      <div class="row">
        <form @submit.prevent="createComment" style="width: 433px">
            <input v-model="comment.comment" type="text" name="comment" class="input" id="comment" placeholder="Write a comment ...">
            <button type="submit" class="button">Send</button>
        </form>
      </div>
  </div>
    
</template>

<script>
import BaseRequest from '../core/BaseRequest.js'

export default {
  name: 'CreateComment',
  data() {
      return {
        comment: {
            comment: '',
            id_user: localStorage.getItem('id'),
            id_blog: this.idBlog,
            name: localStorage.getItem('name')
        }
      }
  },
  methods: {
    createComment(submitEvent) {
        const id = localStorage.getItem('id');
        const name = localStorage.getItem('name');

        BaseRequest.post('addcomment', {
          comment: submitEvent.target.elements.comment.value,
          id_user: id,
          id_blog: this.idBlog,
          name: name
        })
        .then( () => {
          alert('Have been commented !');
        })
        .catch( error => {
          console.log(error);
        })
    },
  },
  props: {
    idBlog: Number
  }
}
</script>

<style scoped>
    .input {
        width: 88%;
        height: calc(1.5em + 0.75rem + 2px);
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .button {
        height: 38px;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
       
    }
    .button:hover {
        background-color: #37474f;
        color: white;
    }
</style>
