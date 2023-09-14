<template>
  <div class="app-container">
    <div class="home-top">
      <basics-title
        title="回调状态"
        :actions="[{
          type: 'button', // 按钮
          label: '新增',
          click: addCallBack,
          attr: {
            type: 'primary',
            plain: true,
            size: 'mini',
            icon: ''
          }
        }]"
      />
    </div>
    <div class="home-content">
      <basics-search
        ref="searchs"
        :searchs="searchs"
        :loading="loadings._ums_api_ig_v1_suppliercodes"
        @submitSearch="submitSearch"
        @changeSearch="changeSearch"
      />
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_api_ig_v1_suppliercodes"
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      >
        <template slot="type" slot-scope="scope">
          <div>
            {{ scope.row.type | typeText }}
          </div>
        </template>
        <template slot="ctype" slot-scope="scope">
          <div>
            {{ scope.row.ctype | ctypeText }}
          </div>
        </template>
        <template slot="origin" slot-scope="scope">
          <div>
            {{ scope.row.origin | originText }}
          </div>
        </template>
        <template slot="supplier" slot-scope="scope">
          <div>
            {{ scope.row.supplier | supplierText }}
          </div>
        </template>
      </basics-table>
    </div>
    <el-dialog
      width="650px"
      :title="callBackVisibleType === 'emit' ? '修改回调' : '新增回调'"
      :visible.sync="callBackVisible"
    >
      <basics-form
        ref="dialogRef"
        :key="callBackVisible"
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

import { searchs } from './search'
import BasicsTitle from '@/components/BasicsTitle'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsForm from '@/components/BasicsForm'
import BasicsTable from '@/components/BasicsTable'
import columns, { actions } from './columns'
import forms, { formActions } from './form'
import { mapGetters } from "vuex";
import { getBlacklistsOptions } from "@/api/global/baseData";
import {
  getSuppliercodes,
  setSuppliercodes,
  emitSuppliercodes,
  deleteSuppliercodes
} from "@/api/do-not-disturb/list";
const {
  typeList,
  ctypeList,
  categoryList,
  blacklistOriginList,
} = window.baseData;
const init_pagaination = {
  page: 1,
  limit: 20
}
export default {
  name: 'Callbacklist',
  components: { BasicsTitle, BasicsSearch, BasicsForm, BasicsTable },
  filters: {
    typeText(e) {
      const { typeList } = window.baseData;
      const filterLabel = typeList?.find((val) => +val.value === +e);
      if (filterLabel) {
        return filterLabel?.label;
      } else {
        return e
      }
    },
    ctypeText(e) {
      const { ctypeList } = window.baseData;
      const filterLabel = ctypeList?.find((val) => +val.value === +e);
      if (filterLabel) {
        return filterLabel?.label;
      } else {
        return e
      }
    },
    originText(e) {
      const { blacklistOriginList } = window.baseData;
      const filterLabel = blacklistOriginList?.find((val) => +val.value === +e);
      if (filterLabel) {
        return filterLabel?.label;
      } else {
        return e
      }
    },
    supplierText(e) {
      const { categoryList } = window.baseData;
      const filterLabel = categoryList?.find((val) => +val.value === +e);
      if (filterLabel) {
        return filterLabel?.label;
      } else {
        return e
      }
    }
  },
  data() {
    return {
      typeList,
      ctypeList,
      categoryList,
      blacklistOriginList,
      listQuery: { ...init_pagaination },
      searchs,
      columns,
      actionFunction: actions({
        tableAction: this.tableAction
      }),
      forms,
      formActions,
      callBackVisible: false,
      table: {
        stripe: false,
        border: false
      },
      total: 0,
      list: [],
      callBackVisibleType: 'add'

    }
  },
  computed: {
    ...mapGetters(["loadings"]),
  },
  mounted() {
    this.$nextTick(() => {
      this.getBlacklistsOptions();
      this.getList();
    });
  },
  methods: {
    // 获取回调的枚举数据
    getBlacklistsOptions() {
      getBlacklistsOptions().then((res) => {
        const { code, payload } = res;
        if (code === 0) {
          this.blacklistsOptionsData = payload;
        }
      });
    },
    // 搜索映射处理数据函数
    setData(refName, index, typeOne, typeTwo, data) { // ref名字 当前下标 当前下标的映射数据 要赋值的参数 需要过滤的数据
      const { blacklistsOptionsData } = this; // 当前业务下标
      const actionData = blacklistsOptionsData?.[typeOne][typeTwo];
      let newdata = [];
      newdata = data?.filter((val) => actionData[index]?.includes(val.key));
      let name = "" // 参数名称
      if (typeTwo === 'notifyOrigin') {
        name = "origin"
      } else if (typeTwo === 'supplierCategory') {
        name = "supplier"
      } else {
        name = typeTwo
      }
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
      const { searchQuery, listQuery } = this;
      const newSearchQuery = {
        ...searchQuery,
        page: listQuery.page,
        pageSize: listQuery.limit,
      };
      // 每次获取列表数据重置查看手机号
      this.disturbMobileObj = null;
      getSuppliercodes(newSearchQuery).then((res) => {
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
    // 列表搜索
    submitSearch(value) {
      const newSearchQuery = { ...this.searchQuery, ...value };
      this.searchQuery = newSearchQuery;
      this.getList();
    },
    async changeSearch(val, oldVal) {
      const ctypeOption = this.$refs.searchs.searchs.find(val => val.prop === "ctype")?.options
      if (ctypeOption.length === 0) {
        this.$nextTick(() => {
        this.$refs?.searchs?.set({
          type: "attr",
          data: {
            ctype: { focus: () => {
              this.$message({
                type: 'warning',
                message: '请先选择业务类型'
              })
            } },
          },
        });
        })
      }
      const { ctypeList, categoryList } = this;
      if (val.type && val.type !== oldVal.type) {
        await this.setData("searchs", val.type, "type", "ctype", ctypeList);
        await this.setData("searchs", val.type, "type", "supplierCategory", categoryList);
        this.setdefaultVal("searchs", "ctype");
        this.setdefaultVal("searchs", "supplier");
        this.$nextTick(() => {
          this.$refs?.searchs?.set({
            type: "attr",
            data: {
              ctype: { focus: () => {} },
            },
          })
        })
      }
    },
    // 列表的action按钮时间
    tableAction(dat, row, index, type) {
      this.actionObj = row;
      switch (type) {
        case "delete": // 删除回调
          this.deleteCallBack(row)
          break;
        case "emit": // 编辑回调
          this.callBackVisibleType = type;
          this.editCallBack(row);
          break;
      }
    },
    // 编辑回调
    editCallBack(row) {
      this.callBackVisible = true;
      this.$nextTick(() => {
        this.$refs.dialogRef?.recoveryForm({
          ...row,
          type: String(row.type),
          ctype: String(row.ctype),
          origin: String(row.origin),
          supplier: String(row.supplier),
        });
      });
    },
    // 删除回调
    deleteCallBack(row) {
      this.$confirm(
        '<span style="color:red">数据删除后将停止过滤，请谨慎操作</span>',
        "是否确认删除？",
        {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        deleteSuppliercodes({ id: row.id }).then((res) => {
          if (res?.code === 0) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }
          this.$nextTick(() => {
            this.initParamsAndGetList();
          });
        })
      });
    },
    // 二次确认
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
    // 新增回调状态
    onFormSubmit(values) {
      const newData = { ...values };
      if (this.callBackVisibleType === 'add') {
        setSuppliercodes(newData).then((res) => {
          if (res?.code === 0) {
            this.$message({
              type: "success",
              message: "新增成功",
            });
          }
        });
      } else {
        newData.id = this.actionObj.id
        emitSuppliercodes(newData).then((res) => {
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
        this.callBackVisible = false;
      })
    },
    async changeNewForm(value, oldval) {
      const { ctypeList, blacklistOriginList, categoryList } = this;
      if (value.type && value.type !== oldval.type) { // 业务类型和业务子分类的联动
        await this.setData("dialogRef", value.type, "type", "ctype", ctypeList);
      }
      if (oldval.type && value.type !== oldval.type) { // 业务类型——业务子类型、数据来源、供应商的清除
        await this.setdefaultVal("dialogRef", "ctype");
        await this.setdefaultVal("dialogRef", "origin");
        await this.setdefaultVal("dialogRef", "supplier");
      }
      if (value.ctype && value.ctype !== oldval.ctype) { // 业务类型和数据来源的联动
        await this.setData("dialogRef", value.type, "type", "notifyOrigin", blacklistOriginList);
      }
      if (oldval.ctype && value.ctype !== oldval.ctype) { // 业务子类型——数据来源、供应商的清除
        await this.setdefaultVal("dialogRef", "origin");
        await this.setdefaultVal("dialogRef", "supplier");
      }
      if (value.origin && value.origin !== oldval.origin) { // 业务类型和供应商的联动
        await this.setData("dialogRef", value.type, "type", "supplierCategory", categoryList);
      }
      if (oldval.origin && value.origin !== oldval.origin) { // 数据来源——供应商的清除
        await this.setdefaultVal("dialogRef", "supplier");
      }
    },
    addCallBack() {
      this.callBackVisibleType = 'add'
      this.callBackVisible = true
      this.setOptions("dialogRef", "ctype");
      this.setOptions("dialogRef", "origin");
      this.setOptions("dialogRef", "supplier");
    },
    cancelForm() {
      this.callBackVisible = !this.callBackVisible
    },
  }
}
</script>
<style style='scss' scoped>
</style>
