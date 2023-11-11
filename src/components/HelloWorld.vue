<template>
  <div class="hello">
    <form class="registration-form" @submit.prevent="submit">
      <div class="registration-form__email">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="registration-form__password">
        <label for="suranme">Surname</label>
        <input type="text" id="suranme" v-model="surname" />
      </div>

      <div class="registration-form__email">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="registration-form__password">
        <label for="pass">Password</label>
        <input type="password" id="pass" v-model="password" />
      </div>

      <button type="submit">Submit</button>
    </form>

    <form
      class="registration-form"
      @submit.prevent="loginFn"
      style="margin-top: 100px"
    >
      <div class="registration-form__email">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="login.email" />
      </div>
      <div class="registration-form__password">
        <label for="pass">Password</label>
        <input type="password" id="pass" v-model="login.pass" />
      </div>

      <button type="submit">Login</button>
    </form>

    <button @click="getUserList">Get users list</button>
    <button @click="logOutFn">Log out</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",

      login: {
        email: "",
        pass: "",
      },
    };
  },
  methods: {
    async submit() {
      let data = {
        user: {
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
        },
      };

      await axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/api/registration`, data)
        .then((res) => {
          console.log(res.data.data);
        });
    },

    async loginFn() {
      this.$store.dispatch("logInAction", {
        email: this.login.email,
        password: this.login.pass,
      });
    },

    async getUserList() {
      this.$store.dispatch("getUserListAction");
    },

    logOutFn() {
      this.$store.dispatch("logOutAction");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
