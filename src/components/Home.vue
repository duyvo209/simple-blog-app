<template>
  <div>
     <link rel="stylesheet" href="/src/css/all.min.css">
     <header>
       <div style="display: flex; justify-content: center;">
          <h5 style="display:inline-block; padding-left: 0px"><a href="/home">Blog</a></h5>
          <h5 style="display:inline-block; padding-left: 180px"><a href="/addblog">Add a new blog</a></h5>
          <h5 style="display:inline-block; padding-left: 160px"><a @click="logout()">Logout</a></h5>
       </div>
       
    </header>

    <div class="container">
      <h4>All Blog Articles</h4>
      <div class="rows">
        <input type="text" name="search" class="form-control" id="search" placeholder="Search Blogs ..." v-model="search">
          <div id="form">
            <ul>
              <li v-for="blog in filterBlogs" :key="blog.id">
                <h4 class="title" name="title">{{blog.title}}</h4>
                <h6 class="content" name="content">{{blog.content}}</h6>
                <font-awesome-icon icon="thumbs-up"/>
                <!-- <ShowLike></ShowLike> -->
                <span >
                  {{ showLike.reduce((accumulator, currentValue) => currentValue.id_blog === blog.id ? accumulator + 1 :  accumulator + 0,0)}} 
                </span>
                <hr>
                <div class="actions">
                  <span class="like" @click="createLike(blog.id)"><font-awesome-icon icon="thumbs-up"/> Like</span>
                    &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;
                  <span class="comment"><font-awesome-icon icon="comment-alt"/> Comment</span>
                    &emsp;&emsp;&emsp;&emsp; &emsp;
                  <span class="share"><font-awesome-icon icon="share"/>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=blog.id " target="_blank" class="link"> Share</a> 
                  </span> 
                </div>
                <hr>
                <CreateComment v-bind:idBlog="blog.id"></CreateComment>                
                <br>
                <span>
                  <div class="show-comment" v-for="comment in showComment" :key="comment.id">               
                      <span>{{ comment.id_blog === blog.id ? comment.name : '' }}</span>
                      <div>
                        <span style="font-size: 13px"> {{ comment.id_blog === blog.id ? comment.comment : ''}}</span>
                      </div>
                  </div>
                </span>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>

import BaseRequest from '../core/BaseRequest.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faCommentAlt, faShare } from '@fortawesome/free-solid-svg-icons'
library.add( faThumbsUp, faCommentAlt, faShare )

import CreateComment from './CreateComment.vue';
// import ShowLike from './ShowLike.vue';

export default {
  name: '',
  components: {
    CreateComment,
    // ShowLike
  },
  data() {
      return {
          search: "",
          blogs: [],
          like: {
            count: '',
            id_blog: ''
          },
          showLike: [],
          showComment: [],
      }
  },

  mounted() {
      this.getBlog();
      this.getLike();
      this.getComment();
  },
  methods: {
      getBlog: function() {
        BaseRequest.get('getblog')
        .then ( response => {
          console.log(response.data);

          this.blogs = response.data;
        })
      },

      createLike: function(id) {
        const idUser = localStorage.getItem('id');
        BaseRequest.post('addlike', {
          id_blog: id,
          id_user: idUser,
          count: 1,
        })
        .then( () => {
          window.addEventListener('load', function() {
            console.log('All assets are loaded')
          })
        })
        .catch( error => {
          console.log(error);
        })
      },

      getLike: function() {
        BaseRequest.get('getlike')
        .then (response => {
          console.log(response.data);
          this.showLike = response.data;
        })
      },

      deleteLike: function(id) {
        const idUser = localStorage.getItem('id');
        BaseRequest.delete('deletelike', {
          id_user: idUser,
          id_blog: id,
        })
        .catch( error => {
          console.log(error);
        })
      },

      getComment: function() {
        BaseRequest.get('getcomment')
        .then( response => {
            console.log(response.data);
            this.showComment = response.data;
        })
      },
  
      logout: function() {
        window.localStorage.removeItem('token');
        window.location.href = "/login";
      },
      
  },
  computed: {
      filterBlogs: function() {
        return this.blogs.filter((blog) => {
          return blog.title.toLowerCase().match(this.search.toLowerCase());
        });
      }
  },
  props: {
    idBlog: Number
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
    h5:hover{
        color: #FF6F00;
    }
    h5 > a {
        color: white;
        text-decoration: none;
    }
    h5 > a:hover {
        color: #FF6F00;
    }
    h4 {
        text-align: center;
        margin-top: 30px;
    }
    .rows {
        margin-top: 30px;
        width: 50%;
        display: block;
        margin-right: auto;
        margin-left: auto;
    }
    #form{
        width: 100%;
        max-width: 1200px;
        margin: 40px auto;
        padding: 0px 20px;
        box-sizing: border-box;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        width: 100%;
    }
    li{
        flex-grow: 1;
        flex-basis: 300px;
        padding: 30px;
        border: 1px solid #222;
        margin: 10px;
    }
    .title{
      margin-top: -5px;
      text-align: left;
    }
    .actions{
      cursor: pointer;
    }
    .like{
      padding: 5px;
    }
    .comment{
      padding: 5px;
    }
    .share{
      padding: 5px;
    }
    .link {
      text-decoration: none;
      color: black;
    }
    .link:hover {
      color: white;
    }
    .like:hover{
      background-color: #37474f;
      color: white;
      width: 13%;
      border-radius: 10%;
     
    }
    .comment:hover{
      background-color: #37474f;
      color: white;
      width: 13%;
      border-radius: 10%;
    }
    .share:hover{
      background-color: #37474f;
      color: white;
      width: 13%;
      border-radius: 10%;
    }
    .show-comment{
      padding: 10px;
      border-radius: 10px;
      background-color: #37474f;
      color: white;
      margin-bottom: 15px;
    }
</style>
