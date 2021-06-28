<template>
    <div>
        <header>
            <div style="display: flex; justify-content: center;">
                <h5 style="display:inline-block; padding-left: 0px"><a href="/home">Blog</a></h5>
                <h5 style="display:inline-block; padding-left: 180px"><a href="/addblog">Add a new blog</a></h5>
                <h5 style="display:inline-block; padding-left: 160px"><a @click="logout()">Logout</a></h5>
            </div>
        </header>
    
         <div class="container">
            <div class="row">
                <form class="col-8 mx-auto bordered mt-5" @submit.prevent="createBlog">
                    <h2>Add a new blog</h2>
                    <div class="form-group">
                        <label for="title">Title: </label>
                        <input v-model="post.title" type="text" name="title" class="form-control" id="title">
                    </div>
                    <div class="form-group">
                        <label for="title">Content: </label>
                        <textarea v-model="post.content" type="text" name="content" class="form-control" id="content" rows="10"></textarea>
                    </div>
                
                    <button style="background-color: black; width: 15%" type="submit" class="btn btn-primary">
                        Post
                    </button>
                </form>
            </div>
        </div>
    </div>
 
</template>

<script>

import BaseRequest from '../core/BaseRequest.js'

export default {
  name: 'Addblog',
  data() {
      return {
          post: {
              title: '',
              content: '',
          },
          error: {
              
          },
      }
  },
  methods: {
      logout: function() {
        window.localStorage.removeItem('token');
        window.location.href = "/login";
      },  
      
      createBlog(submitEvent) {
        BaseRequest.post('addblog', {
            title: submitEvent.target.elements.title.value,
            content: submitEvent.target.elements.content.value,
        })
        .then( () => {
            alert('Have been published !'); 
            // this.post = {title: '', content: ''}
        })
        .catch( error => {
            // this.errors = error.response.data;
            console.log(error);
        });
      }
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>
        header{
            background:#37474f;
            padding: 20px;
            width: 100%;
        }
        h5{
            color: white;
            text-align: center;
            cursor: pointer;
        }
        h5:hover {
            color: #FF6F00;
        }
        h5 > a {
            color: white;
            text-decoration: none;
        }
        h5 > a:hover {
            color: #FF6F00;
        }
</style>
