<template>
  <div class="parent">
    <v-container 
    
      class="scroll-y child"
      id="scroll-target"
    >
      <v-layout
        column
        align-center
        justify-center
        v-scroll="{
          target: '#scroll-target',
          callback: this.onScroll
        }"
        style="height: 1000px"
      >
      <v-card height 1000px></v-card>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  export default {

    methods: {

    }
  }
</script>
<style>
.parent {
    overflow: hidden;
    position: relative;
    width: 100%;
}
.child {
    background:green;
    height: 100%;
    width: 50%;
    position: absolute;
    right: 0;
    top: 0;
}
</style>
