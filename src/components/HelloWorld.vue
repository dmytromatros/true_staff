<template>
  <div class="hello">
    <form class="registration-form" @submit.prevent="submit">
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
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submit() {
      let data = { email: this.email, password: this.password };

      console.log(data);
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
