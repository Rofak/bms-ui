<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card
          elevation="2"
          width="500px"
          class="mx-auto pa-6 mt-16"
        >
          <div class="d-flex justify-center">
            <h2>Login Form</h2>
          </div>
          <v-form style="width: 100%" >
            <v-text-field
              v-model="username"
              label="Username"
              prepend-icon="mdi-account"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              prepend-icon="mdi-lock"
              required
              type="password"
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-btn
                depressed
                elevation="2"
                color="primary"
                @click="login()"
              >
                Login
              </v-btn>
            </div>
          </v-form>
        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>
<script>
  export default {
    data(){
      return{
        username:'',
        password:'',
      }
    },
    methods:{
      login(){
        this.$auth.loginWith("local",{
          data:{
            username:this.username,
            password:this.password,
          }
        }).then(r=>{
          console.log(r)
        })
      }
    }
  }
</script>
