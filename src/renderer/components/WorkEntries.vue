<template>
  <div class="work-log">
    <h1 class="nav-title">快捷入口</h1>
    <h2 class="nav-title">每日任务</h2>
    <div class="action-cards">
      <el-card class="box-card">
        <div
          slot="header"
          :class="{
            clearfix: true,
            'card-header': true,
            'card-header-checked':
              dailyChecks.zentaoTaskStart && dailyChecks.zentaoTaskEnd,
            'card-header-unchecked':
              aroundOffWorkTime &&
              !(dailyChecks.zentaoTaskStart || dailyChecks.zentaoTaskEnd),
          }"
        >
          <span>禅道任务</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">
            操作按钮
          </el-button> -->
          <div class="checks" style="float: right; padding: 3px 0">
            <el-checkbox
              @change="updateDailyChecks"
              v-model="dailyChecks.zentaoTaskStart"
              :disabled="dailyChecks.zentaoTaskEnd"
            >
              已开始
            </el-checkbox>
            <el-checkbox
              @change="updateDailyChecks"
              v-model="dailyChecks.zentaoTaskEnd"
              :disabled="!dailyChecks.zentaoTaskStart"
            >
              已结束
            </el-checkbox>
          </div>
        </div>
        <div class="chooser">
          <span class="title">项目</span>
          <el-select v-model="zentaoTaskId" placeholder="请选择">
            <el-option
              v-for="item in zentaoTaskOptions"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="zentaoTaskId" placeholder="请输入ID"></el-input> -->
          <span class="title">ID: {{ zentaoTaskId }}</span>
        </div>
        <div class="actions">
          <el-button-group>
            <a
              :href="zentaoTaskUrlPrefix + zentaoTaskId + zentaoTaskUrlSuffix"
              target="_blank"
            >
              <el-button type="normal" icon="el-icon-right"
                >查看任务列表</el-button
              >
            </a>
            <a
              :href="
                zentaoTaskMyUrlPrefix + zentaoTaskId + zentaoTaskMyUrlSuffix
              "
              target="_blank"
            >
              <el-button type="normal" icon="el-icon-user"></el-button>
            </a>
          </el-button-group>
          <a
            :href="
              zentaoTaskCreateUrlPrefix +
              zentaoTaskId +
              zentaoTaskCreateUrlSuffix
            "
            target="_blank"
          >
            <el-button type="primary" icon="el-icon-right">创建任务</el-button>
          </a>
        </div>
      </el-card>
      <el-card class="box-card">
        <div
          slot="header"
          :class="{
            clearfix: true,
            'card-header': true,
            'card-header-checked': dailyChecks.zentaoBug,
            'card-header-unchecked':
              aroundOffWorkTime && !dailyChecks.zentaoBug,
          }"
        >
          <span>禅道Bug</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">
            操作按钮
          </el-button> -->
          <el-checkbox
            @change="updateDailyChecks"
            style="float: right; padding: 3px 0"
            v-model="dailyChecks.zentaoBug"
            >今日已完成</el-checkbox
          >
        </div>
        <div class="chooser">
          <span class="title">项目</span>
          <el-select v-model="zentaoQAId" placeholder="请选择">
            <el-option
              v-for="item in zentaoQAOptions"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="zentaoQAId" placeholder="请输入ID"></el-input> -->
          <span class="title">ID: {{ zentaoQAId }}</span>
        </div>
        <div class="actions">
          <el-button-group>
            <a
              :href="zentaoBugUrlPrefix + zentaoQAId + zentaoBugUrlSuffix"
              target="_blank"
            >
              <el-button type="normal" icon="el-icon-right"
                >查看Bug列表</el-button
              >
            </a>
            <a
              :href="
                zentaoBugMyOpenUrlPrefix + zentaoQAId + zentaoBugMyOpenUrlSuffix
              "
              target="_blank"
            >
              <el-button type="normal" icon="el-icon-upload2"></el-button>
            </a>
            <a
              :href="
                zentaoBugToMeUrlPrefix + zentaoQAId + zentaoBugToMeUrlSuffix
              "
              target="_blank"
            >
              <el-button type="normal" icon="el-icon-download"></el-button>
            </a>
          </el-button-group>

          <a
            :href="
              zentaoBugCreateUrlPrefix + zentaoQAId + zentaoBugCreateUrlSuffix
            "
            target="_blank"
          >
            <el-button type="primary" icon="el-icon-right">提Bug</el-button>
          </a>
        </div>
      </el-card>
      <el-card class="box-card">
        <div
          slot="header"
          :class="{
            clearfix: true,
            'card-header': true,
            'card-header-checked': dailyChecks.nerveWorkLog,
            'card-header-unchecked':
              aroundOffWorkTime && !dailyChecks.nerveWorkLog,
          }"
        >
          <span>日志填写</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">
            操作按钮
          </el-button> -->
          <el-checkbox
            @change="updateDailyChecks"
            style="float: right; padding: 3px 0"
            v-model="dailyChecks.nerveWorkLog"
            >今日已完成</el-checkbox
          >
        </div>
        <div class="chooser">
          <span class="title">日期</span>
          <el-date-picker
            v-model="workLogDate"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            :clearable="false"
          >
          </el-date-picker>
          <span class="title">{{ workLogDate }}</span>
        </div>
        <div class="actions">
          <a :href="workLogMainIdSetUrl" target="_blank">
            <el-button type="normal" icon="el-icon-right"
              >主项目编号设定</el-button
            >
          </a>
          <a :href="workLogUrlPrefix + workLogDate" target="_blank">
            <el-button type="primary" icon="el-icon-right">写日志</el-button>
          </a>
        </div>
      </el-card>
      <el-card class="box-card">
        <div
          slot="header"
          :class="{
            clearfix: true,
            'card-header': true,
            'card-header-checked': dailyChecks.nerveCheckin,
            'card-header-unchecked':
              aroundOffWorkTime && !dailyChecks.nerveCheckin,
          }"
        >
          <span>考勤填写</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">
            操作按钮
          </el-button> -->
          <el-checkbox
            @change="updateDailyChecks"
            style="float: right; padding: 3px 0"
            v-model="dailyChecks.nerveCheckin"
            >今日已完成</el-checkbox
          >
        </div>
        <div class="chooser multi-line">
          <div class="row">
            <span class="title">填写月份</span>
            <el-date-picker
              v-model="checkinDate"
              align="right"
              type="month"
              placeholder="选择月"
              :picker-options="pickerMonthOptions"
              :clearable="false"
            >
            </el-date-picker>
            <!-- <el-input v-model="zentaoQAId" placeholder="请输入ID"></el-input> -->
            <span class="title">{{ checkinYear }}-{{ checkinMonth }}</span>
          </div>
          <div class="row">
            <span class="title">查询月份</span>
            <el-date-picker
              v-model="checkinQueryDate"
              align="right"
              type="month"
              placeholder="选择月"
              :picker-options="pickerMonthOptions"
              :clearable="false"
            >
            </el-date-picker>
            <!-- <el-input v-model="zentaoQAId" placeholder="请输入ID"></el-input> -->
            <span class="title"
              >{{ checkinQueryYear }}-{{ checkinQueryMonth }}</span
            >
          </div>
        </div>
        <div class="actions">
          <a
            :href="
              checkinQueryUrlPrefix +
              checkinQueryYear +
              checkinQueryUrlMiddle +
              checkinQueryMonth
            "
            target="_blank"
          >
            <el-button type="normal" icon="el-icon-right">查考勤</el-button>
          </a>
          <a
            :href="
              checkinUrlPrefix + checkinYear + checkinUrlMiddle + checkinMonth
            "
            target="_blank"
          >
            <el-button type="primary" icon="el-icon-right">填考勤</el-button>
          </a>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" :class="{ clearfix: true, 'card-header': true }">
          <span>日志查询</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">
            操作按钮
          </el-button> -->
        </div>
        <div class="chooser multi-line">
          <div class="row">
            <span class="title">开始日期</span>
            <el-date-picker
              v-model="workLogQueryStartDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              :clearable="false"
            >
            </el-date-picker>
            <span class="title">{{ workLogQueryStartDate }}</span>
          </div>
          <div class="row">
            <span class="title">结束日期</span>
            <el-date-picker
              v-model="workLogQueryEndDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              :clearable="false"
            >
            </el-date-picker>
            <span class="title">{{ workLogQueryEndDate }}</span>
          </div>
        </div>
        <div class="actions">
          <a
            :href="
              workLogQueryOntimeUrlPrefix +
              workLogQueryStartDate +
              workLogQueryOntimeUrlMiddle +
              workLogQueryEndDate
            "
            target="_blank"
          >
            <el-button type="normal" icon="el-icon-right">按时情况</el-button>
          </a>
          <a
            :href="
              workLogQueryUrlPrefix +
              workLogQueryStartDate +
              workLogQueryUrlMiddle +
              workLogQueryEndDate
            "
            target="_blank"
          >
            <el-button type="primary" icon="el-icon-right">日志查询</el-button>
          </a>
        </div>
      </el-card>
    </div>
    <h2 class="nav-title">常用查询</h2>
    <div class="action-cards">
      <el-card class="box-card">
        <div slot="header" :class="{ clearfix: true, 'card-header': true }">
          <span>工资查询</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">
            操作按钮
          </el-button> -->
        </div>
        <div class="chooser multi-line">
          <div class="row">
            <span class="title">开始月</span>
            <el-date-picker
              v-model="salaryStartDate"
              align="right"
              type="month"
              placeholder="选择月"
              :picker-options="pickerMonthOptions"
              value-format="yyyy-MM"
              :clearable="false"
            >
            </el-date-picker>
            <span class="title">{{ salaryStartDate }}</span>
          </div>
          <div class="row">
            <span class="title">结束月</span>
            <el-date-picker
              v-model="salaryEndDate"
              align="right"
              type="month"
              placeholder="选择月"
              :picker-options="pickerMonthOptions"
              value-format="yyyy-MM"
              :clearable="false"
            >
            </el-date-picker>
            <span class="title">{{ salaryEndDate }}</span>
          </div>
        </div>
        <div class="actions">
          <a
            :href="
              salaryUrlPrefix +
              salaryStartDate +
              salaryUrlMiddle +
              salaryEndDate
            "
            target="_blank"
          >
            <el-button type="primary" icon="el-icon-right">查工资</el-button>
          </a>
        </div>
      </el-card>
    </div>
    <h2 class="nav-title">常用申请</h2>
    <div class="action-cards">
      <el-card class="box-card">
        <div slot="header" :class="{ clearfix: true, 'card-header': true }">
          <span>请假</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">
            操作按钮
          </el-button> -->
        </div>
        <div class="chooser multi-line">
          <div class="row">
            
            <!-- <span class="title">开始月</span>
            <el-date-picker
              v-model="salaryStartDate"
              align="right"
              type="month"
              placeholder="选择月"
              :picker-options="pickerMonthOptions"
              value-format="yyyy-MM"
              :clearable="false"
            >
            </el-date-picker>
            <span class="title">{{ salaryStartDate }}</span> -->
          </div>
          <!-- <div class="row">
            <span class="title">结束月</span>
            <el-date-picker
              v-model="salaryEndDate"
              align="right"
              type="month"
              placeholder="选择月"
              :picker-options="pickerMonthOptions"
              value-format="yyyy-MM"
              :clearable="false"
            >
            </el-date-picker>
            <span class="title">{{ salaryEndDate }}</span>
          </div> -->
        </div>
        <div class="actions">
          <a
            href="
              http://192.168.2.21/cvicdns/qjgl/qjgl/xjgl.do
            "
            target="_blank"
          >
            <el-button type="normal" icon="el-icon-right">销假进度</el-button>
          </a>
          <a
            href="
              http://192.168.2.21/cvicdns/qjgl/qjgl/qjsp.do
            "
            target="_blank"
          >
            <el-button type="normal" icon="el-icon-right">请假进度</el-button>
          </a>
          <a
              href="
              http://192.168.2.21/cvicdns/qjgl/qjgl/grjqgl.do?operFlag=preadd
            "
              target="_blank"
            >
              <el-button type="primary" icon="el-icon-right">请假</el-button>
          </a>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // nerve
      // workLogQuery
      workLogQueryUrlPrefix:
        "http://192.168.2.21/cvicdns/cvicdns/rzgl/grgzjhrzcx.do?operFlag=query&pageFlag=rz&gzrqStartStr=",
      workLogQueryUrlMiddle: "&gzrqEndStr=",
      workLogQueryStartDate: "2022-07-18",
      workLogQueryEndDate: "2022-09-05",
      // workLogQueryOntime
      workLogQueryOntimeUrlPrefix:
        "http://192.168.2.21/cvicdns/cvicdns/rzgl/rztjqkcx.do?operFlag=query&pageFlag=rztj&gzrqStartStr=",
      workLogQueryOntimeUrlMiddle: "&gzrqEndStr=",
      // workLogMainIdSet
      workLogMainIdSetUrl:
        "http://192.168.2.21/cvicdns/js/dialogWrapper.jsp?url=/cvicdns/cvicdns/rzgl/zxmbhwh.do",
      workLogUrlPrefix:
        "http://192.168.2.21/cvicdns/rzgl/gzrz.do?operFlag=read&gzrq=",
      workLogDate: "2022-09-05",
      //CheckIn
      checkinDate: new Date(),
      checkinUrlPrefix:
        "http://192.168.2.21/cvicdns/cvicdns/kqtbQuery.do?operFlag=query&year=",
      checkinUrlMiddle: "&month=",
      checkinQueryDate: new Date(),
      checkinQueryUrlPrefix:
        "http://192.168.2.21/cvicdns/cvicdns/qqcscx.do?operFlag=detail2&year=",
      checkinQueryUrlMiddle: "&month=",
      // Salary
      salaryUrlPrefix:
        "http://192.168.2.21/cvicdns/sqgl/gzd.do?operFlag=query&pageFlag=false&ygdh=&gzdQO.qssj=",
      salaryUrlMiddle: "&gzdQO.zzsj=",
      salaryStartDate: "2022-01-01",
      salaryEndDate: "2022-09-14",
      // QA
      zentaoQAId: 19,
      zentaoQAOptions: [],
      zentaoBugUrlPrefix: "http://192.168.107.111:8080/zentao/bug-browse-",
      zentaoBugUrlSuffix: ".html",
      zentaoBugToMeUrlPrefix: "http://192.168.107.111:8080/zentao/bug-browse-",
      zentaoBugToMeUrlSuffix: "-0-assigntome.html",
      zentaoBugMyOpenUrlPrefix:
        "http://192.168.107.111:8080/zentao/bug-browse-",
      zentaoBugMyOpenUrlSuffix: "-0-openedbyme.html",
      zentaoBugCreateUrlPrefix:
        "http://192.168.107.111:8080/zentao/bug-create-",
      zentaoBugCreateUrlSuffix: "-0-moduleID=0.html",
      // Task
      zentaoTaskId: 19,
      zentaoTaskOptions: [],
      zentaoTaskUrlPrefix: "http://192.168.107.111:8080/zentao/project-task-",
      zentaoTaskUrlSuffix: ".html",
      zentaoTaskMyUrlPrefix: "http://192.168.107.111:8080/zentao/project-task-",
      zentaoTaskMyUrlSuffix: "-assignedtome.html",
      zentaoTaskCreateUrlPrefix:
        "http://192.168.107.111:8080/zentao/task-create-",
      zentaoTaskCreateUrlSuffix: "--0.html",
      // daily-checks
      dailyChecks: {
        zentaoTaskStart: false,
        zentaoTaskEnd: false,
        zentaoBug: false,
        nerveWorkLog: false,
        nerveCheckin: false,
        date: "",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
          {
            text: "上个月",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 31);
              picker.$emit("pick", date);
            },
          },
          {
            text: "上上个月",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 62);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      pickerMonthOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "上个月",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 31);
              picker.$emit("pick", date);
            },
          },
          {
            text: "上两个月",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 62);
              picker.$emit("pick", date);
            },
          },
          {
            text: "上三个月",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 93);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.initWorkLogDate();
    this.getZentaoProjData();
    this.initZentaoIds();
  },
  methods: {
    initWorkLogDate() {
      this.workLogDate = this.formatDate(new Date());
      let date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      this.workLogQueryStartDate = this.formatDate(date);
      let month = new Date();
      month.setTime(date.getTime() - 3600 * 1000 * 24 * 31);
      this.salaryStartDate = this.formatMonth(month);
      this.workLogQueryEndDate = this.formatDate(new Date());
      this.salaryEndDate = this.formatMonth(new Date());
      this.checkinDate = new Date();
      let checkinDateObj = new Date();
      checkinDateObj.setTime(date.getTime() - 3600 * 1000 * 24 * 31);
      this.checkinQueryDate = checkinDateObj;
    },
    initZentaoIds() {
      this.zentaoTaskId = this.remoteZentaoTaskId;
      this.zentaoQAId = this.remoteZentaoQAId;
      if (this.isToday(this.remoteDailyChecks.date)) {
        this.dailyChecks = this.remoteDailyChecks;
      }
    },
    getZentaoProjData() {
      this.$axios.get("data/zentao_proj.json").then((resp) => {
        this.zentaoTaskOptions = resp.data;
      });
      this.$axios.get("data/zentao_qa.json").then((resp) => {
        this.zentaoQAOptions = resp.data;
      });
    },
    formatDate(date) {
      let year = date.getFullYear();
      let month = this.fixDigits(date.getMonth() + 1);
      let day = this.fixDigits(date.getDate());
      return `${year}-${month}-${day}`;
    },
    formatMonth(date) {
      let year = date.getFullYear();
      let month = this.fixDigits(date.getMonth() + 1);
      return `${year}-${month}`;
    },
    fixDigits(digits) {
      if (digits < 10) {
        return "0" + digits;
      } else {
        return digits;
      }
    },
    updateZentaoQAId() {
      setTimeout(() => {
        this.$store.commit("setZentaoQAId", this.zentaoQAId);
      }, 5);
    },
    updateZentaoTaskId() {
      setTimeout(() => {
        this.$store.commit("setZentaoTaskId", this.zentaoTaskId);
      }, 5);
    },
    updateDailyChecks() {
      this.dailyChecks.date = new Date().getTime();
      setTimeout(() => {
        this.$store.commit("setDailyChecks", this.dailyChecks);
      }, 5);
    },
    isToday(dateMillis) {
      let checkdate = new Date(dateMillis);
      console.log(checkdate);
      let month = checkdate.getMonth();
      let day = checkdate.getDay();
      let now = new Date();
      let nowMonth = now.getMonth();
      let nowDay = now.getDay();
      console.log(nowMonth, month, nowDay, day);
      if (nowMonth > month) {
        return false;
      } else if (nowDay > day) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    zentaoQAId() {
      console.log(this.zentaoQAId);
      this.$store.commit("setZentaoQAId", this.zentaoQAId);
    },
    zentaoTaskId() {
      console.log(this.zentaoTaskId);
      this.$store.commit("setZentaoTaskId", this.zentaoTaskId);
    },
  },
  computed: {
    remoteZentaoQAId: function () {
      // console.log(this.$store.getters.getZentaoQAId);
      return this.$store.getters.getZentaoQAId;
    },
    remoteZentaoTaskId: function () {
      // console.log(this.$store.getters.getZentaoTaskId);
      return this.$store.getters.getZentaoTaskId;
    },
    remoteDailyChecks: function () {
      console.log(this.$store.getters.getDailyChecks);
      return this.$store.getters.getDailyChecks;
    },
    checkinMonth() {
      return this.fixDigits(this.checkinDate.getMonth() + 1);
    },
    checkinYear() {
      return this.fixDigits(this.checkinDate.getFullYear());
    },
    checkinQueryMonth() {
      return this.fixDigits(this.checkinQueryDate.getMonth() + 1);
    },
    checkinQueryYear() {
      return this.fixDigits(this.checkinQueryDate.getFullYear());
    },
    aroundOffWorkTime() {
      let nowHours = new Date().getHours();
      if (nowHours >= 17 && nowHours < 21) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.work-log {
  /* background: rgba(255, 255, 255, 0.534); */
  padding: 0 0 100px 0;
}
.nav-title {
  padding: 10px 45px;
}
.action-cards {
  padding: 0 40px;
  box-sizing: border-box;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
.actions {
  padding: 20px 0 0;
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}
.chooser {
  /* padding: 10px 0; */
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}
.chooser.multi-line {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}
.row {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}
.el-card {
  border-radius: 10px;
  /* box-shadow: 0px 1px 2px 0.2px #00000033 !important; */
  box-shadow: 0px 1px 3px 0.2px rgba(0, 0, 0, 0.041) !important;
  /* box-shadow: none!important; */
  /* border: none; */
}
.card-header {
  padding: 18px 20px;
  box-sizing: border-box;
  transition: background 0.5s ease;
}
.card-header-checked {
  background: #eeffef;
}
.card-header-unchecked {
  background: #ffeeee;
}
/deep/.el-card__header {
  padding: 0;
}
</style>