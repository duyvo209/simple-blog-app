<template>
  <div class="container">
    <div class="row">
        <form class="col-4 mx-auto bordered mt-5" @submit.prevent="signup">
            <h2>SignUp</h2>
            <div class="form-group">
                <label>Name</label>
                <input v-model="user.name" type="text" name="name" class="form-control">
            </div>    
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
        </form>
    </div>
   
  </div>
</template>

<script>
import BaseRequest from '../core/BaseRequest.js'

export default {
  name: 'Signup',
  data() {
      return{
          user: {
              name: '',
              email: '',
              password: '',
          }
      }
  },
  methods: {
      signup(submitEvent) {
        BaseRequest.post('signup', {
            name: submitEvent.target.elements.name.value,
            email: submitEvent.target.elements.email.value,
            password: submitEvent.target.elements.password.value
        })
        .then ( () => {
            this.$router.push({name: 'login'});
        })
        .catch( error => {
            this.errors = error.response.data;
            console.log(error.response.data);
        })
      }
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>
