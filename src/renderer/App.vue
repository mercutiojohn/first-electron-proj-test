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
    <el-container style="height: 100vh">
      <el-header style="text-align: right; font-size: 12px" height="50px">
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
        <el-aside width="200px" style="">
          <el-menu :default-openeds="['1', '3']" style="min-height:100%">
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-message"></i>导航一</template
              >
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-menu"></i>导航二</template
              >
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"
                ><i class="el-icon-setting"></i>导航三</template
              >
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
              </el-submenu>
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
    };
  },
};
</script>
<style>
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
  border-bottom: 1px solid #eee;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.el-menu::-webkit-scrollbar{
  width: 0;
}
</style>
