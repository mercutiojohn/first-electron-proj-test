<template>
  <div id="app">
    <div class="head-bar">
      <div class="drag"></div>
      <div class="func">
        <div class="window-btn minimize" @click="minimizeMin"></div>
        <div class="window-btn maximize" @click="maximizeMin"></div>
        <div class="window-btn close" @click="closeMin"></div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ipcRenderer } from "electron"
  export default {
    name: 'first-electron-proj',
    methods:{
      minimizeMin(){
        console.log("minimize");
        ipcRenderer.send('window-min')
      },
      maximizeMin(){
        console.log("maximize");
        ipcRenderer.send('window-max')
      },
      closeMin(){
        console.log("close");
        ipcRenderer.send('window-close')
      },
    }
  }
</script>

<style>
  /* CSS */
  .head-bar{
    height:33px;
    /* background: #fff; */
    width: 100%;
    display: flex;
    position: fixed;
    top:0;
    left: 0;
  }
  .head-bar .drag{
    width: calc(100vw - 130px);
    -webkit-app-region:drag;
    -webkit-user-select:none;
  }
  .head-bar .func{
    width: 130px;
    display: flex;
  }
  .head-bar .func .window-btn{
    /* background: #000; */
    border: 1px solid #000;
    width: calc(130px / 3);
    height: 100%;
    cursor: pointer;
    transition: all .2s ease;
  }
  .head-bar .func .window-btn:hover{
    background: #cecece;
  }
  .head-bar .func .window-btn:active{
    background: #646464;
  }
  
</style>
