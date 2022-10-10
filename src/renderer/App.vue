<template>
  <div id="app">
    <!-- <div class="head-bar">
      <div class="drag"></div>
      <div class="func">
        <div class="window-btn minimize" @click="minimizeMin"></div>
        <div class="window-btn maximize" @click="maximizeMin"></div>
        <div class="window-btn close" @click="closeMin"></div>
      </div>
    </div> -->
    <el-container style="height: 100vh">
      <el-header style="text-align: left; font-size: 12px" height="50px">
        <!-- <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span> -->
      </el-header>

      <el-container>
        <el-aside
          :style="{
            width: isCollapse ? '65px' : '300px',
            transition: 'all .2s ease',
          }"
        >
          <el-button
            :class="{ 'expand-btn': true, collapse: isCollapse }"
            type="plain"
            size="small"
            icon="el-icon-s-fold"
            @click="isCollapse = !isCollapse"
            router="true"
          ></el-button>
          <el-menu
            class="main-menu"
            :default-openeds="['1', '3']"
            style="min-height: calc(100% - 50px)"
            :collapse="isCollapse"
            collapse-transition="false"
          >
            <router-link to="/">
              <el-menu-item index="/" route="/">
                <i class="el-icon-document"></i>
                <span slot="title">快捷入口</span>
              </el-menu-item>
            </router-link>
            <router-link to="/about">
              <el-menu-item index="/about" :route="'/about'">
                <i class="el-icon-info"></i>
                <span slot="title">关于</span>
              </el-menu-item>
            </router-link>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">设置</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <router-link to="/about">
                  <el-menu-item index="3-1">gy</el-menu-item></router-link
                >
                <el-menu-item index="3-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  name: "first-electron-proj",
  methods: {
    minimizeMin() {
      console.log("minimize");
      ipcRenderer.send("window-min");
    },
    maximizeMin() {
      console.log("maximize");
      ipcRenderer.send("window-max");
    },
    closeMin() {
      console.log("close");
      ipcRenderer.send("window-close");
    },
  },
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
      isCollapse: false,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, "Microsoft Yahei", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background:#eee; */
  min-height: 100vh;
}
input,
textarea,
select,
button,
.el-select-dropdown__empty,
.el-picker-panel,
.el-menu--vertical {
  font-family: Avenir, "Microsoft Yahei", Helvetica, Arial, sans-serif;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #409eff;
}
/* CSS */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
}
.head-bar {
  height: 50px;
  /* background: #fff; */
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
}
.head-bar .drag {
  width: calc(100vw - 130px);
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
.head-bar .func {
  width: 130px;
  display: flex;
}
.head-bar .func .window-btn {
  /* background: #000; */
  border: 1px solid #000;
  width: calc(130px / 3);
  height: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
}
.head-bar .func .window-btn:hover {
  background: #cecece;
}
.head-bar .func .window-btn:active {
  background: #646464;
}
.el-header {
  /* background-color: #b3c0d1; */
  /* border-bottom: 1px solid #eee; */
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.el-menu::-webkit-scrollbar {
  width: 0;
}
.el-menu {
  background-color: unset !important;
  border-right: none !important;
}
.el-menu--popup {
  background: #fafafa !important;
  border-radius: 10px !important;
  border: 1px solid #eee !important;
  box-shadow: 0 12px 20px 1px rgba(0, 0, 0, 0.081) !important;
  /* backdrop-filter: blur(100px); */
}
.el-main {
  background: rgba(255, 255, 255, 0.534);
  padding: 0 !important;
  border-radius: 10px 0 0 0;
  border-top: 1px solid rgba(0, 0, 0, 0.067);
  border-left: 1px solid rgba(0, 0, 0, 0.067);
  overflow: hidden;
}
.el-menu--collapse .el-menu-item .el-tooltip,
.el-menu--collapse .el-submenu__title {
  /* padding: 0 7.5px!important; */
  padding: 0 15px !important;
}
.el-menu-item i,
.el-submenu__title i {
  color: #000 !important;
}
.el-menu-item,
.el-submenu__title {
  box-sizing: border-box;
  color: #000 !important;
  margin: 5px !important;
  padding: 0 calc(10px - 2.5px) !important;
  height: 40px !important;
  line-height: 40px !important;
  border-radius: 6px !important;
  min-width: 24px;
}
.el-submenu .el-menu-item {
  padding: 0 calc(35px - 2.5px) !important;
}
.el-menu-item.is-active {
  background: rgba(0, 0, 0, 0.052) !important;
}
.el-menu-item:focus,
.el-menu-item:hover,
.el-submenu__title:hover,
.el-submenu__title:focus,
.el-submenu__title:hover {
  background: rgba(0, 0, 0, 0.052) !important;
}
.expand-btn {
  margin-left: 5px !important;
  background: transparent !important;
  border: none !important;
  padding: 9px 10px !important;
  font-size: 12px;
  border-radius: 5px !important;
}
.expand-btn.collapse {
  padding: 9px 15px !important;
}
.expand-btn:hover {
  background: rgba(0, 0, 0, 0.052) !important;
}
.expand-btn i {
  font-size: 20px;
  color: #000;
}
a, a.router-link-active, a.router-link-exact-active{
  text-decoration: none;
}

</style>
