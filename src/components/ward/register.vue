<template>
	<div class="content" style="background: #eab476;">
		<mt-header title="登录" style="height: .5rem;">
			<div @click="back" slot="left">
				<mt-button icon="back"></mt-button>
			</div>
		</mt-header>
		<div style="width: 2rem;margin: 10% auto;">
			<img src="../../../build/xiaoxiong.jpg" />
		</div>
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" style="margin-top:10%;padding-right: 15%;" label-width="100px" class="demo-ruleForm">
			<el-form-item label="账号" prop="age">
				<el-input v-model.number="ruleForm2.age"></el-input>
			</el-form-item>
			
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm">登录</el-button>
			</el-form-item>
			
			<h2 style="margin-left:10% ;"><a href="/#/ward">没有账号？,前往注册</a></h2>
		</el-form>
	</div>
</template>
<script>
	import Vue from 'vue'
	import { Form } from 'element-ui'
	import { Header } from 'mint-ui'
	Vue.use(Form, Header)
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
					setTimeout(()=>{
						callback(new Error('密码错误'));
					},500)
        }
      };

      return {
        ruleForm2: {
          pass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
			back () {
				this.$router.push('/home')
			},
      submitForm() {
          if (this.ruleForm2.pass != '' && this.ruleForm2.age != '') {
            // console.log('提交')
						this.login()
          } else {
            // console.log('error submit!!');
            
          }
      },
			login () {
			fetch(`http://jx.xuzhixiang.top/ap/api/login.php?username=${this.ruleForm2.age}&password=${this.ruleForm2.pass}`)
				.then(res=>res.json())
				.then(data => {
					if(data.code==1){
						// console.log(data.data.id)
						sessionStorage.setItem('uid',data.data.id)
						location.href = '/#/user'
					} else{
						// console.log('密码错误')
					}
					
				})
			},
    }
  }
</script>

<style lang="scss">
	.mint-header{
		background: #FF6666;
	}
	.mint-header-title{
		font-size: .25rem;
	}
	.el-form-item{
		
	}
	.el-button{
		width: 2.06rem;
		font-size: .2rem;
		// border: 0;
		background: #FF6666!important;
	}
	.el-form-item__label{
		font-size: .2rem;
	}
</style>