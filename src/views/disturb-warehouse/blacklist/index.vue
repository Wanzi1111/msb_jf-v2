<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="黑名单"
        :actions="[
          {
            type: 'button', // 按钮
            label: '回调状态',
            click: callBackList,
            attr: {
              type: 'primary',
              plain: true,
              size: 'mini',
              icon: '',
            },
          },
          {
            type: 'button', // 按钮
            label: '手动导入',
            click: addBlack,
            attr: {
              type: 'primary',
              plain: true,
              size: 'mini',
              icon: 'el-icon-plus',
            },
          },
        ]"
      />
      <el-tabs v-model="type">
        <el-tab-pane
          v-for="item in typeList"
          :key="item.key"
          :label="item.label"
          :name="item.value"
        >
          <span slot="label">
            {{ item.label }}
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="home-content">
      <basics-search
        ref="searchs"
        :loading="loadings._ums_api_ig_v1_blacklists"
        :searchs="searchs"
        @submitSearch="submitSearch"
        @changeSearch="changeSearch"
      />
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_ig_v1_blacklists"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      >
        <template slot="ctype" slot-scope="scope">
          <div>
            {{ ctypeList.find((val) => val.value == scope.row.ctype).label }}
          </div>
        </template>
        <template slot="category" slot-scope="scope">
          <div>
            {{ (scope.row.category2 || scope.row.category) | category }}
          </div>
        </template>
        <template slot="mobile" slot-scope="scope">
          <div>
            {{
              disturbMobileObj && scope.row.id === disturbMobileObj.id
                ? scope.row.mobile
                : scope.row.mobile.replace(
                  /([0-9]{3})([0-9]{5})([0-9]{3})/,
                  "$1*****$3"
                )
            }}
            <svg-icon
              style="cursor: pointer"
              :icon-class="disturbMobileIcone(scope.row.id)"
              @click="isDisturbMobile(scope.row)"
            />
          </div>
        </template>
        <template slot="origin" slot-scope="scope">
          <div>
            {{ scope.row.origin | origin }}
          </div>
        </template>
        <template slot="cname" slot-scope="scope">
          <div>{{ scope.row.cname }}</div>
          <div>电话: {{ scope.row.cmobile }}</div>
        </template>
      </basics-table>
    </div>
    <el-dialog title="" :visible.sync="enableVisible" width="650px">
      <span slot="title" style="font-size: 20px">
        <i style="color: rgb(255, 163, 45)" class="el-icon-warning" /> 确定解除
      </span>
      <span style="font-size: 16px; padding-left: 25px">
        解除后该数据移除勿扰名单
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="enableVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="enable">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="650px"
      :title="blackVisibleType === 'emit' ? '编辑数据' : '手动导入'"
      :visible.sync="addBlackVisible"
    >
      <basics-form
        ref="dialogRef"
        :key="addBlackVisible"
        :forms="forms"
        class="form-item"
        :actions="formActions(cancelForm)"
        @submitForm="openFormSubmit"
        @changeForm="changeNewForm"
      />
    </el-dialog>
  </div>
</template>

<script>
import { searchs } from "./search";
import BasicsTitle from "@/components/BasicsTitle";
import BasicsSearch from "@/components/BasicsSearch";
import BasicsTable from "@/components/BasicsTable";
import BasicsForm from "@/components/BasicsForm";
import { mapGetters } from "vuex";
import {
  getBlacklists,
  setBlacklists,
  deleteBlack,
  emitBlack
} from "@/api/do-not-disturb/list";
import { getBlacklistsOptions } from "@/api/global/baseData";
import columns, { actions } from "./columns";
import forms, { formActions } from "./form";
import moment from "moment";
const {
  typeList,
  ctypeList,
  categoryList,
  category2List,
  blacklistOriginList,
} = window.baseData;

const init_pagaination = {
  page: 1,
  limit: 20,
};

export default {
  name: "BlackList",
  components: { BasicsTitle, BasicsSearch, BasicsTable, BasicsForm },
  filters: {
    category(e) {
      let text = "";
      const { categoryList, category2List } = window.baseData;
      const filterLabel = categoryList.find((val) => +val.value === +e);
      if (filterLabel) {
        text = filterLabel?.label;
      } else {
        text = category2List.find((val) => +val.value === +e)?.label;
      }
      return text;
    },
    origin(e) {
      let text = "";
      const { blacklistOriginList } = window.baseData;
      const filterLabel = blacklistOriginList.find((val) => +val.value === +e);
      if (filterLabel) {
        text = filterLabel?.label;
      } else {
        text = '-'
      }
      return text;
    },
    timeFormat(e) {
      return e !== "0" && e ? moment(+e).format("YYYY-MM-DD HH:mm:ss") : "永久";
    },
  },
  data() {
    return {
      typeList,
      ctypeList,
      categoryList,
      category2List,
      blacklistOriginList,
      type: "0",
      forms,
      formActions,
      enableVisible: false,
      addBlackVisible: false,
      table: {
        stripe: false,
        border: false,
      },
      columns,
      searchs,
      total: 0,
      list: [],
      searchQuery: {},
      listQuery: { ...init_pagaination },
      actionFunction: actions({
        tableAction: this.tableAction,
      }),
      actionObj: null,
      disturbMobileObj: null,
      blacklistsOptionsData: {},
      blackVisibleType: "add",
      blackListForm: {}
    };
  },
  watch: {
    type(val, oldVal) {
      const { ctypeList } = this;
      if (val !== oldVal) {
        this.setData("searchs", val, "type", "ctype", ctypeList);
        this.$refs.searchs.reset()
        this.searchQuery = {};
      }
    },
  },
  computed: {
    ...mapGetters(["loadings"]),
    disturbMobileIcone() {
      return function(e) {
        if (e !== this.disturbMobileObj?.id) {
          return "eye-open";
        } else {
          return "eye";
        }
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getBlacklistsOptions();
      this.getList();
    });
  },
  methods: {
    // 获取黑名单的枚举数据
    getBlacklistsOptions() {
      const { ctypeList } = this;
      getBlacklistsOptions().then((res) => {
        const { code, payload } = res;
        if (code === 0) {
          this.blacklistsOptionsData = payload;
          this.setData("searchs", "0", "type", "ctype", ctypeList);
        }
      });
    },
    // 搜索映射处理数据函数
    setData(refName, index, typeOne, typeTwo, data) { // ref名字 当前下标 当前下标的映射数据 要赋值的参数
      const { blackListForm, category2List, blacklistsOptionsData } = this; // 当前业务下标
      let type = ''
      if (refName === 'dialogRef') { // 新增黑名单的业务线类型从表单的选项取
        type = blackListForm.type
      } else { // 搜索的业务线类型从tab取
        type = this.type
      }
      const actionData = blacklistsOptionsData?.[typeOne][typeTwo];
      let newdata = [];
      const newIndex = type + "," + index;
      if (typeTwo === "category" || typeTwo === "blacklistOrigin") {
        // 勿扰类型 或者黑名单的数据来源
        for (const key in actionData) {
          if (Array.isArray(actionData[newIndex])) {
            newdata = data?.filter((val) =>
              actionData[newIndex]?.includes(val.key)
            );
          } else {
            // 外呼黑名单-业务黑名单-勿扰分类的子集分类区分
            newdata = category2List;
          }
        }
      } else {
        newdata = data?.filter((val) => actionData[index].includes(val.key));
      }
      const name = typeTwo === "blacklistOrigin" ? "origin" : typeTwo; // 参数名称
      this.$refs?.[refName]?.set({
        type: "options",
        data: {
          [name]: newdata,
        },
      });
    },
    // 数据联动清空选项
    setdefaultVal(refName, name) {
      this.$refs?.[refName]?.set({
        type: "defaultVal",
        data: {
          [name]: "",
        },
      });
    },
    // 数据联动清空数据
    setOptions(refName, name) {
      this.$refs?.[refName]?.set({
        type: "options",
        data: {
          [name]: [],
        },
      });
    },
    // 手机号脱敏函数
    isDisturbMobile(e) {
      if (e?.id === this.disturbMobileObj?.id) {
        this.disturbMobileObj = null;
      } else {
        this.disturbMobileObj = e;
      }
    },
    // 表单弹窗关闭事件
    cancelForm() {
      this.addBlackVisible = !this.addBlackVisible;
    },
    // 新增黑名单
    addBlack() {
      this.blackVisibleType = "add";
      this.addBlackVisible = true;
      this.setOptions("dialogRef", "ctype");
      this.setOptions("dialogRef", "category");
    },
    // 跳进回调状态列表
    callBackList() {
      this.$router.push({ name: "Callbacklist" });
    },
    // 新增黑名单二次确认
    openFormSubmit(values) {
      this.$confirm(
        '<span style="color:red">数据将进行过滤，请谨慎操作</span>',
        "是否确认提交？",
        {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.onFormSubmit(values);
      });
    },
    // 黑名单表单提交
    onFormSubmit(values) {
      const newData = { ...values };
      newData.startTime =
        values.daterange?.[0] && values.takeEffectType === "1"
          ? moment(values.daterange[0]).format("YYYY-MM-DD")
          : "0";
      newData.endTime =
        values.daterange?.[1] && values.takeEffectType === "1"
          ? moment(values.daterange[1]).format("YYYY-MM-DD")
          : "0";
      newData.mobile = values.mobile.replace(/\n/g, ",");
      newData.origin = "3";
      // 注释： 外呼黑名单-业务黑名单-勿扰分类category2（美术宝1对1/美术宝小班课）要传父级category美术宝直播（30）
      const newIndex = values.type + "," + values.ctype; //外呼黑名单-业务黑名单的勿扰映射关系的拼接下标
      const categoryObj = this.blacklistsOptionsData.ctype.category[newIndex] // 勿扰分类的子集映射对象
      if (!Array.isArray(categoryObj) && categoryObj.getCategory2) { // 确定当前业务线的勿扰类型是否存在子集
        const category2Obj = this.blacklistsOptionsData.category.category2 // 勿扰分类父级和子集的映射关系
        for (const key in category2Obj) {
          if (category2Obj[key].includes(newData.category)) { // 当前勿扰分类是否存在于父级的映射关系中
            newData.category2 = newData.category
            newData.category = key
          }
        }
      }
      if (this.blackVisibleType === 'add') {
        setBlacklists(newData).then((res) => {
          if (res?.code === 0) {
            this.$message({
              type: "success",
              message: "新增成功",
            });
          }
        });
      } else {
        newData.id = this.actionObj.id
        emitBlack(newData).then((res) => {
          if (res?.code === 0) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        });
      }
      this.$nextTick(() => {
        this.initParamsAndGetList();
        this.addBlackVisible = false;
      })
    },
    async changeNewForm(value, oldval) {
      const { ctypeList, categoryList, blacklistOriginList } = this;
      this.blackListForm = value
      if (value.type && value.type !== oldval.type) {
        // 业务类型和业务子分类的联动
        await this.setData("dialogRef", value.type, "type", "ctype", ctypeList);
      }
      if (oldval.type && value.type !== oldval.type) {
        await this.setdefaultVal("dialogRef", "ctype");
        await this.setdefaultVal("dialogRef", "category");
      }
      if (value.ctype && value.ctype !== oldval.ctype) {
        // 业务类型和分类的联动
        await this.setData(
          "dialogRef",
          value.ctype,
          "ctype",
          "category",
          categoryList
        );
        await this.setData(
          "dialogRef",
          value.ctype,
          "ctype",
          "blacklistOrigin",
          blacklistOriginList
        );
      }
      if (oldval.ctype && value.ctype !== oldval.ctype) {
        await this.setdefaultVal("dialogRef", "category");
      }
      // 是否显示时间选择器
      if (value.takeEffectType === "1") {
        this.$refs.dialogRef.set({
          type: "noShow",
          data: { daterange: false },
        });
      } else if (value.takeEffectType === "0") {
        this.$refs.dialogRef.set({
          type: "noShow",
          data: { daterange: true },
        });
      }
    },
    // 列表的action按钮时间
    tableAction(dat, row, index, type) {
      this.actionObj = row;
      switch (type) {
        case "relieve": // 解除黑名单
          this.enableVisible = true;
          break;
        case "emit": // 编辑黑名单
          this.blackVisibleType = type;
          this.editBlack(row);
          break;
      }
    },
    // 修改黑名单
    editBlack(row) {
      this.addBlackVisible = true;
      this.$nextTick(() => {
        this.$refs.dialogRef?.recoveryForm({
          ...row,
          type: String(row.type),
          ctype: String(row.ctype),
          category: row.category2 ? String(row.category2) : String(row.category),
          takeEffectType: row.endTimeFormat === '0' ? "0" : "1",
          daterange: row.endTimeFormat === '0' ? [new Date(), new Date()] : [row.startTime, row.endTime]
        });
        // 是否显示时间选择器
        this.$refs.dialogRef.set({
          type: "noShow",
          data: {
            daterange: !!(row.startTime === 0 || row.endTime === 0),
          },
        });
      });
    },
    //解除黑名单
    enable() {
      const { actionObj } = this;
      deleteBlack({ id: actionObj.id }).then((res) => {
        if (res?.code === 0) {
          this.enableVisible = false;
          this.$message({
            type: "success",
            message: "解除成功",
          });
        }
        this.$nextTick(() => {
          this.initParamsAndGetList();
        });
      });
    },
    // 列表搜索
    submitSearch(value) {
      const newSearchQuery = { ...this.searchQuery, ...value };
      delete newSearchQuery.userInfoInputSelect;
      delete newSearchQuery.userInfoInputSelectProp;
      newSearchQuery.startTime = value.daterange?.[0]
        ? moment(value.daterange[0]).format("YYYY-MM-DD")
        : "";
      newSearchQuery.endTime = value.daterange?.[1]
        ? moment(value.daterange[1]).format("YYYY-MM-DD")
        : "";
      newSearchQuery.cname = "";
      newSearchQuery.cmobile = "";
      newSearchQuery[value.userInfoInputSelectProp] = value.userInfoInputSelect;
      this.searchQuery = newSearchQuery;

      this.getList();
    },
    async changeSearch(val, oldVal) {
      // 分类数据为空提示请先选择业务类型
      const categoryOption = this.$refs.searchs.searchs.find(val => val.prop === "category")?.options
      const originOption = this.$refs.searchs.searchs.find(val => val.prop === "origin")?.options
      if (categoryOption.length === 0 || originOption.length === 0) {
        this.$nextTick(() => {
        this.$refs?.searchs?.set({
          type: "attr",
          data: {
            category: { focus: () => {
              this.$message({
                type: 'warning',
                message: '请先选择业务类型'
              })
            } },
            origin: { focus: () => {
              this.$message({
                type: 'warning',
                message: '请先选择业务类型'
              })
            } },
          },
        });
        })
      }
      const { categoryList, blacklistOriginList } = this;
      if (val.ctype && val.ctype !== oldVal.ctype) {
        // 业务类型和分类的联动
        await this.setData(
          "searchs",
          val.ctype,
          "ctype",
          "category",
          categoryList
        );
        await this.setData(
          "searchs",
          val.ctype,
          "ctype",
          "blacklistOrigin",
          blacklistOriginList
        );
        this.$nextTick(() => {
          this.$refs?.searchs?.set({
            type: "attr",
            data: {
              category: { focus: () => {} },
              origin: { focus: () => {} }
            },
          })
        })
      }
      if (!val.ctype && val.ctype !== oldVal.ctype) {
        this.setdefaultVal("searchs", "category");
        this.setdefaultVal("searchs", "origin");
        this.setOptions("searchs", "category");
        this.setOptions("searchs", "origin");
      }
    },
    // 列表初始化
    initParamsAndGetList() {
      this.listQuery = {
        ...init_pagaination,
      };
      this.$nextTick(() => {
        this.getList();
      });
    },
    getList() {
      const { searchQuery, listQuery, type } = this;
      const newSearchQuery = {
        ...searchQuery,
        type,
        page: listQuery.page,
        pageSize: listQuery.limit,
      };
      // 每次获取列表数据重置查看手机号
      this.disturbMobileObj = null;
      getBlacklists(newSearchQuery).then((res) => {
        if (res?.code === 0) {
          const {
            payload: { list, totalCount, totalPage },
          } = res;
          this.list = list;
          this.total = totalCount;
          if (totalPage > 1 && list.length === 0) {
            this.listQuery = {
              ...init_pagaination,
              page: totalPage - 1,
            };
            this.$nextTick(() => {
              this.getList();
            });
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.home-top {
  border-radius: 10px;
}
</style>
