<template>
  <div class="main-background">
    <div class="main-background__colors">
      <div class="main-background__9"></div>
      <div class="main-background__1"></div>
      <div class="main-background__2"></div>
      <div class="main-background__3"></div>
      <div class="main-background__4"></div>
      <div class="main-background__5"></div>
      <div class="main-background__8"></div>
      <div class="main-background__6"></div>
      <div class="main-background__7"></div>
      <div class="main-background__10"></div>
    </div>
    <div class="main-background__blur"></div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
.main-background {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
  &__colors {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: red;
  }
  &__blur {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0px;
    left: -25px;
    backdrop-filter: blur(200px);
    background-color: $back-color;
  }

  //   Circles

  &__1 {
    position: absolute;
    width: 5%;
    height: 5%;
    background-color: $second-color;
    box-shadow: 0 0 350px 350px $second-color;
    border-radius: 50%;
    left: 0;
    top: 0;
  }
  &__10 {
    position: absolute;
    width: 5%;
    height: 5%;
    background-color: $second-color;
    box-shadow: 0 0 100px 100px $second-color;
    border-radius: 50%;
    left: 20%;
    top: 50%;
  }
  &__2 {
    position: absolute;
    width: 5%;
    height: 5%;
    background-color: $main-color;
    box-shadow: 0 0 350px 350px $main-color;
    border-radius: 50%;
    left: 45%;
    top: -10%;
  }

  &__3 {
    position: absolute;
    width: 5%;
    height: 5%;
    background-color: $main-color;
    box-shadow: 0 0 350px 350px $main-color;
    border-radius: 50%;
    left: 10%;
    top: 70%;
  }

  &__4 {
    position: absolute;
    width: 5%;
    height: 5%;
    background-color: $main-color;
    box-shadow: 0 0 350px 350px $main-color;
    border-radius: 50%;
    left: 0%;
    top: 100%;
  }

  &__5 {
    position: absolute;
    width: 5%;
    height: 5%;
    background-color: $second-color;
    box-shadow: 0 0 350px 350px $second-color;
    border-radius: 50%;
    left: 50%;
    top: 100%;
  }

  &__6 {
    position: absolute;
    width: 5%;
    height: 5%;
    background-color: $second-color;
    box-shadow: 0 0 350px 350px $second-color;
    border-radius: 50%;
    left: 100%;
    top: 00%;
  }

  &__7 {
    position: absolute;
    width: 5%;
    height: 5%;
    background-color: $main-color;
    box-shadow: 0 0 350px 350px $main-color;
    border-radius: 50%;
    left: 100%;
    top: 100%;
  }

  &__8 {
    position: absolute;
    width: 5%;
    height: 5%;
    background-color: $main-color;
    box-shadow: 0 0 350px 350px $main-color;
    border-radius: 50%;
    left: 80%;
    top: 50%;
  }

  &__9 {
    position: absolute;
    width: 5%;
    height: 5%;
    background-color: $second-color;
    box-shadow: 0 0 350px 350px $second-color;
    border-radius: 50%;
    left: 50%;
    top: 50%;
  }
}
</style>
