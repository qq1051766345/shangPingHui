<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo.name">
            <span>请</span>
            <!-- 声明式路由导航：务必要有to属性-->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a href="">{{userInfo.name}}</a>
            ｜
            <a href="" @click="logout">退出登陆</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <router-link to="/center">我的尚品汇</router-link>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./imgaes/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="searchValue"
          />
          <!-- 进入搜索 -->
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import {reqLogout} from '@/api';
export default {
  name: "Header",
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    // 搜索按钮的回调函数：需要想search进行跳转
    toSearch() {
      // 字符串写法
      // this.$router.push("/search/" + this.searchValue + "?k=" + this.searchValue.toUpperCase())
      // 对象写法
      /*  this.$router.push({
        name:'search',
        query:{
          key:this.searchValue
        }
      }) */
      /* ************************************************ */
      // 面试题1:路由跳转传参数的时候，path是否可以结合params参数一起使用？
      // 对象的写法可以是name、path的形式，
      //但是需要注意的是path这种写法不能和params一起使用的

      // 面试题2:如何制定params参数可传可不传
      // 如果路由要传params参数，但是你就不传，就会发现url有问题
      // 如何制定params参数可传可不传? 在路由配置路由的时候，在占位的后面加一个问号
      /* this.$router.push({
        name:'search',
        query:{
          key:this.searchValue.toUpperCase(),
        }
      }) */

      // 面试题3:params参数可以传递也可以不传递，如果传递的是空串，如何解决？
      // 使用undefine解决：params参数可以传递、不传递（空的字符串）
      /*  this.$router.push({
        name:'search',
        params:{keyword:'' || undefined},
        query:{
          key:this.searchValue.toUpperCase(),
        }
      }) */

      // 面试题4:路由组件能不能传递props数据？
      // 可以，三种写法
      let location = {
        name: "search",
        params: { keyword: this.searchValue || undefined },
      };
      if (this.$route.query) {
        // 如果有query参数就把query参数也带过去
        location.query = this.$route.query;
        this.$router.push(location);
      }
      this.searchValue = "";
    },
    // 退出登陆
    logout(){
      reqLogout().then(res => {
        console.log(res);
      });
      localStorage.clear();
    }
  },
  computed: {
    userInfo(){
      return JSON.parse(localStorage.getItem('user')) || this.$store.state.users.userInfo;  
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>