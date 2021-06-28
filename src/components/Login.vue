<template>
  <div class="container">
    <div class="row">
        <form class="col-4 mx-auto bordered mt-5" @submit.prevent="login()">
            <h2>Login</h2>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="user.email" type="email" name="email" class="form-control" id="email">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input v-model="user.password" type="password" name="password" class="form-control">
            </div>    
            <br>
            <button style="background-color: black; width: 100%" type="submit" class="btn btn-primary">Submit</button>
            <br> <br>
            <p style="text-align:center"><a style="text-align: center" href="/signup">Create a new account</a></p>
        </form>
    </div>
   
  </div>
</template>

<script>

import BaseRequest from '../core/BaseRequest.js'

export default {
  name: 'Login',
  data() {
      return{
          user: {
              email: '',
              password: '',
          }
      }
  },
  methods: {
      login: function() {
        BaseRequest.post('authenticate', this.user)
        .then( response => {
            window.localStorage.setItem('token', response.data.token);
            window.localStorage.setItem('id', response.data.id);
            window.localStorage.setItem('name', response.data.name);
            this.$router.push({name: 'home'});
            console.log(response);
        })
        .catch( error => {
            this.errors = error.response.data;
            console.log(error.response.data);
        });
      }
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>
