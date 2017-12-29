<template>
  <div class="acceptDealInfo">
    <div id="modal-overlay">
      <div class="alert">
        <ul>
          <li>确认提交后，该协议将由交易管理员进行审核。</li>
          <li>审核通过后，将发生至协议相关方</li>
          <li>如未通过审核，该协议将退回至“我的协议”——“协议草稿”</li>
        </ul>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="confirmEdit">进入编辑</button>
      </div>
    </div>

    <div id="modal-overlay2">
      <div class="alert">
        <p>是否终止协议？</p>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="confirmStopDeal">确认退出</button>
      </div>
    </div>

    <div id="modal-overlay3">
      <div class="alert">
        <p>已向协议关联方发送终止通知</p>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="closeStopDealAlert">确认退出</button>
      </div>
    </div>
    <div id="modal-overlay8">
      <div class="alert">
        <p>是否同意终止协议？</p>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="confirmAgreeDealStop">同意</button>
      </div>
    </div>
    <!--终止/编辑提示-->
    <div id="modal-overlay4">
      <div class="alert">
        <h4>搜索员工</h4>
        <button class="close" v-on:click="closeAlert"></button>
        <ul>
          <li :class="addSecondPartyMember.searchResults.stage ? 'searchMember' : 'beforeSearchMember'">
            <h4>员工手机号</h4>
            <div class="search">
              <input v-model="addSecondPartyMember.searchText" type="text" placeholder="请输入员工手机号">
              <button @click="searchMember">
                <p>搜索</p>
              </button>
            </div>
          </li>
          <li v-if="addSecondPartyMember.searchResults.stage">
            <h4>搜索结果</h4>
            <div class="selectMember">
              <p v-cloak>{{this.addSecondPartyMember.searchResults.member}}</p>
            </div>
          </li>
        </ul>
        <button v-if="addSecondPartyMember.searchResults.stage" class="confirm" v-on:click="selectMember">确认</button>
      </div>
    </div>
    <!--乙方添加成员弹框-->
    <div id="modal-overlay5">
      <div class="alert">
        <h4>支付提示</h4>
        <button class="close" v-on:click="closeAlert(4)"></button>
        <ul>
          <li v-if="payAccount.alipay" v-cloak>对方支付宝账号：{{payAccount.alipay}}</li>
          <li v-if="payAccount.wechat" v-cloak>对方微信账号：{{payAccount.wechat}}</li>
        </ul>
        <button class="confirm" v-on:click="confirmPayOper">去支付</button>
      </div>
    </div>

    <div id="modal-overlay6">
      <div class="alert">
        <h4>支付提示</h4>
        <button class="close" v-on:click="closeAlert(4)"></button>
        <dl>
          <dt v-cloak>是否支付成功？</dt>
          <!-- <dd>
            <input v-model="payPsw.password[0]" type="password" maxlength="1" autofocus>
            <input v-model="payPsw.password[1]" type="password" maxlength="1" autofocus>
            <input v-model="payPsw.password[2]" type="password" maxlength="1" autofocus>
            <input v-model="payPsw.password[3]" type="password" maxlength="1" autofocus>
            <input v-model="payPsw.password[4]" type="password" maxlength="1" autofocus>
            <input v-model="payPsw.password[5]" type="password" maxlength="1" autofocus>
          </dd> -->
        </dl>
        <button v-on:click="payNotSuccess">未成功支付</button>
        <button class="confirm" v-on:click="paySuccess">成功支付</button> 
      </div>
    </div>

    <div id="modal-overlay7">
      <div class="alert">
        <h4>支付提示</h4>
        <button class="close" v-on:click="closeAlert(4)"></button>
        <ul v-if="payPsw.end">
          <li>支付成功！</li>
          <li v-cloak>当前账号可用金额为{{123}}元。</li>
          <li>如需帮助，请联系管理员。</li>
        </ul>
        <ul v-if="!payPsw.end">
          <li>支付失败</li>
          <li>当前账号可用余额不足</li>
          <li>请先充值，再进行该操作</li>
        </ul>
        <button class="confirm" v-on:click="payEnd">完成</button>
      </div>
    </div>
    <!--弹窗支付-->
    <div class="sendDealInfoTitle">
      <div class="titleLeft">
        <h2 v-cloak>{{this.data.dealInfo.dealName}}</h2>
        <p v-cloak>发布时间：{{this.data.dealInfo.publishTime}}</p>
      </div>
      <ul class="titleRight">
        <li @click="agreeDealStopBtn(index)" v-if="reveal.dealState[1]&&data.dealInfo.ifConfirmStop" class="cancel">
          终止
        </li>
        <li @click="stopDeal" v-if="reveal.dealState[1]" class="cancel">
          终止
          <!--<router-link :to="{path:'/yhzx/deal/sendDealIndex/editSendDeal',query:{id:this.$route.query.id}}"></router-link>-->
        </li>
        <!--<li  @click="editPrompt" v-if="reveal.dealState[this.$route.query.id][0]" class="edit">
          编辑
          &lt;!&ndash;<router-link :to="{path:'/yhzx/deal/sendDealIndex/editSendDeal',query:{id:this.$route.query.id}}"></router-link>&ndash;&gt;
        </li>-->
        <li class="dealState" v-cloak>{{this.data.dealInfo.dealState}}</li>
      </ul>
    </div>
    <!--以上是协议的骨干信息-->
    <!--协议内容开始-->
    <div class="dealContent">
      <div class="dealContentTitle">
        <h3>协议内容</h3>
        <button v-bind:class="{unfold:!reveal.dealContentUnfold.state}" @click="dealContentUnfold" v-cloak>{{reveal.dealContentUnfold.text}}</button>
      </div>
      <transition name="unfold-fade">
        <ul v-if="reveal.dealContentUnfold.state" class="dealContentContainer clear">
          <li class="clear">
            <h4>
              甲方
              <span></span>
            </h4>
            <p>{{this.data.dealInfo.firstPartyName}}</p>
          </li>
          <li class="clear">
            <h4>
              乙方
              <span></span>
            </h4>
            <p>{{this.data.dealInfo.secondPartyName}}</p>
          </li>
          <li class="clear">
            <h4>协议内容</h4>
            <p>{{this.data.dealInfo.partyContent}}</p>
          </li>
          <!--阶段任务开始-->
          <li class="stageTask clear">
            <h4>阶段内容</h4>
            <ul class="clear" v-for="(item,index) in data.dealInfo.dealstageinfos">
              <li class="clear">
                <p>
                  <span v-cloak>{{index+1}}.</span>
                  <span v-cloak>{{item.taskName}}</span>
                </p>
              </li>
              <li class="clear">
                <p>
                  <span v-cloak>{{item.reqCompDateStart}}</span>
                  <i>——</i>
                  <span v-cloak>{{item.reqCompDateEnd}}</span>
                  
                </p>
              </li>       
              <li class="clear">
                <p>
                  <span v-cloak>{{item.taskDetail}}</span>
                  
                </p>
              </li>       
              <li class="clear">
                <p>
                  <span v-cloak>{{item.price}}</span>
                  
                </p>
              </li>       
              
              <li  v-if="!(data.dealInfo.dealState=='签订中'||data.dealInfo.dealState=='审核中')&&data.dealInfo.myRole=='甲方'" class="stageTaskButton">
                <p v-if="!(data.dealInfo.dealState=='履行中'&&(data.dealInfo.dealstageinfos[index].taskType!='2'))">阶段内容已完成</p>
                <button v-if="data.dealInfo.dealState=='履行中'&&data.dealInfo.dealstageinfos[index].taskType!='2'" @click="stagePayment(index,item)" v-cloak>{{stageTask.text[index]}}</button>
              </li>

              <li  v-if="!(data.dealInfo.dealState=='签订中'||data.dealInfo.dealState=='审核中')&&data.dealInfo.myRole=='乙方'" class="stageTaskButton">
                <p v-if="!(data.dealInfo.dealState=='履行中'&&(data.dealInfo.dealstageinfos[index].taskType!='4'))">阶段内容已完成</p>
                <button v-if="data.dealInfo.dealState=='履行中'&&data.dealInfo.dealstageinfos[index].taskType!='4'" @click="stagePayment(index,item)" v-cloak>{{stageTask.text[index]}}</button>
              </li>
              <!--以上是阶段任务状态按钮-->
            </ul>
          </li>
          <!--阶段任务结束-->
          <li class="clear">
            <h4>付款总额</h4>
            <p>{{this.data.dealInfo.cost}}</p>
          </li>
          <li class="clear">
            <h4>付款方式</h4>
            <p>{{this.data.dealInfo.modeOfPayment}}</p>
          </li>
          <li class="clear">
            <h4>备注信息</h4>
            <p>{{this.data.dealInfo.remarksInfo}}</p>
          </li>
          <li class="fileDownload clear" v-if="data.dealInfo.dealfileinfos.length">
            <h4>协议附件</h4>
            <p v-for="(item,index) in data.dealInfo.dealfileinfos">
              <a v-bind:href="item.fileAddress">{{item.fileName}}</a>
            </p>
          </li>
        </ul>
      </transition>
    </div>
    <!--协议内容结束-->

    <!--协议关联的需求开始-->
    <div class="relatedNeeds" v-if="this.data.dealInfo.demandbasicinfo">
      <div class="dealContentTitle">
        <h3>关联需求</h3>
      </div>
      <ul class="relatedNeedsList">
       <li > <!-- v-for="item in this.dealInfo[this.$route.query.id].relatedNeeds" -->
          <router-link target="_blank" :to="'/trading/detail?id='+data.dealInfo.demandbasicinfo.pkid" v-cloak>{{this.data.dealInfo.demandbasicinfo.demandName}}</router-link>
        </li>
      </ul>
    </div>
    <!--协议关联的需求结束-->

    <!--协议评价甲方开始-->
    <div class="firstParty" v-if="!((this.data.dealInfo.dealState=='签订中')||(this.data.dealInfo.dealState=='审核中')||(this.data.dealInfo.dealState=='履行中'))">
      <div class="dealContentTitle">
        <h3>协议甲方</h3>
      </div>
      <dl class="firstPartyList clear">
        <dt class="clear">
          <p>{{this.data.dealInfo.firstPartyName}}</p>
          <p class="comment" @click="editFirstPartyComment" v-if="!reveal.firstPartyComment.edit&&this.data.dealInfo.myRole!='甲方'&&this.data.dealInfo.dealState!='履行中'">编辑评论</p>
        </dt>

        <dd class="clear" v-if="!reveal.firstPartyComment.edit">
          <ul class="clear" v-if="this.data.dealInfo.dealevainfoFirst.star!=0">
            <li v-for="(item,index) in [1,2,3,4,5]" :class="{selected:reveal.firstPartyComment.starSelected[index]}"></li>
          </ul>
          <p v-if="data.dealInfo.dealevainfoFirst.comment!=''" v-cloak>{{data.dealInfo.dealevainfoFirst.comment}}</p>
        </dd>
        <!--甲方对应的评价-->
        <dd class="clear" v-if="reveal.firstPartyComment.edit">
          <ul class="clear">
            <li v-for="(item,index) in [1,2,3,4,5]" @mouseenter="commentFirstParty(index)" :class="{selected:reveal.firstPartyComment.starSelected[index]}"></li>
          </ul>
          <textarea v-model="localFirstPartyComment.text"  cols="63" rows="5" placeholder="你的评论"></textarea>
          <div class="clear">
            <button @click="keepFirstPartyComment">保存</button>
            <button @click="cancelFirstPartyComment">取消</button>
          </div>
        </dd>
        <!--甲方对应的评价的编辑-->
      </dl>
    </div>
    <!--协议评价甲方结束-->

    <!--协议评价乙方开始-->
    <div class="secondParty" v-if="!((this.data.dealInfo.dealState=='签订中')||(this.data.dealInfo.dealState=='审核中')||(this.data.dealInfo.dealState=='履行中'))">
      <div class="dealContentTitle">
        <h3>协议乙方</h3>
      </div>
      <div class="secondPartyList clear">

        <dl class="secondPartyTitle  clear">
          <dt class="clear">
            <p v-cloak>{{this.data.dealInfo.secondPartyName}}</p>
            <p class="editComment" v-if="this.data.dealInfo.myRole!='乙方'&&!reveal.secondPartyComment.edit&&this.data.dealInfo.dealState!='履行中'" @click="editSecondPartyComment">编辑评论</p>
          </dt>

          <dd class="clear" v-if="!reveal.secondPartyComment.edit&&this.data.dealInfo.dealState!='履行中'">
            <ul class="clear" v-if="this.data.dealInfo.dealevainfoSecond.star!=0">
              <li v-for="(item,index) in [1,2,3,4,5]" :class="{selected:reveal.secondPartyComment.teamComment.starSelected[index]}"></li>
            </ul>
            <p v-if="this.data.dealInfo.dealevainfoSecond.comment!=''" v-cloak>{{this.data.dealInfo.dealevainfoSecond.comment}}</p>
          </dd>
          <!--对于团队的整体评价-->
          <dd class="clear" v-if="reveal.secondPartyComment.edit">
            <ul class="clear">
              <li v-for="(item,index) in [1,2,3,4,5]" @mouseenter="commentSecondPartyTeam(index)" :class="{selected:reveal.secondPartyComment.teamComment.starSelected[index]}"></li>
            </ul>

            <textarea v-model="localSecondPartyComment.teamComment.text"  cols="63" rows="5" placeholder="你的评论"></textarea>
          </dd>
          <!--对团队整体评价的编辑-->
        </dl>
        <!--编辑乙方成员开始-->

        <!-- <ul class="secondPartyMember clear" v-if="this.dealInfo[this.$route.query.id].mainInfo.dealState=='履行中'">
          <li class="clear" v-for="(item,index) in this.dealInfo[this.$route.query.id].content.secondParty.member">
            <dl class="clear">
              <dt class="clear">
                <i></i> -->
                <!--<div class="memberInfo">
                  <p v-for="$item in item">{{$item}}</p>
                </div>-->
                <!-- <div v-cloak class="avatar">
                  <img v-bind:src="item.avatar" alt="">
                </div>
                <div class="memberInfo clear">
                  <div v-cloak>{{item.name}}</div>

                  <dl class="clear" v-if="reveal.editMemberInfo[index]">
                    <dt>项目职责：</dt>
                    <dd v-cloak>
                      {{item.responsibilities}}
                    </dd>
                  </dl>

                  <dl v-if="!reveal.editMemberInfo[index]" class="editMemberResponse clear">
                    <dt class="clear">
                      <input v-model="item.responsibilities" type="text">
                    </dt>
                    <dd class="clear">
                      <button @click="keepEditMemberInfo(index)">保存</button>
                    </dd>
                  </dl>
                </div>
                <button @click="editMemberInfo(index)" v-if="dealInfo[$route.query.id].mainInfo.myRole=='乙方'&&reveal.editMemberInfo[index]">编辑</button>
              </dt>
            </dl>
          </li>
          <li v-if="this.dealInfo[this.$route.query.id].mainInfo.myRole=='乙方'&&this.dealInfo[this.$route.query.id].mainInfo.dealState=='履行中'" class="addMember">
            <i></i>
            <p @click="addMember">添加组织成员</p>
          </li>
          <div class="borderWhite" :style="{height:borderWhite.height}"></div>
        </ul> -->
        <!--编辑乙方成员结束-->

        <!--评论乙方成员开始-->
        <!-- <ul class="secondPartyMember clear" v-if="this.dealInfo[this.$route.query.id].mainInfo.dealState!='履行中'">
          <li class="clear" v-for="(item,index) in this.dealInfo[this.$route.query.id].content.secondParty.member">
            <dl class="clear">
              <dt class="clear">
                <i></i> -->
                <!--<div class="memberInfo">
                  <p v-for="$item in item">{{$item}}</p>
                </div>-->
                <!-- <div v-cloak class="avatar">
                  <img v-bind:src="item.avatar" alt="">
                </div>
                <div class="memberInfo clear">
                  <div v-cloak>{{item.name}}</div>
                  <dl class="clear">
                    <dt>项目职责：</dt>
                    <dd v-cloak>{{item.responsibilities}}</dd>
                  </dl>
                </div>
              </dt>

              <dd class="clear" v-if="!reveal.secondPartyComment.edit&&dealInfo[$route.query.id].mainInfo.dealState!='履行中'">
                <ul class="clear" v-if="dealInfo[$route.query.id].content.secondParty.member[index].comment.star.length">
                  <li v-for="(item,$index) in [1,2,3,4,5]" :class="{selected:reveal.secondPartyComment.memberComment.starSelected[index][$index]}"></li>
                </ul>
                <p v-if="dealInfo[$route.query.id].content.secondParty.member[index].comment.text.length" v-cloak>{{dealInfo[$route.query.id].content.secondParty.member[index].comment.text}}</p>
              </dd> -->
              <!--以上是乙方成员评价部分-->
              <!-- <dd class="clear" v-if="reveal.secondPartyComment.edit">
                <ul class="clear">
                  <li v-for="(item,$index) in [1,2,3,4,5]" @mouseenter="commentSecondPartyMember(index,$index)" :class="{selected:reveal.secondPartyComment.memberComment.starSelected[index][$index]}"></li>
                </ul>
                <textarea v-model="localSecondPartyComment.memberComment.text[index]"  cols="63" rows="5" placeholder="你的评论"></textarea>
              </dd> -->
              <!--以上是编辑乙方成员评价部分-->
            <!-- </dl>

          </li>
          <div class="borderWhite" :style="{height:borderWhite.height}"></div> -->
          <!--用来遮挡人员树多出来的部分-->
        <!-- </ul> -->
        <!--评论乙方成员结束-->
        <div class="keepOrCancel clear" v-if="reveal.secondPartyComment.edit">
          <button @click="keepSecondPartyMemberComment">保存</button>
          <button @click="cancelSecondPartyMemberComment">取消</button>
        </div>
        <!--是否保存乙方编辑评价-->
      </div>
    </div>
    <!--协议评价乙方结束-->
    <!-- 协议签订开始 -->
    <div class="signing" v-if="this.data.dealInfo.dealState=='签订中'&&this.reveal.signing">
      <div class="dealContentTitle">
        <h3>协议签订</h3>
      </div>
      <div class="signingCont">
        <label :class="{sigChecked:reveal.sigChecked}" @click="sigChecked">
          <span></span>
          <p>同意协议内容</p> 
        </label> 
        <button @click="confirmSigning">确认签订</button> 
      </div>
    </div>
    <!-- 协议签订结束 -->
    <!--协议关联方意见开始-->
    <div class="agreement" v-if="this.data.dealInfo.dealState!='协议完成'&&this.data.dealInfo.dealState!='评价完成'&&this.data.dealInfo.dealState!='审核中'">
      <div class="dealContentTitle">
        <h3>协议关联方意见</h3>
        <button v-cloak @click="agreementUnfold" :class="{unfold:reveal.agreementUnfold.state}">{{reveal.agreementUnfold.text}}</button>
      </div>
      <transition name="agreement-unfold-fade">
        <div class="agreementList" v-if="reveal.agreementUnfold.state">
          <p v-if="!reveal.agreementList" v-cloak >{{this.data.dealInfo.agreement}}</p>
          <textarea v-if="reveal.agreementList" v-model="data.dealInfo.agreement" name="" id="" cols="120" rows="5" placeholder="请输入需求详细描述文案..."></textarea>
          <div v-if="reveal.agreementList" class="clear">
            <button @click="giveAdvices">保存</button> 
            <button @click="cancelGiveAdvices">取消</button>
          </div>
        </div>
      </transition>
    </div>
    <!--协议关联方意见结束-->
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import ModalOpp from "../../../assets/js/modalOpp"
  import MyAjax from "../../../assets/js/MyAjax.js"
  export default {
    name:"acceptDealInfo",
    data(){
      return{
        addSecondPartyMember:{//乙方添加成员
          searchText:"",
          searchResults:{
            stage:false,
            member:"123"
          }
        },
        stageTask:{//阶段任务按钮的文本
          text:[]
        },
         payAccount:{
          alipay:"",
          wechat:"",
        },
        payPsw:{
          password:["","","","","",""],
          end:true
        },
        borderWhite:{//协议乙方成员树最后一个高度，用来遮挡最后一个成员列表高度减去45像素
          height:""
        },
        reveal:{
          dealState:[],//不同的协议状态对应不同的按钮
          index:"",//当前点击阶段任务的index
          dealContentUnfold:{//协议内容的收起或者展开
            state:true,
            text:"收起"
          },
          agreementList:"",
          signing:"",
          sigChecked:false,
          agreementUnfold:{//协议关联方的收起或者展开
            state:true,
            text:"收起"
          },
          editMemberInfo:[],//是否编辑成员的职责
          firstPartyComment:{
            edit:false,
            starSelected:[false,false,false,false,false],
          },
          secondPartyComment:{
            edit:false,
            teamComment:{
              starSelected:[false,false,false,false,false],
            },
            memberComment:{
              starSelected:[],
            }
          }
        },
        localFirstPartyComment:{
          star:"",
          text:""
        },
        localSecondPartyComment:{
          teamComment:{
            star:"",
            text:"",
          },
          memberComment:{
            star:[],
            text:[],
          }
        },
        data:{
          dealInfo:{}
        }
      }
    },
    computed:mapState({
      //dealInfo:state=>state.myDeal.dealInfo,
      /*获取数据*/
    }),
    created(){
      this.gitdealDetail(this.$route.query.id)
      this.getAnother(this.data.dealInfo.secondPartyID)
      if(!this.data.dealInfo.dealevainfoSecond.star){
        this.data.dealInfo.dealevainfoSecond.star=0
      }
      if(!this.data.dealInfo.dealevainfoSecond.comment){
        this.data.dealInfo.dealevainfoSecond.comment=""
      }
      if(!this.data.dealInfo.dealevainfoFirst.star){
        this.data.dealInfo.dealevainfoFirst.star=0
      }
      if(!this.data.dealInfo.dealevainfoFirst.comment){
        this.data.dealInfo.dealevainfoFirst.comment=""
      }
      //通过query传递的对象，通过this.$route.query获取
      //console.log(this.dealInfo[this.$route.query.id])
      //for(let i=0;i<this.data.dealInfo.length;i++){
         switch (this.data.dealInfo.dealState){
          case "签订中":
            this.reveal.dealState.push(true)
            this.reveal.dealState.push(true)
            this.reveal.dealState.push(false)
            break;
          case "履行中":
            this.reveal.dealState.push(true)
            this.reveal.dealState.push(true)
            this.reveal.dealState.push(false)
            break;
          case "协议完成":
            this.reveal.dealState.push(false)//协议完成时，可以编辑
            this.reveal.dealState.push(false)//协议完成时不能终止
            this.reveal.dealState.push(false)
            break;
          case "评价完成":
            this.reveal.dealState.push(false)
            this.reveal.dealState.push(false)
            this.reveal.dealState.push(false)
            break;
          case "审核中":
            this.reveal.dealState.push(false)
            this.reveal.dealState.push(false)
            this.reveal.dealState.push(false)
            break;
          case "终止申请中":
            this.reveal.dealState.push(false)
            this.reveal.dealState.push(false)
            this.reveal.dealState.push(true)
            break;
        }
      //}

      // let memberNum=this.dealInfo[this.$route.query.id].content.secondParty.member
      // for(let i=0;i<memberNum.length;i++){
      //   Vue.set(this.reveal.secondPartyComment.memberComment.starSelected,[i],[false,false,false,false,false])
      //   for(let j=0;j<parseInt(memberNum[i].comment.star);j++){
      //     Vue.set(this.reveal.secondPartyComment.memberComment.starSelected[i],[j],true)
      //   }
      // }
      /*以上是团队成员评价（初始的时候没有数据，不能再mounted中进行初始）*/

      // for(let i=0;i<memberNum.length;i++){//是否编辑成员职责信息初始化，不能再mounted中初始化，因为在editMemberInfo的初始值为空，mounted的时候元素已经计算好了，此时获取元素是隐藏元素的高度，应给在元素计算完成之前进行初始化
      //   Vue.set(this.reveal.editMemberInfo,[i],true)
      // }
    },
    mounted(){
      
      /*评论部分开始*/
      
      let firstPartyStar=parseInt(this.data.dealInfo.dealevainfoFirst.star);
      for(let i=0;i<firstPartyStar;i++){
        Vue.set(this.reveal.firstPartyComment.starSelected,[i],true)
      }
      /*以上是甲方评价星级*/
      let secondPartyStartTeam=parseInt(this.data.dealInfo.dealevainfoSecond.star)
      for(let i=0;i<secondPartyStartTeam;i++){
        Vue.set(this.reveal.secondPartyComment.teamComment.starSelected,[i],true)
      }
      /*以上是乙方团队整体评价星级*/

      /*评论部分结束*/


      if($('.secondPartyMember').children("li:last").prop("className")=="addMember"){
        Vue.set(this.borderWhite,"height",parseInt($('.secondPartyMember').children("li:last").css("height"))-27+"px")

      }else {
        Vue.set(this.borderWhite,"height",parseInt($('.secondPartyMember').children("li:last").css("height"))-45+"px")
      }
      /*设置遮挡div的高度*/
    },
    methods:{
      gitdealDetail(pkid){
        var that = this;
	    	var url = MyAjax.urlsy +"/dealbasicinfo/dealDetail/"+pkid;
	    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					if(data.code==0){
            Vue.set(that.data,"dealInfo",data.msg)
            console.log(data.msg)
            var dealstageinfos=that.data.dealInfo.dealstageinfos
            var myRole=that.data.dealInfo.myRole
            for(let i=0;i<dealstageinfos.length;i++){
              if(myRole=="甲方"){
                switch (dealstageinfos[i].taskType){
                  case null:
                    Vue.set(that.stageTask.text,[i],"收到成果");
                    break;
                  case 1:
                    Vue.set(that.stageTask.text,[i],"支付");
                    break;
                  case 2:
                    Vue.set(that.stageTask.text,[i],"");
                    break;
                }
              }
              if(myRole=="乙方"){
                switch (dealstageinfos[i].taskType){
                  case null:
                    Vue.set(that.stageTask.text,[i],"成果已发送");
                    break;
                  case 3:
                    Vue.set(that.stageTask.text,[i],"已收到付款");
                    break;
                  case 4:
                    Vue.set(that.stageTask.text,[i],"");
                    break;
                }
              }
            }

            if(!data.msg.agreement){
              Vue.set(that.reveal,"agreementList",true)
              Vue.set(that.reveal,"signing",true)
            }else{
              Vue.set(that.reveal,"agreementList",false)
              Vue.set(that.reveal,"signing",false)
            }
					}else{
            console.log("错误返回");
            //window.location.hash="/error/404"
					}
				},function(err){
					console.log(err)
				})
      },
      setComment(){
          var that = this;
          var url = MyAjax.urlsy+"/dealbasicinfo/comment";
          MyAjax.ajax({
						type: "POST",
						url:url,
						data: JSON.stringify(that.data.dealInfo),
            dataType: "json",
            contentType:"application/json;charset=utf-8",
						async:false,
					}, function(data){
						if(data.code==0){
              console.log("成功")
              
						}else if(data.code==-1){
							console.log("失败")
						}
					},function(err){
            console.log("error")
          })
      },
      setStopDeal(pkid){
        var that = this;
	    	var url = MyAjax.urlsy +"/dealbasicinfo/stop/"+pkid;
	    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					if(data.code==0){
            that.gitdealDetail(that.$route.query.id);
            that.reveal.dealState[0]=false;
            that.reveal.dealState[1]=false;
            var modal3= new ModalOpp("#modal-overlay3");
            modal3.makeText();
            console.log("终止提醒发送成功")
					}else{
            console.log("错误返回");
            //window.location.hash="/error/404"
					}
				},function(err){
					console.log(err)
				})
      },
      agreeDealStop(pkid){
        console.log("456")
        var that = this;
	    	var url = MyAjax.urlsy +"/dealbasicinfo/agreeDealStop/"+pkid;
	    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					if(data.code==0){
            that.reveal.dealState[2]=false;
            that.reveal.dealState[1]=false;
            that.reveal.dealState[0]=false;
            console.log("终止确定成功")
					}else{
            console.log("错误返回");
            //window.location.hash="/error/404"
					}
				},function(err){
					console.log(err)
				})
      },
      setPay(pkid){
        var that = this;
	    	var url = MyAjax.urlsy +"/dealbasicinfo/pay/"+pkid;
	    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					if(data.code==0){
            that.gitdealDetail(that.$route.query.id)
            var modal6=new ModalOpp("#modal-overlay6");
            modal6.closeModal();
            console.log("支付成功")
					}else{
            console.log("错误返回");
            //window.location.hash="/error/404"
					}
				},function(err){
					console.log(err)
				})
      },
      getAnother(accountId){//通过accountID获取用户数据
          var that=this;
          var url = MyAjax.urlsy+"/dealbasicinfo/getAnother/"+accountId;
          MyAjax.ajax({
            type: "GET",
            url:url,
            dataType: "json",
            contentType:"application/json;charset=utf-8",
            async:false,
          },function(data){
            if(data.code==0){
              if(data.msg.wechat){
                Vue.set(that.payAccount,"wechat",data.msg.wechat)
              }
              if(data.msg.alipay){
                Vue.set(that.payAccount,"alipay",data.msg.alipay)
              }
              console.log(that.payAccount)
            }else{
              console.log("错误返回")	
            }
          },function(err){
            console.log(err)
          })
      },
      getResult(index,pkid){//收到成果的按钮事件
        var that=this;
          var url = MyAjax.urlsy+"/dealbasicinfo/getResult/"+pkid;
          MyAjax.ajax({
            type: "GET",
            url:url,
            dataType: "json",
            contentType:"application/json;charset=utf-8",
            async:false,
          },function(data){
            if(data.code==0){
              Vue.set(that.data.dealInfo.dealstageinfos[index],"taskType",1)
            }else{
              console.log("错误返回")	
            }
          },function(err){
            console.log(err)
          })
      },
      getResultSended(index,pkid){//成果已发送
        var that=this;
          var url = MyAjax.urlsy+"/dealbasicinfo/resultSended/"+pkid;
          MyAjax.ajax({
            type: "GET",
            url:url,
            dataType: "json",
            contentType:"application/json;charset=utf-8",
            async:false,
          },function(data){
            if(data.code==0){
              Vue.set(that.data.dealInfo.dealstageinfos[index],"taskType",3)
            }else{
              console.log("错误返回")	
            }
          },function(err){
            console.log(err)
          })
      },
      getMoneyReceived(index,pkid){//收到货款
        var that=this;
          var url = MyAjax.urlsy+"/dealbasicinfo/moneyReceived/"+pkid;
          MyAjax.ajax({
            type: "GET",
            url:url,
            dataType: "json",
            contentType:"application/json;charset=utf-8",
            async:false,
          },function(data){
            if(data.code==0){
              Vue.set(that.data.dealInfo.dealstageinfos[index],"taskType",4)
            }else{
              console.log("错误返回")	
            }
          },function(err){
            console.log(err)
          })
      },
      setConfirmSign(pkid){
        var that = this;
	    	var url = MyAjax.urlsy +"/dealbasicinfo/confirmSign/"+pkid;
	    	MyAjax.ajax({
					type: "GET",
					url:url,
					dataType: "json",
					async: false,
				},function(data){
					if(data.code==0){
            Vue.set(that.reveal,"agreementList",true)
            Vue.set(that.reveal,"signing",true)
            that.gitdealDetail(that.$route.query.id)
					}else{
            console.log("错误返回");
            //window.location.hash="/error/404"
					}
				},function(err){
					console.log(err)
				})
      },
      setGiveAdvices(){
        var that = this;
        var url = MyAjax.urlsy+"/dealbasicinfo/giveAdvices";
        MyAjax.ajax({
          type: "POST",
          url:url,
          data: JSON.stringify(that.data.dealInfo),
          dataType: "json",
          contentType:"application/json;charset=utf-8",
          async:false,
        }, function(data){
          if(data.code==0){
            that.gitdealDetail(that.$route.query.id)
            Vue.set(that.reveal,"agreementList",false)
            Vue.set(that.reveal,"signing",false)
          }else if(data.code==-1){
            console.log("失败")
          }
        },function(err){
          console.log("error")
        })
      },
      editPrompt(){//协议编辑的提示信息
        var modal= new ModalOpp("#modal-overlay");
        modal.makeText();
      },
      closeAlert(index){//弹框关闭按钮
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
        var modal3= new ModalOpp("#modal-overlay3");
        modal3.closeModal();
        var modal4= new ModalOpp("#modal-overlay4");
        modal4.closeModal();
        var modal5= new ModalOpp("#modal-overlay5");
        modal5.closeModal();
        var modal6= new ModalOpp("#modal-overlay6");
        modal6.closeModal();
        var modal7= new ModalOpp("#modal-overlay7");
        modal7.closeModal();
        var modal8= new ModalOpp("#modal-overlay8");
        modal8.closeModal();
        if(index=="4"){
          Vue.set(this.addSecondPartyMember.searchResults,"stage",false)//乙方添加成员返回没有搜索之前的状态
          Vue.set(this.addSecondPartyMember,"searchText","")
          Vue.set(this.addSecondPartyMember.searchResults,"classSelected",false)//乙方添加成员选中还原成初始状态
        }
      },
      confirmEdit(){
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();
        location.hash="/yhzx/deal/acceptDealIndex/editAcceptDeal?id="+this.$route.query.id
      },
      stopDeal(){//终止协议
        var modal= new ModalOpp("#modal-overlay2");
        modal.makeText();
      },
      confirmStopDeal(){//确认终止协议,向协议方发送通知
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
        this.setStopDeal(this.$route.query.id)
      },
      agreeDealStopBtn(index){
        var modal8= new ModalOpp("#modal-overlay8");
        modal8.makeText();
        Vue.set(this.reveal,"index",index)
      },
      confirmAgreeDealStop(){
        var modal8= new ModalOpp("#modal-overlay8");
        modal8.closeModal();
        this.agreeDealStop(this.$route.query.id)
      },
      closeStopDealAlert(){//关闭通知
        var modal3= new ModalOpp("#modal-overlay3");
        modal3.closeModal();
      },
      dealContentUnfold(){//协议内容的收起和展开
        Vue.set(this.reveal.dealContentUnfold,"state",!this.reveal.dealContentUnfold.state)
        if(!this.reveal.dealContentUnfold.state){
          Vue.set(this.reveal.dealContentUnfold,"text","展开")
        }else {
          Vue.set(this.reveal.dealContentUnfold,"text","收起")
        }
        //console.log(this.reveal.unfold.state)
      },
      sigChecked(){//协议签订的是否选中
        Vue.set(this.reveal,"sigChecked",!this.reveal.sigChecked)
      },
      confirmSigning(){
        if(this.reveal.sigChecked){
          this.setConfirmSign(this.$route.query.id)
        }
      },
      agreementUnfold(){//协议关联方的收起和展开
        Vue.set(this.reveal.agreementUnfold,"state",!this.reveal.agreementUnfold.state)
        if(!this.reveal.agreementUnfold.state){
          Vue.set(this.reveal.agreementUnfold,"text","展开")
        }else {
          Vue.set(this.reveal.agreementUnfold,"text","收起")
        }
      },
      giveAdvices(){
        this.setGiveAdvices()
      },
      cancelGiveAdvices(){
        this.data.dealInfo.agreement=""
      },
      stagePayment(index,item){//阶段支付的单击事件
        var dealstageinfos=this.data.dealInfo.dealstageinfos
        var myRole=this.data.dealInfo.myRole
        if(myRole=="甲方"){
          switch (dealstageinfos[index].taskType){
            case null:
              //Vue.set(this.stageTask.text,[index],"收到成果");
              Vue.set(dealstageinfos[index],"taskType",1)
              this.getResult(index,dealstageinfos[index].pkid)
              break;
            case 1:
              //Vue.set(this.stageTask.text,[index],"支付");
              //Vue.set(stageTask[index],"section","已支付")
              var modal5=new ModalOpp("#modal-overlay5");
              modal5.makeText();
              break;
          }
        }
        if(myRole=="乙方"){
          switch (dealstageinfos[index].taskType){
            case null:
              //Vue.set(this.stageTask.text,[index],"收到成果");
              Vue.set(dealstageinfos[index],"taskType",3)
              this.getResultSended(index,dealstageinfos[index].pkid)
              break;
            case 3:
              //Vue.set(this.stageTask.text,[index],"支付");
              //Vue.set(stageTask[index],"section","已支付")
              //var modal5=new ModalOpp("#modal-overlay5");
              //modal5.makeText();
              //this.price=dealstageinfos[index].price
              this.getMoneyReceived(index,dealstageinfos[index].pkid)
              break;
          }
        }
        /*支付状态的顺序改变*/
        if(myRole=="甲方"){
          switch (dealstageinfos[index].taskType){
            case null:
              Vue.set(this.stageTask.text,[index],"收到成果");
              break;
            case 1:
              Vue.set(this.stageTask.text,[index],"支付");
              break;
            case 2:
              Vue.set(this.stageTask.text,[index],"");
              break;
          }
        }
        if(myRole=="乙方"){
          switch (dealstageinfos[index].taskType){
            case null:
              Vue.set(this.stageTask.text,[index],"成果已发送");
              break;
            case 3:
              Vue.set(this.stageTask.text,[index],"已收到付款");
              break;
            case 4:
              Vue.set(this.stageTask.text,[index],"");
              break;
          }
        }
        /*在页面没有刷新的添加下改变相应文本*/
        this.reveal.index=index;
      },
      confirmPayOper(){//支付提示，是否进行后续的支付操作
        var modal5=new ModalOpp("#modal-overlay5");
        modal5.closeModal();
        
         var modal6=new ModalOpp("#modal-overlay6");
         modal6.makeText();
      },
      payNotSuccess(){//输入支付密码后确认支付
        var modal6=new ModalOpp("#modal-overlay6");
        modal6.closeModal();

        // var modal7=new ModalOpp("#modal-overlay7");
        // modal7.makeText();
        // //console.log(this.payPsw.password)
        // if(this.payPsw.password=="11111"){
        //   Vue.set(this.payPsw,"end",true)
        // }else {
        //   Vue.set(this.payPsw,"end",false)
        // }
      },
      paySuccess(){
        var that=this;
        this.setPay(that.data.dealInfo.dealstageinfos[that.reveal.index].pkid)
      },
      payEnd(){

      },
      /*甲方评价开始*/
      editFirstPartyComment(){//编辑甲方评价按钮单击事件
        Vue.set(this.reveal.firstPartyComment,"edit",true);

        Vue.set(this.localFirstPartyComment,"star",this.data.dealInfo.dealevainfoFirst.star)
        Vue.set(this.localFirstPartyComment,"text",this.data.dealInfo.dealevainfoFirst.comment)
        /*同步星级和评论文本用于编辑*/
      },
      commentFirstParty(index){//甲方评价
        for(let i=0;i<5;i++){
          Vue.set(this.reveal.firstPartyComment.starSelected,[i],false)
        }
        for(let i=0;i<index+1;i++){
          Vue.set(this.reveal.firstPartyComment.starSelected,[i],true)
        }
        Vue.set(this.localFirstPartyComment,"star",index+1+"");
      },
      keepFirstPartyComment(){//保存甲方评价修改后的数据
        Vue.set(this.data.dealInfo.dealevainfoFirst,"star",this.localFirstPartyComment.star)
        Vue.set(this.data.dealInfo.dealevainfoFirst,"comment",this.localFirstPartyComment.text)
        Vue.set(this.reveal.firstPartyComment,"edit",false)
        //console.log(this.data.dealInfo.dealevainfo)
        this.setComment();
      },
      cancelFirstPartyComment(){//取消保存保存甲方评价修改后的数据
        let star=this.data.dealInfo.dealevainfoFirst.star;
        for(let i=0;i<5;i++){
          Vue.set(this.reveal.firstPartyComment.starSelected,[i],false)
        }
        for(let i=0;i<star;i++){
          Vue.set(this.reveal.firstPartyComment.starSelected,[i],true)
        }
        Vue.set(this.reveal.firstPartyComment,"edit",false)
      },
      /*甲方评价结束*/
      searchMember(){//乙方添加成员
        Vue.set(this.addSecondPartyMember.searchResults,"stage",true)
      },
      addMember(){//乙方添加成员搜索
        var modal=new ModalOpp("#modal-overlay4");
        modal.makeText();
      },
      selectMember(){//乙方却人搜索的结果
        var modal4= new ModalOpp("#modal-overlay4");
        modal4.closeModal();
        Vue.set(this.addSecondPartyMember.searchResults,"stage",false)//返回没有搜索之前的状态
        Vue.set(this.addSecondPartyMember,"searchText","")
        this.dealInfo[this.$route.query.id].content.secondParty.member.push({
          name:"添加",
          avatar:require("../../../assets/img/deal/sendDeal/avatar.png"),
          responsibilities:"职责1；职责2；职责3",
          comment:{
            star:"",
            text:"",
          }
        })
      },
      editMemberInfo(index){//乙方编辑成员职责
        Vue.set(this.reveal.editMemberInfo,[index],false)
      },
      keepEditMemberInfo(index){//保存乙方编辑成员职责
        Vue.set(this.reveal.editMemberInfo,[index],true)
      },
      /*乙方评价开始*/
      editSecondPartyComment(){//乙方评价按钮单击事件
        Vue.set(this.reveal.secondPartyComment,"edit",true)//编辑和可视切换


        Vue.set(this.localSecondPartyComment.teamComment,"star",this.data.dealInfo.dealevainfoSecond.star)
        Vue.set(this.localSecondPartyComment.teamComment,"text",this.data.dealInfo.dealevainfoSecond.comment)
        /*Vue的数据同步到本地一份,用于数据的修改后的保存或者提交（团队整体评价）*/
        // let memberNum=this.dealInfo[this.$route.query.id].content.secondParty.member
        // for(let i=0;i<memberNum.length;i++){
        //   Vue.set(this.localSecondPartyComment.memberComment.star,[i],memberNum[i].comment.star)
        //   Vue.set(this.localSecondPartyComment.memberComment.text,[i],memberNum[i].comment.text)
        // }
        /*Vue的数据同步到本地一份,用于数据的修改后的保存或者提交（团队成员评价）*/


        // let $this=this
        // setTimeout(function () {//通过1ms延时，在单击编辑后，获取最后一个元素的高度，从新设置遮挡高度
        //   Vue.set($this.borderWhite,"height",parseInt($('.secondPartyMember').children("li:last").css("height"))-45+"px")
        // },1)

      },
      commentSecondPartyTeam(index){//鼠标滑过后，乙方总体评价不同的星级的选定
        for(let i=0;i<5;i++){
          Vue.set(this.reveal.secondPartyComment.teamComment.starSelected,[i],false)
        }
        for(let i=0;i<index+1;i++){
          Vue.set(this.reveal.secondPartyComment.teamComment.starSelected,[i],true)
        }
        Vue.set(this.localSecondPartyComment.teamComment,"star",index+1+"");
      },
      commentSecondPartyMember(index,$index){//鼠标滑过后，乙方成员的不同星级选定
        for(let i=0;i<5;i++){
          Vue.set(this.reveal.secondPartyComment.memberComment.starSelected[index],[i],false)
        }
        for(let i=0;i<$index+1;i++){
          Vue.set(this.reveal.secondPartyComment.memberComment.starSelected[index],[i],true)
        }
        Vue.set(this.localSecondPartyComment.memberComment.star,[index],$index+1+"");
        // console.log(this.reveal.secondPartyComment.memberComment.starSelected[index])
      },
      keepSecondPartyMemberComment(){//保存乙方评价
        Vue.set(this.data.dealInfo.dealevainfoSecond,"star",this.localSecondPartyComment.teamComment.star)
        Vue.set(this.data.dealInfo.dealevainfoSecond,"comment",this.localSecondPartyComment.teamComment.text)

        // let memberNum=this.dealInfo[this.$route.query.id].content.secondParty.member
        // for(let i=0;i<memberNum.length;i++){
        //   Vue.set(memberNum[i].comment,"star",this.localSecondPartyComment.memberComment.star[i])
        //   Vue.set(memberNum[i].comment,"text",this.localSecondPartyComment.memberComment.text[i])
        // }

        Vue.set(this.reveal.secondPartyComment,"edit",false)
        this.setComment();
        // let $this=this
        // setTimeout(function () {//通过1ms延时，在单击编辑后，获取最后一个元素的高度，从新设置遮挡高度
        //   Vue.set($this.borderWhite,"height",parseInt($('.secondPartyMember').children("li:last").css("height"))-45+"px")
        // },1)
      },
      cancelSecondPartyMemberComment(){//取消保存乙方评价

        Vue.set(this.localSecondPartyComment.teamComment,"star",this.data.dealInfo.dealevainfoSecond.star)
        Vue.set(this.localSecondPartyComment.teamComment,"text",this.data.dealInfo.dealevainfoSecond.comment)

        // let memberNum=this.dealInfo[this.$route.query.id].content.secondParty.member
        // for(let i=0;i<memberNum.length;i++){
        //   Vue.set(this.reveal.secondPartyComment.memberComment.starSelected,[i],[false,false,false,false,false])
        //   for(let j=0;j<parseInt(memberNum[i].comment.star);j++){
        //     Vue.set(this.reveal.secondPartyComment.memberComment.starSelected[i],[j],true)
        //   }
        // }
        // for(let i=0;i<memberNum.length;i++){
        //   Vue.set(this.localSecondPartyComment.memberComment.star,[i],memberNum[i].comment.star)
        //   Vue.set(this.localSecondPartyComment.memberComment.text,[i],memberNum[i].comment.text)
        // }
        /*保证数据没有更改*/
        let secondPartyStartTeam=parseInt(this.data.dealInfo.dealevainfoSecond.star)
        for(let i=0;i<5;i++){
          Vue.set(this.reveal.secondPartyComment.teamComment.starSelected,[i],false)
        }
        for(let i=0;i<secondPartyStartTeam;i++){
          Vue.set(this.reveal.secondPartyComment.teamComment.starSelected,[i],true)
        }
        Vue.set(this.reveal.secondPartyComment,"edit",false)

        // let $this=this
        // setTimeout(function () {//通过1ms延时，在单击编辑后，获取最后一个元素的高度，从新设置遮挡高度
        //   Vue.set($this.borderWhite,"height",parseInt($('.secondPartyMember').children("li:last").css("height"))-45+"px")
        // },1)

      }
    }
  }
</script>
<style scoped lang="scss">
  $borderColor:#ebebeb;
  $hColor:#353535;
  $textColor:#8c8c8c;
  $themeColor:#546686;
  $alertColor:#525252;
  .acceptDealInfo{
    #modal-overlay{
      .alert{
        width: 549px;
        height:326px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding-top:72px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 42px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
        }
      }
    }
    #modal-overlay2{
      .alert{
        width: 549px;
        height:326px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding-top:102px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 52px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
        }
      }
    }
    #modal-overlay3{
      .alert{
        width: 549px;
        height:326px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding-top:102px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 52px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
        }
      }
    }
    /*以上是弹框提示*/
    #modal-overlay4{
      .alert{
        width: 549px;
        height:380px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding:0 20px;
        //padding-top:20px;
        color: $alertColor;
        h4{
          line-height: 60px;
          text-align: left;
          color: $themeColor;
        }
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
          cursor: pointer;
        }
        ul{
          li{
            padding-left:38px;
            margin-bottom:30px;
            h4{
              width:90px;
              text-align: right;
              float: left;
              line-height: 40px;
              margin-right:20px;
              color: #484949;
            }
            .search{
              float: left;
              position: relative;
              width:323px;
              height: 40px;
              input{
                width:323px;
                height: 42px;
                line-height: 40px;
                border-radius: 5px;
                padding-left:20px;
                border:1px solid #ababab;
                background: rgb(248,248,248);
              }
              button{
                position: absolute;
                cursor: pointer;
                width: 101px;
                height:40px;
                top: 1px;
                right:0;
                border: 0;
                color: #ffffff;
                background: url("../../../assets/img/deal/sendDeal/searchbg.png") left center no-repeat;
                p{
                  line-height: 40px;
                  text-align: left;
                  padding-left:46px;
                  background: url("../../../assets/img/deal/sendDeal/search.png") 15px center no-repeat;
                }

              }
            }
            /*以上是搜索样式*/
            .selectMember{
              width:326px;
              float: left;
              background: rgb(248,248,248);
              p{
                cursor: pointer;
                text-align: left;
                padding:0 20px 0 13px;
                line-height: 40px;
                background: url("../../../assets/img/deal/sendDeal/selectMember.png") 291px center no-repeat;
              }
              .selected{
                background: url("../../../assets/img/deal/sendDeal/selectedMember.png") 291px center no-repeat;
              }
            }
            /*以上搜索结果样式*/
          }
          .beforeSearchMember{
            margin-top:110px;
          }
          .searchMember{
            margin-top:50px;
          }
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 20px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
    #modal-overlay5{
      .alert{
        width: 549px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding:0 20px;
        //padding-top:20px;
        color: $alertColor;
        h4{
          line-height: 60px;
          text-align: left;
          color: $themeColor;
        }
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
          cursor: pointer;
        }
        ul{
          li:first-child{
            margin-top: 30px;
          }
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 40px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
          margin-bottom:50px;
          cursor: pointer;
        }
      }
    }
    #modal-overlay6{
      .alert{
        width: 549px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding:0 20px;
        //padding-top:20px;
        color: $alertColor;
        h4{
          line-height: 60px;
          text-align: left;
          color: $themeColor;
        }
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
          cursor: pointer;
        }
        dl{
          float: left;
          margin-top:50px;
          dt{
            float: left;
            margin-right: 20px;
            width: 509px;
            text-align: center;
          }
          dd{
            float: left;
            input{
              float: left;
              width: 30px;
              height: 30px;
              margin-right: 12px;
              border: 1px solid #dadada;
            }
          }
        }
        button{
         width: 160px;
          height:42px; 
          border:0;
          background: #ffffff;
          border-radius: 5px;
          border: 1px solid $themeColor;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 60px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
          margin-bottom:50px;
          cursor: pointer;
          margin-left: 50px;
        }
      }
    }
    #modal-overlay7{
      .alert{
        width: 549px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding:0 20px;
        //padding-top:20px;
        color: $alertColor;
        h4{
          line-height: 60px;
          text-align: left;
          color: $themeColor;
        }
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
          cursor: pointer;
        }
        ul{
          font-size: 14px;
          color: #7c7c7c;
          margin-top:7px;
          li{
            line-height: 22px;
          }
          li:nth-child(1){
            font-size:18px;
            color: #565656;
            line-height: 50px;
            font-weight: 900;
          }
        }
        .confirm{
          width: 120px;
          height:42px;
          margin-top: 46px;
          background: url("../../../assets/img/deal/sendDeal/paySuccess.png") left center no-repeat;
          border:0px;
          color: #ffffff;
          margin-bottom:50px;
          cursor: pointer;
        }
      }
    }
    #modal-overlay8{
      .alert{
        width: 549px;
        height:326px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding-top:102px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 52px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
        }
      }
    }
    /*乙方添加成员*/
    .sendDealInfoTitle{
      height:90px;
      border-bottom: 1px solid $borderColor;
      .titleLeft{
        float: left;
        margin-top:14px;
        h2{
          line-height: 30px;
          font-size:18px;
          color: $themeColor;
        }
        p{
          margin-top:-2px;
          font-size: 14px;
          line-height: 22px;
          color: $textColor;
        }
      }
      .titleRight{
        float: right;
        li{
          float: right;
          margin-left:19px;
          cursor: pointer;
          padding-left: 24px;
          color: $hColor;
        }
        li:nth-last-child(2){
          margin-left:30px;
        }
        .edit{
          background: url("../../../assets/img/deal/sendDeal/edit-gray.png") left center no-repeat;
        }
        .cancel{
          background: url("../../../assets/img/deal/sendDeal/cancell-gray.png") left center no-repeat;
        }
        .edit:hover{
          background: url("../../../assets/img/deal/sendDeal/edit.png") left center no-repeat;
          color: $themeColor;

        }
        .cancel:hover{
          background: url("../../../assets/img/deal/sendDeal/cancell.png") left center no-repeat;
          color: $themeColor;
        }
        .dealState{
          color: #f56212;
        }
      }
    }

    /*协议个部分标题样式开始*/
    .dealContentTitle{
      height:60px;
      border-bottom:1px solid $borderColor;
      h3{
        float: left;
        color: $themeColor;
        line-height:42px;
        margin-top:16px;
        border-bottom:1px solid $themeColor;
        margin-bottom:-1px;
      }
      button{
        color: $themeColor;
        border:none;
        background: #ffffff;
        cursor: pointer;
        float: right;
        line-height:42px;
        margin-top:16px;
        padding-left:23px;
        background: url("../../../assets/img/deal/sendDeal/up.png") left center no-repeat;
      }
      .unfold{
        background: url("../../../assets/img/deal/sendDeal/down.png") left center no-repeat;
      }
    }
    /*协议个部分标题样式结束*/

    /*协议内容开始*/
    .dealContent{
      .dealContentContainer{
        margin-top:20px;
        li{
          padding:4px 0;
          h4{
            height: 22px;
            width:56px;
            float: left;
            color: $hColor;
            text-align:justify;
            span{
              display: inline-block;
              text-align: justify;
              padding-left:100%;
            }
          }
          p{
            width:830px;
            float: right;
            color: $textColor;
            min-height: 22px;
          }
        }
        .stageTask{
          ul{
            float: right;
            width:830px;
            border-bottom: 1px solid $borderColor;
            padding:7px 0;
            position: relative;
            li{
              padding:0px;
              p{
                min-height: 22px;
                span{
                  float: left;
                }
                // span:nth-child(1){
                //   display: none;
                // }
                i{
                  float: left;
                }
              }
            }
            // li:nth-child(1){
            //   p{
            //     span:nth-child(1){
            //       display: block;
            //     }
            //   }
            // }
            .stageTaskButton{
              width: 100px;
              position: absolute;
              top: 10px;
              right:0;
              p{
                width:100px;
                float: left;
                color: #f56212;
              }
              button{
                width: 100px;
                height: 36px;
                background: url("../../../assets/img/deal/sendDeal/stageTask.png") left center no-repeat;
                border: 0;
                color: #ffffff;
                cursor: pointer;
              }
            }
          }
          ul:nth-child(2){
            padding-top:0;
          }
        }
        /*阶段内容的编号*/
        .fileDownload{
          p{
            a{
              color: $themeColor;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
      /*协议内容展开收起动画开始*/
      .unfold-fade-enter-active {
        transition: all .3s ease;
      }
      .unfold-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }
      .unfold-fade-enter, .unfold-fade-leave-to
        /* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
        transform: translateX(10px);
        opacity: 0;
      }
      /*协议内容展开收起动画结束*/
    }
    /*协议内容结束*/

    /*关联协议开始*/
    .relatedNeeds{
      .dealContentTitle{
        height:67px;
        h3{
          margin-top:23px;
        }
      }
      .relatedNeedsList{
        li{
          margin-left:20px;
          a{
            display: block;
            min-height: 30px;
            color: $themeColor;
            text-decoration: underline;
            padding:4px 0;
          }
        }
        li:nth-child(1){
          padding-top:12px;
        }
      }
    }
    /*关联协议结束*/
    .signing{
      .signingCont{
        height: 86px;
        label{
          float: left;
          display: table-cell;
          vertical-align: center;
          margin-top: 35px;
          color: #808080;
          span{
            float: left;
            width: 13px;
            height: 13px;
            border-radius: 13px;
            background: #808080;
            margin: 5px 10px;
          }
          p{
            float: left;
            line-height: 23px;
          }
        }
        .sigChecked{
          color: #546686;
          span{
            background: #546686;
          }
        }
        button{
          width: 100px;
          height: 36px;
          border:0;
          margin-right:20px;
          cursor: pointer;
          float: right;
          margin-top: 30px;
          background: url("../../../assets/img/deal/sendDeal/submit.png") left center no-repeat;
          color: #ffffff;
        }
      }
      
    }
    /*协议关联方意见开始*/
    .agreement{
      .agreementList{
        margin-top:16px;
        p{
          word-wrap:break-word;
        }
        textarea{
          padding: 12px;
        }
        div{
          padding-top:30px;
          button{
            width: 100px;
            height: 36px;
            border:0;
            margin-right:20px;
            cursor: pointer;
          }
          button:nth-child(1){
            background: url("../../../assets/img/deal/sendDeal/submit.png") left center no-repeat;
            color: #ffffff;
          }
          button:nth-child(2){
            border:1px solid $themeColor;
            color: $themeColor;
            background: #ffffff;
          }
        }
      }
      /*协议关联方动画开始*/
      .agreement-unfold-fade-enter-active, .agreement-unfold-fade-leave-active {
        transition: opacity 0.6s
      }
      .agreement-unfold-fade-enter, .agreement-unfold-fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
        opacity: 0
      }
      /*协议关联方动画结束*/
    }
    /*协议关联方意见结束*/

    /*协议甲方开始*/
    .firstParty{
      .firstPartyList{
        dt{
          margin-left:20px;
          min-height: 22px;
          margin-top:16px;
          p{
            float: left;
          }
          .comment{
            float: right;
            padding-left: 24px;
            background: url("../../../assets/img/deal/sendDeal/edit.png") left center no-repeat;
            cursor: pointer;
          }
        }
        dd{
          margin-left:20px;
          ul{
            padding:16px 0 10px 0;
            li{
              width: 16px;
              height: 16px;
              float: left;
              margin-right:10px;
              background: url("../../../assets/img/deal/sendDeal/start.png") left center no-repeat;
              cursor: pointer;
            }
            .selected{
              background: url("../../../assets/img/deal/sendDeal/startSelected.png") -1px center no-repeat;
            }
          }
          p{
            word-wrap: break-word;
            word-break: break-all;
          }
          textarea{
            padding:0 10px;
          }
          div{
            padding-top:30px;
            button{
              width: 100px;
              height: 36px;
              border:0;
              margin-right:20px;
              cursor: pointer;
            }
            button:nth-child(1){
              background: url("../../../assets/img/deal/sendDeal/submit.png") left center no-repeat;
              color: #ffffff;
            }
            button:nth-child(2){
              border:1px solid $themeColor;
              color: $themeColor;
              background: #ffffff;
            }
          }
        }
      }
    }
    /*协议甲方结束*/
    /*协议乙方开始*/
    .secondParty{
      .secondPartyList{
        .secondPartyTitle{
          dt{
            p{
              margin-left:10px;
              min-height: 22px;
              margin-top:36px;
              float: left;
              color: #353535;
            }
            .editComment{
              float: right;
              padding-left: 24px;
              background: url("../../../assets/img/deal/sendDeal/edit.png") left center no-repeat;
              cursor: pointer;
            }
          }
          dd{//乙方团队对应的评价
            padding-left:10px;
            ul{
              padding:16px 0 10px 0;
              li{
                width: 16px;
                height: 16px;
                float: left;
                margin-right:10px;
                background: url("../../../assets/img/deal/sendDeal/start.png") left center no-repeat;
                cursor: pointer;
              }
              .selected{
                background: url("../../../assets/img/deal/sendDeal/startSelected.png") -1px center no-repeat;
              }
            }
            textarea{
              padding:0 10px;
              margin-bottom: -5px;
            }
          }
        }
        .secondPartyMember{
          color: #8c8c8c;
          margin-left:50px;
          border-left:2px solid $borderColor;
          position: relative;
          li{
            padding:15px 0;
            dl{
              dt{
                i{
                  float: left;
                  width:60px;
                  height:1px;
                  background: $borderColor;
                  margin-top:29px;
                }
                .avatar{
                  float: left;
                  width: 60px;
                  height:60px;
                  border-radius: 50%;
                }
                .memberInfo{
                  float: left;
                  margin-left: 16px;
                  div{
                    color: #353535;
                    line-height: 34px;
                  }
                  dl{
                    dt{
                      float: left;
                      line-height: 20px;
                    }
                    dd{
                      float: left;
                      line-height: 20px;
                      padding-left:0;
                    }
                  }
                  .editMemberResponse{
                    dt{
                      float: none;
                      input{
                        border:1px solid #ebebeb;
                        height: 32px;
                        line-height:32px;
                        width:400px;
                        padding-left:10px;
                      }
                    }
                    dd{
                      float: none;
                      margin-top:18px;
                      button{
                        width: 80px;
                        height:32px;
                        background: url("../../../assets/img/deal/sendDeal/keepAddMember.png") left center no-repeat;
                        padding:0;
                        float: none;
                        color: #ffffff;
                      }
                    }
                  }

                }
                button{
                  border:0;
                  float: right;
                  padding-left:24px;
                  color: #353535;
                  cursor: pointer;
                  background: url("../../../assets/img/deal/sendDeal/edit.png") left center no-repeat;
                }
              }

              dd{//乙方团队成员对应的评价
                padding-left:60px;
                ul{
                  padding:14px 0 10px 0;
                  li{
                    padding:0;
                    width: 16px;
                    height: 16px;
                    float: left;
                    margin-right:10px;
                    background: url("../../../assets/img/deal/sendDeal/start.png") left center no-repeat;
                    cursor: pointer;
                  }
                  .selected{
                    background: url("../../../assets/img/deal/sendDeal/startSelected.png") -1px center no-repeat;
                  }
                }
                textarea{
                  padding:0 10px;
                }
              }
            }
          }
          .addMember{
            i{
              float: left;
              width:60px;
              height:1px;
              background: $borderColor;
              margin-top:11px;
            }
            p{
              float: left;
              padding-left:35px;
              height:23px;
              line-height: 23px;
              cursor: pointer;
              background: url("../../../assets/img/deal/sendDeal/addMember.png") left center no-repeat;
            }
          }
          .borderWhite{
            width:2px;
            position: absolute;
            bottom: 0;
            left:-2px;
            background: #ffffff;
            z-index: 100;
          }
        }
      }
      .keepOrCancel{
        padding:5px 0 11px 0;
        margin-left:112px;
        button{
          width: 100px;
          height:36px;
          border:0px;
          cursor: pointer;
          float: left;
          margin-right:20px;
          //background: #ffffff;
        }
        button:nth-child(1){
          background: url("../../../assets/img/deal/sendDeal/submit.png") left center no-repeat;
          color: #ffffff;
        }
        button:nth-child(2){
          border:1px solid $themeColor;
          color: $themeColor;
          background: #ffffff;
        }
      }
    }
    /*协议乙方结束*/
  }
</style>
