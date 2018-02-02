<template>
  <div class="year-month">
    <div class="input-wrapper" @mouseenter="showCancel = true" @mouseleave="showCancel = false"  @click="togglePanel">
      <div class="input" v-text="value"></div> 
      <transition name="fade">
        <img class="cancel-btn" src="../../../assets/img/company/bottom.png"  v-show="showCancel">
      </transition>
    </div>
    <transition name="toggle">
      <div class="date-panel" v-show="panelState" :style="coordinates">
        <div class="panel-header" v-show="panelType !== 'year'">
          <div class="arrow-left" @click="prevYearPreview()">&lt;</div>
          <div class="year-month-box">
            <div class="year-box" @click="chType('year')" v-text="tmpYear"></div>
            <div class="month-box" @click="now" v-if="today">至今</div>
          </div>
          <div class="arrow-right" @click="nextYearPreview()">&gt;</div>
        </div>
        
         <div class="panel-header" v-show="panelType === 'year'"><!--调出年份列表 -->
          <div class="arrow-left" @click="chYearRange(0)">&lt;</div>
          <div class="year-range">
            <span v-text="yearList[0]"></span> - <span v-text="yearList[yearList.length - 1]"></span>
          </div>
          <div class="arrow-right" @click="chYearRange(1)">&gt;</div>
        </div>
        <div class="type-year" v-show="panelType === 'year'">
          <ul class="year-list">
            <li v-for="item in yearList" v-text="item" 
            :class="{selected: isSelected('year', item), invalid: validateYear(item)}" 
            @click="selectYear(item)">
            </li>
          </ul>
        </div>
        <div class="type-month" v-show="panelType === 'month'">
          <ul class="month-list">
            <li v-for="(item, index) in monthList"
                :class="{selected: isSelected('month', index), invalid: validateMonth(index)}"
                @click="selectMonth(index)"
            >
              {{item | month(language)}}
            </li>
          </ul>
        </div>
      </div> 
    </transition>
  </div>
</template>
<script>
export default {
  name:"yearMonth",
  data () {
      let now = new Date()
      return {
        showCancel: false,
        panelState: false,
        panelType: 'month',
        coordinates: {},
        year: now.getFullYear(),
        month: now.getMonth(),
        tmpYear: now.getFullYear(),
        tmpMonth: now.getMonth(),
        minYear: Number,
        minMonth: Number,
        maxYear: Number,
        maxMonth: Number,
        yearList: Array.from({length: 12}, (value, index) => new Date().getFullYear() + index),
        monthList: [1, 2, 3 ,4 ,5, 6, 7 ,8, 9, 10, 11, 12],
        rangeStart: false,//标志位
        inputValue:"",
      }
  },
  props: {
    language: {default: 'ch'},
    min: {default: '1970.02'},
    max: {default: new Date().getFullYear()+"."+(new Date().getMonth()+1)},
    value: {
      type: String,
      default: ""
    },
    range: {
      type: Boolean,
      default: false
    },
    today:{
      type: Boolean,
      default: false
    }
  },
  mounted(){
    
    this.$nextTick(() => {
        if(this.$el.parentNode.offsetWidth + this.$el.parentNode.offsetLeft - this.$el.offsetLeft <= 300){
          this.coordinates = {right: '0', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
        }else{
          this.coordinates = {left: '0', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
        }
        
        let minArr = this.min.split('.')
        this.minYear = Number(minArr[0])
        this.minMonth = Number(minArr[1])
        let maxArr = this.max.split('.')
        this.maxYear = Number(maxArr[0])
        this.maxMonth = Number(maxArr[1])
        if(this.range){
          if(Object.prototype.toString.call(this.value).slice(8, -1) !== 'Array'){
            throw new Error('Binding value must be an array in range mode.')
          }
        }
        if(!this.value){
          this.inputValue=this.value;
        }else{
          this.inputValue=this.value;
        }

        window.addEventListener('click', this.close)
      })
  },
  methods:{
      togglePanel () {
        this.panelState = !this.panelState
        this.rangeStart = false
      },
      prevYearPreview(){
        this.tmpYear = this.tmpYear === 0 ? 0 : this.tmpYear - 1
      },
      nextYearPreview(){
        this.tmpYear = this.tmpYear === 0 ? 0 : this.tmpYear + 1
      },
      now(){
        let value = "至今"
        this.$emit('input', value)
        this.panelState = false
        this.rangeStart = false
      },
      isSelected (type, item) {
        switch (type){
          case 'year':
            if(!this.range) return item === this.tmpYear
          case 'month':
            if(!this.range) return item === this.tmpMonth && this.year === this.tmpYear
        }
      },
      chType (type) {
        this.panelType = type
      },
      chYearRange (next) {
        if(next){
          this.yearList = this.yearList.map((i) => i + 12)
        }else{
          this.yearList = this.yearList.map((i) => i - 12)
        }
      },
      validateYear (year) {
        return (year > this.maxYear || year < this.minYear) ? true : false
      },
      validateMonth (month) {
        if(new Date(this.tmpYear, month).getTime() >= new Date(this.minYear, this.minMonth - 1).getTime()
          && new Date(this.tmpYear, month).getTime() <= new Date(this.maxYear, this.maxMonth - 1).getTime()){
          return false
        }
        return true
      },
      selectYear (year) {
        if(this.validateYear(year)) return
        this.tmpYear = year
        this.panelType = 'month'
      },
      selectMonth (month) {
        if(this.validateMonth(month)) return
          this.tmpMonth = month
          if(!this.range){
            this.year = this.tmpYear
            this.month = this.tmpMonth
            let value = `${this.tmpYear}.${('0' + (this.month + 1)).slice(-2)}`
            this.$emit('input', value)
            this.panelState = false
            //console.log(value)
          }
      },
      close (e) {
        if(!this.$el.contains(e.target)){
          this.panelState = false
          this.rangeStart = false
        }
      },
  },
  watch: {
    min (v) {
      let minArr = v.split('.')
      this.minYear = Number(minArr[0])
      this.minMonth = Number(minArr[1])
    },
    max (v) {
      let maxArr = v.split('.')
      this.maxYear = Number(maxArr[0])
      this.maxMonth = Number(maxArr[1])
    },
    range (newVal, oldVal) {
        if(newVal === oldVal) return
        if(newVal && Object.prototype.toString.call(this.value).slice(8, -1) === 'String'){
          this.$emit('input', ['', ''])
        }
        if(!newVal && Object.prototype.toString.call(this.value).slice(8, -1) === 'Array'){
          this.$emit('input', '')
        }
      }
  },
  filters: {
      month: (item, lang) => {
        switch (lang) {
          case 'en':
            return {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
              7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'}[item]
          case 'ch':
            return {1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六',
              7: '七', 8: '八', 9: '九', 10: '十', 11: '十一', 12: '十二'}[item]
          case 'uk':
            return {1: 'Січень', 2: 'Лютий', 3: 'Березень', 4: 'Квітень', 5: 'Травень', 6: 'Червень',
              7: 'Липень', 8: 'Серпень', 9: 'Вересень', 10: 'Жовтень', 11: 'Листопад', 12: 'Грудень'}[item]
          default:
            return item
        }
      }
    },
    beforeDestroy () {
      window.removeEventListener('click', this.close)
    }
}
</script>
<style scoped lang='scss'>
  $themeColor: rgb(242,117,25);
  $borderColor:#ebebeb;
  ul{
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .year-month{
    float: left;
    width: 140px;
    position: relative;
    height: 35px;
    color: #353535;
  }
  .input-wrapper{
    border:1px solid $borderColor;
    border-radius: 5px;
    vertical-align: middle;
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    align-items: center;
    padding-left:12px;
    height: 33px;
    line-height: 33px;
    box-sizing: border-box;
    padding-right:12px;
    font-size: 14px;
  }
  .input{
    height: 100%;
    width: 100%;
    font-size: inherit;
    box-sizing: border-box;
    outline: none;
    text-align: left;
  }
  .cancel-btn{
    height: 10px;
    width: 18px;
    cursor: pointer;
  }
  .date-panel{
    position: absolute;
    left: -90px;
    z-index: 9000;
    border: 1px solid #eee;
    box-sizing: border-box;
    width: 320px;
    padding: 5px 10px 10px;
    box-sizing: border-box;
    background-color: #fff;
    transform: translateY(4px);
  }
  .panel-header{
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
  }
  .arrow-left, .arrow-right{
    flex: 1;
    font-size: 16px;
    line-height: 2;
    background-color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .year-range{
    font-size: 16px;
    line-height: 2;
    flex: 3;
    display: flex;
    justify-content: center;
  }
  .year-month-box{
    flex: 3;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
  }
  .type-year, .type-month, .date-list{
    background-color: #fff;
  }
  .year-box, .month-box{
    transition: all ease .1s;
    font-family: Roboto, sans-serif;
    flex: 1;
    text-align: center;
    font-size: 16px;
    line-height: 2;
    cursor: pointer;
    background-color: #fff;
  }
  .year-list, .month-list{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    li{
      font-family: Roboto, sans-serif;
      transition: all .45s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
      cursor: pointer;
      text-align: center;
      font-size: 16px;
      width: 33%;
      padding: 10px 0;
      &:hover{
        //background-color: #6ac1c9;
        background: $themeColor;
        color: #fff;
      }
      &.selected{
        //background-color: #0097a7;
        background: $themeColor;
        color: #fff;
      }
      &.invalid{
        cursor: not-allowed;
        color: #ccc;
      }
    }
  }
  .date-list{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    .valid:hover{
      background-color: #eee;
    }
    li{
      transition: all ease .1s;
      cursor: pointer;
      box-sizing: border-box;
      border-bottom: 1px solid #fff;
      position: relative;
      margin: 2px;
      &:not(.firstItem){
        margin-left: 10px;
      }
      .message{
        font-family: Roboto, sans-serif;
        font-weight: 300;
        font-size: 14px;
        position: relative;
        height: 30px;
        &.selected{
          .bg{
            //background-color: rgb(0, 151, 167);
            background: $themeColor;
          }
          span{
            color: #fff;
          }
        }
        &:not(.selected){
          .bg{
            transform: scale(0);
            opacity: 0;
          }
          &:hover{
            .bg{
              //background-color: rgb(0, 151, 167);
              background: $themeColor;
              transform: scale(1);
              opacity: .6;
            }
            span{
              color: #fff;
            }
          }
        }
        .bg{
          height: 30px;
          width: 100%;
          transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
          border-radius: 50%;
          position: absolute;
          z-index: 10;
          top: 0;
          left: 0;
        }
        span{
          position: absolute;
          z-index: 20;
          left: 50%;
          top: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
      }
      &.invalid{
        cursor: not-allowed;
        color: #ccc;
      }
    }

  }
  .weeks{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    li{
      font-weight: 600;
    }
  }
  .weeks, .date-list{
    width: 100%;
    text-align: center;
    .preMonth, .nextMonth{
      color: #ccc;
    }
    li{
      font-family: "微软雅黑";
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
  }
  .toggle-enter, .toggle-leave-active{
    opacity: 0;
    transform: translateY(-10px);
  }
  .toggle-enter-active, .toggle-leave-active{
    transition: all ease .2s;
  }
  .fade-enter, .fade-leave-active{
    opacity: 0;
    transform: scale3d(0, 0, 0);
  }
  .fade-enter-active, .fade-leave-active{
    transition: all ease .1s;
  }
</style>
