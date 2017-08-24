<template>
  <div id="app">

     <router-link to="/">Home</router-link>
     ||||
     <router-link to="/word">word</router-link>
     ||||
     <router-link to="/index">index</router-link>
    <span @click="art">{{name}}</span>
app
    <keep-alive include="word">
      <transition name="fade" mode="out-in">
			    <router-view></router-view>
		  </transition>
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    console.log('创建了')
  },
  data (){
    return {
      name:'小明'
    }
  },
  methods:{
    art(){
      console.log('打印出来了')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active, .fade-leave-active{
    transition: all .15s ease;
}
.fade-enter, .fade-leave-active{
  transform: translateX(5px);
  opacity: 0;
}

</style>
