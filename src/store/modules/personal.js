export default{
  state:{
    personalMessage:{
      baseInfo:{
        nickName:"亚历山大大帝",
        psnName:"王小二",
        psnNameVisable:0,
        sex:"女",
        sexVisable:0,
        phoneNumber:"138-6666-8888",
        phoneNumberVisable:1,
        age:"2017-10-10",
        dateOfBirth:"",
        ageVisable:1,
        psnMail:"163@163.com",
        psnMailVisable:0,
        ifRNA:false
      },
      education:[
        {id:"000",schoolName:"清华大学1",info:{profession:"建筑设计",introduce:"本科",schoolTimeStart:"2011-09",schoolTimeEnd:"2015-06"}},
        {id:"111",schoolName:"清华大学2",info:{profession:"建筑设计",introduce:"本科",schoolTimeStart:"2011-09",schoolTimeEnd:"2015-06"}},
        {id:"222",schoolName:"清华大学3",info:{profession:"建筑设计",introduce:"本科",schoolTimeStart:"2011-09",schoolTimeEnd:"2015-06"}},
        {id:"333",schoolName:"清华大学4",info:{profession:"建筑设计",introduce:"本科",schoolTimeStart:"2011-09",schoolTimeEnd:"2015-06"}},
      ],
      workExperience:[
        {companyName:"CCDI",companyDetailInfo:{ads:"上海市杨浦区1758号奚地国际"},info:{timeStart:"2011-09",timeEnd:"2014-06",profession:"设计总工",introduce:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium beatae blanditiis consectetur corporis cum cumque, cupiditate deleniti eum explicabo fuga iusto laudantium neque obcaecati quis, repudiandae sed tenetur ut voluptatibus!"}},
        {companyName:"奚地国际1",companyDetailInfo:{ads:"123"},info:{timeStart:"2011-09",timeEnd:"2014-06",profession:"设计总工",introduce:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium beatae blanditiis consectetur corporis cum cumque, cupiditate deleniti eum explicabo fuga iusto laudantium neque obcaecati quis, repudiandae sed tenetur ut voluptatibus!"}},
        {companyName:"奚地国际2",companyDetailInfo:false,info:{timeStart:"2011-09",timeEnd:"2014-06",profession:"设计总工",introduce:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium beatae blanditiis consectetur corporis cum cumque, cupiditate deleniti eum explicabo fuga iusto laudantium neque obcaecati quis, repudiandae sed tenetur ut voluptatibus!"}},
        {companyName:"奚地国际3",companyDetailInfo:false,info:{timeStart:"2011-09",timeEnd:"2014-06",profession:"设计总工",introduce:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium beatae blanditiis consectetur corporis cum cumque, cupiditate deleniti eum explicabo fuga iusto laudantium neque obcaecati quis, repudiandae sed tenetur ut voluptatibus!"}},
      ],
      projectExperience:[
        {projectName:"08年奥运-水立方",projectDetailInfo:false,info:{timeStart:"2011-09",timeEnd:"2014-06",profession:"设计总工",introduce:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium beatae blanditiis consectetur corporis cum cumque, cupiditate deleniti eum explicabo fuga iusto laudantium neque obcaecati quis, repudiandae sed tenetur ut voluptatibus!"},},
        {projectName:"08年奥运-鸟巢",projectDetailInfo:{
          projectAds:{province:"上海市",city:"上海市",county:"杨浦区"},
          projectStateColor:[true,false,false],
          projectTypeColor:[true,false,true,false,true,false,true,false],
          introduce:"00123123123",
          projectTimeStart:"2011-06",
          projectTimeEnd:"2014-06",

        },info:{timeStart:"2011-09",timeEnd:"2014-06",profession:"设计总工",introduce:"atae blanditiis consectetur corporis cum cumque, cupiditate deleniti eum explicabo fuga iusto laudantium neque obcaecati quis, repudiandae sed tenetur ut voluptatibus!"}
}

      ],
      teamExperience:[
        {teamName:"小鸟",info:{time:"",profession:"",introduce:true}},
        {teamName:"小小鸟",info:{time:"",profession:"",introduce:false}},
        {teamName:"小小小鸟",info:{time:"",profession:"",introduce:true}},
        {teamName:"小小小小鸟",info:{time:"",profession:"",introduce:false}},
      ],
      certificate:[
        {id:"000",certificateName:"一级建造师",info:{time:"",profession:"简介",introduce:"987654321"}},
        {id:"111",certificateName:"二级建造师",info:{time:"",profession:"简介",introduce:"123456789"}},
        {id:"222",certificateName:"三级建造师",info:{time:"",profession:"简介",introduce:"123456789"}},
        {id:"333",certificateName:"四级建造师",info:{time:"",profession:"简介",introduce:"123456789"}},
      ],
      jobInfo:[
        {id:"000",jobInfoName:"大师级",info:{time:"2017-10",profession:"建筑",introduce:"987654321",level:"高级",organ:"国家安全局"}},
        {id:"111",jobInfoName:"国宝级",info:{time:"2017-10",profession:"建筑",introduce:"987654321",level:"高级",organ:"国家安全局"}}
      ],
      award:[
        {id:"000",awardName:"CCDI-建筑大奖1",info:{time:"2015",profession:"",introduce:"",level:"",organ:"国家安全局"}},
        {id:"111",awardName:"CCDI-建筑大奖2",info:{time:"2015",profession:"",introduce:"",level:"",organ:"国家安全局"}}
      ],
      paperAndPatent:{
        paper:[
          {id:"000",paperName:"PAPER",info:{time:"2015-09",profession:"",introduce:"",level:"",organ:"国家安全局"}},
          {id:"111",paperName:"PAPER",info:{time:"2015-09",profession:"",introduce:"",level:"",organ:"国家安全局"}},
          ],
        patent:[
          {id:"222",patentName:"PATENT",info:{time:"2015-09",profession:"",introduce:"",level:"",organ:"国家安全局"}},
          {id:"333",patentName:"PATENT",info:{time:"2015-09",profession:"",introduce:"",level:"",organ:"国家安全局"}},
          ]
      },
      otherSkill:{
        language:[
          {id:"000",languageName:"ENGLISH",info:{time:"",profession:"高级商务英语",introduce:"",level:"",organ:""}},
          {id:"111",languageName:"ENGLISH",info:{time:"",profession:"高级商务英语",introduce:"",level:"",organ:""}}
        ],
        software:[
          {id:"222",softwareName:"PS",info:{time:"",profession:"最强王者",introduce:"",level:"",organ:""}},
          {id:"333",softwareName:"CAD",info:{time:"",profession:"最强王者",introduce:"",level:"",organ:""}}
        ]
      },
    }
  },
  mutations:{
    changBasicInfoIndex:(state,text)=>{state.personalMessage.baseInfo=text},
    keepEditEduNew:(state,text)=>{state.personalMessage.education=text},
    keepEditEduExist:(state,text)=>{state.personalMessage.education=text}
  }
}
