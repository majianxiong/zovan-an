<template>
  <div class="page-order">
    <!-- <img style="position:absolute;z-index:-1;opacity:0;left:0;top:0" ref="hideimg" src="" alt="" crossorigin="anonymous"> -->
    <div class="" data-vv-scope="form-main">
      <div class="tit">
        {{prodname}}
      </div>
      <div class="h2 mt0">
        <i class="icon icon-1"></i>投保人信息
      </div>
      <group>
        <cell title="姓名">
          <div slot="value" class="item">
            <div @click="callCamera($event, 'photocb')" id="camera_insurer" class="ui-scaner fr"><i></i>扫描证件</div>
            <customInput width="" ref='fields' v-validate data-vv-rules="required|cnname" data-vv-value-path="innerValue" data-vv-as='填写投保人姓名' placeholder='请输入投保人姓名' :maxLength='12' type='text'  v-model='insurername' name='insurername'>
            </customInput>
          </div>
        </cell>
        <cell title="身份证">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required|idcard" data-vv-value-path="innerValue" data-vv-as='填写投保人身份证' placeholder='请输入证件号码' :maxLength='18' type='text'  v-model='insureridcard' name='insureridcard'>
            </customInput>
          </div>
        </cell>
        <cell title="证件开始日期">
          <div slot="value" class="item">
            <datetime :start-date="idcardStartDate" :end-date="today" confirm-text="完成" cancel-text="取消" v-model="insureridcardStart" format="YYYY-MM-DD" title="" placeholder="有效开始日期" :max-year="new Date().getFullYear()" :min-year="new Date().getFullYear()-20" @on-change=""></datetime>
              <input
                class="hiddenInput"
                type="hidden"
                placeholder=""
                name="insureridcardStart"
                v-model.trim="insureridcardStart"
                v-validate
                data-vv-as="选择投保人证件有效开始日期"
                data-vv-rules="required">
          </div>
        </cell>
        <cell title="证件截止日期">
          <div slot="value" class="item">
            <div class="s_checker">
              <c_checker name="insurer_idcard_checker" id="insurer_idcard_checker" v-model="insurer_idcard_checker" @toggleChecker="toggleIdcardChecker">
                长期有效
              </c_checker>
            </div>
            <datetime :start-date="today" :end-date="idcardEndDate" confirm-text="完成" cancel-text="取消" class="w60per fr" v-model="insureridcardEnd" format="YYYY-MM-DD" title="" placeholder="有效截止日期" :max-year="new Date().getFullYear()+20" :min-year="new Date().getFullYear()" @on-change=""></datetime>
              <input
                class="hiddenInput"
                type="hidden"
                placeholder=""
                name="insureridcardEnd"
                v-model.trim="insureridcardEnd"
                v-validate
                data-vv-as="选择投保人证件有效截止日期"
                data-vv-rules="required">
          </div>
        </cell>
        <cell title="公司名称" v-if="pcode=='ZA0003'?true:false">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='请输入公司名称' placeholder='请输入公司名称' type='text'  v-model='insurercompany' name='insurercompany'>
            </customInput>
          </div>
        </cell>
        <cell title="学历" v-if="pcode=='ZA0003'?true:false">
          <div slot="value" class="item">
            <popup-picker ref="pickerEdu" :columns="1" :show-name="true" placeholder="请选择学历" :data="eduList" v-model="insureredu" @on-hide=""></popup-picker>
          </div>
        </cell>
        <cell title="婚姻状况" v-if="pcode=='ZA0003'?true:false">
          <div slot="value" class="item">
            <popup-picker ref="pickerMarry" :columns="1" :show-name="true" placeholder="请选择婚姻状况" :data="marryList" v-model="insurermarry" @on-hide=""></popup-picker>
          </div>
        </cell>
        <cell title="手机号">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required|mobile" data-vv-value-path="innerValue" data-vv-as='填写投保人手机号' placeholder='请输入投保人手机号' :maxLength='11' type='tel'  v-model='insurermobile' name='insurermobile'>
            </customInput>
          </div>
        </cell>
        <cell title="固定电话">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写投保人固定电话' placeholder='请输入区号＋座机号' :maxLength='11' type='tel'  v-model='insurertel' name='insurertel'>
            </customInput>
          </div>
        </cell>
        <cell title="邮箱">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required|email" data-vv-value-path="innerValue" data-vv-as='填写投保人电子邮箱' placeholder='用于接收电子保单' type='email'  v-model='insureremail' name='insureremail'>
            </customInput>
          </div>
        </cell>
        <cell title="选择职业" :isLink="!insurerjob">
          <div slot="value" class="item" v-tap="{methods:getSelectpageData,id:'insurerjob'}">
            <span v-if="!insurerjob">请选择职业</span>{{insurerjobText}}
            <input
              class="hiddenInput"
              type="hidden"
              placeholder=""
              name="insurerjob"
              v-model.trim="insurerjobText"
              v-validate
              data-vv-as="选择投保人职业"
              data-vv-rules="required">
          </div>
        </cell>
        <cell title="地址">
          <div slot="value" class="item">
            <popup-picker ref="pickerDistrict1" :columns="3" :show-name="true" placeholder="请选择省市区" :data="districtList" v-model="insurerdistrict" @on-hide=""></popup-picker>
          </div>
        </cell>
        <cell title="详细地址">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写投保人详细地址' placeholder='请具体到门牌号' type='text'  v-model='insureraddress' name='insureraddress'>
            </customInput>
          </div>
        </cell>
        <cell title="邮编">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写投保人邮编' placeholder='请输入邮编' type='tel' :max-length='6'  v-model='insurerzipcode' name='insurerzipcode'>
            </customInput>
          </div>
        </cell>
        <cell title="收入来源" :isLink='!insurerincomesource.length'>
          <div slot="value" class="item" v-tap="{methods:()=>{insurerincomesourcePopShow=true}}" style="white-space:nowrap;text-overflow:ellipsis">
            {{!insurerincomesource.length?'请选择':insurerincomesourceText}}
            <input
              class="hiddenInput"
              type="hidden"
              placeholder=""
              name="insurerincomesource"
              v-model.trim="insurerincomesource"
              v-validate
              data-vv-as="选择投保人收入来源"
              data-vv-rules="required">
          </div>
        </cell>
        <cell title="年收入">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写投保人年收入' placeholder='请输入' type='tel'  v-model='insurerannualincome' name='insurerannualincome'>
            </customInput> 万元
          </div>
        </cell>
        <cell title="身高">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写投保人身高' placeholder='投保人身高' :maxLength='3' type='tel' v-model='insurerheight' name='insurerheight'>
            </customInput> cm
          </div>
        </cell>
        <cell title="体重">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写投保人体重' placeholder='投保人体重' :maxLength='3' type='tel' v-model='insurerweight' name='insurerweight'>
            </customInput> kg
          </div>
        </cell>
      </group>

      <div class="h2">
        <i class="icon icon-2"></i>被保人信息
      </div>
      <group>
        <cell title="为谁投保">
          <div slot="value" class="item">
            <popup-picker ref="pickerInsureRelation" :columns="1" :show-name="true" placeholder="选择被保人" :data="relationList" v-model="insurerrelation" @on-hide="onHideRelationPopup"></popup-picker>
            <!-- <input
              class="hiddenInput"
              type="hidden"
              placeholder=""
              name="relation"
              v-model.trim="relation[0]"
              v-validate
              data-vv-as="选择投保人"
              data-vv-rules="required"> -->
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="姓名">
          <div slot="value" class="item">
             <!-- :btnarea='{type:"clear"}' -->
            <div @click="callCamera($event, 'photocb')" class="ui-scaner fr" id="camera_recognizee"><i></i>扫描证件</div>
            <customInput width="" ref='fields' v-validate :data-vv-rules="showRecognizeeForm?'required|cnname':'cnname'" data-vv-value-path="innerValue" data-vv-as='填写被保人姓名' placeholder='请输入被保人姓名' :maxLength='12' type='text'  v-model='recognizeename' name='recognizeename'>
            </customInput>
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="身份证">
          <div slot="value" class="item">
             <!-- :btnarea='{type:"clear"}' -->
            <customInput ref='fields' v-validate data-vv-rules="required:showRecognizeeForm|idcard" data-vv-value-path="innerValue" data-vv-as='填写被保人身份证' placeholder='请输入证件号码' :maxLength='18' type='text'  v-model='recognizeeidcard' name='recognizeeidcard'>
            </customInput>
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="证件开始日期">
          <div slot="value" class="item">
            <datetime :start-date="idcardStartDate" :end-date="today" confirm-text="完成" cancel-text="取消" v-model="recognizeeidcardStart" format="YYYY-MM-DD" title="" placeholder="有效开始日期" :max-year="new Date().getFullYear()" :min-year="new Date().getFullYear()-20" @on-change=""></datetime>
              <input
                class="hiddenInput"
                type="hidden"
                placeholder=""
                name="recognizeeidcardStart"
                v-model.trim="recognizeeidcardStart"
                v-validate
                data-vv-as="选择被保人证件有效开始日期"
                data-vv-rules="required">
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="证件截止日期">
          <div slot="value" class="item">
            <div class="s_checker">
              <c_checker name="recognizee_idcard_checker" id="recognizee_idcard_checker" v-model="recognizee_idcard_checker" @toggleChecker="toggleIdcardChecker2">
                长期有效
              </c_checker>
            </div>
            <datetime :start-date="today" :end-date="idcardEndDate" confirm-text="完成" cancel-text="取消" class="w60per fr" v-model="recognizeeidcardEnd" format="YYYY-MM-DD" title="" placeholder="有效截止日期" :max-year="new Date().getFullYear()+20" :min-year="new Date().getFullYear()" @on-change=""></datetime>
              <input
                class="hiddenInput"
                type="hidden"
                placeholder=""
                name="recognizeeidcardEnd"
                v-model.trim="recognizeeidcardEnd"
                v-validate
                data-vv-as="选择被保人证件有效截止日期"
                data-vv-rules="required">
          </div>
        </cell>
        <cell v-if="showRecognizeeForm && pcode=='ZA0003'" title="公司名称">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='请输入公司名称' placeholder='请输入公司名称' type='text'  v-model='recognizeecompany' name='recognizeecompany'>
            </customInput>
          </div>
        </cell>
        <cell v-if="showRecognizeeForm && pcode=='ZA0003'" title="学历">
          <div slot="value" class="item">
            <popup-picker ref="pickerEdu" :columns="1" :show-name="true" placeholder="请选择学历" :data="eduList" v-model="recognizeeedu" @on-hide=""></popup-picker>
          </div>
        </cell>
        <cell v-if="showRecognizeeForm && pcode=='ZA0003'" title="婚姻状况">
          <div slot="value" class="item">
            <popup-picker ref="pickerMarry" :columns="1" :show-name="true" placeholder="请选择婚姻状况" :data="marryList" v-model="recognizeemarry" @on-hide=""></popup-picker>
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="手机号">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required|mobile" data-vv-value-path="innerValue" data-vv-as='填写被保人手机号' placeholder='请输入被保人手机号' :maxLength='11' type='tel'  v-model='recognizeemobile' name='recognizeemobile'>
            </customInput>
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="固定电话">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写被保人固定电话' placeholder='请输入区号＋座机号' :maxLength='11' type='tel'  v-model='recognizeetel' name='recognizeetel'>
            </customInput>
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="邮箱">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required|email" data-vv-value-path="innerValue" data-vv-as='填写被保人电子邮箱' placeholder='用于接收电子保单' type='email'  v-model='recognizeeemail' name='recognizeeemail'>
            </customInput>
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="选择职业" :isLink="!recognizeejob">
          <div slot="value" class="item" v-tap="{methods:getSelectpageData,id:'recognizeejob'}">
            <span v-if="!recognizeejob">请选择职业</span>{{recognizeejobText}}
            <input
              class="hiddenInput"
              type="hidden"
              placeholder=""
              name="recognizeejob"
              v-model.trim="recognizeejobText"
              v-validate
              data-vv-as="选择被保人职业"
              data-vv-rules="required">
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="地址">
          <div slot="value" class="item">
            <popup-picker ref="pickerDistrict2" :columns="3" :show-name="true" placeholder="请选择省市区" :data="districtList" v-model="recognizeedistrict" @on-hide=""></popup-picker>
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="详细地址">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写被保人详细地址' placeholder='被保人详细地址' type='text'  v-model='recognizeeaddress' name='recognizeeaddress'>
            </customInput>
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="邮编">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写被保人邮编' placeholder='请输入邮编' type='tel' :max-length='6'  v-model='recognizeezipcode' name='recognizeezipcode'>
            </customInput>
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="收入来源" :isLink='!recognizeeincomesource.length'>
          <div slot="value" class="item" v-tap="{methods:()=>{recognizeeincomesourcePopShow=true}}" style="white-space:nowrap;text-overflow:ellipsis">
            {{!recognizeeincomesource.length?'请选择':recognizeeincomesourceText}}
            <input
              class="hiddenInput"
              type="hidden"
              placeholder=""
              name="recognizeeincomesource"
              v-model.trim="recognizeeincomesource"
              v-validate
              data-vv-as="选择收入来源"
              data-vv-rules="required">
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="年收入">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写被保人年收入' placeholder='请输入' type='tel'  v-model='recognizeeannualincome' name='recognizeeannualincome'>
            </customInput> 万元
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="身高">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写被保人身高' placeholder='被保人身高' :maxLength='3' type='tel' v-model='recognizeeheight' name='recognizeeheight'>
            </customInput> cm
          </div>
        </cell>
        <cell v-if="showRecognizeeForm" title="体重">
          <div slot="value" class="item">
            <customInput ref='fields' v-validate data-vv-rules="required" data-vv-value-path="innerValue" data-vv-as='填写被保人体重' placeholder='被保人体重' :maxLength='3' type='tel' v-model='recognizeeweight' name='recognizeeweight'>
            </customInput> kg
          </div>
        </cell>
      </group>

      <div class="h2">
        <i class="icon icon-3"></i>受益人信息
      </div>
      <group>
        <x-switch :title="!legalAssured?'受益人为法定受益人':'受益人为指定受益人'" v-model="legalAssured"></x-switch>
        <div class="" v-if="legalAssured">
          <div v-for="(item,idx) in assureds" class="weui-cell vux-tap-active weui-cell_access">
            <div class="vux-cell-bd vux-cell-primary">
              <p><label class="vux-label">{{item.name}} {{item.idcard}}</label></p>
              <span class="vux-label-desc fz12"> <span class="fz14">{{item.relation}}</span> <span class="assuredPer">受益 <span class="fz16">{{item.per}}%</span></span> <span v-if="item.mobile">手机号 <span class="fz16">{{item.mobile}}</span></span> </span></div>
              <div class="weui-cell__ft" @click="editAssured({name:item.name,idcard:item.idcard,relation:item.relation,income:item.per,idcardStart:item.idcardStart,idcardEnd:item.idcardEnd,mobile:item.mobile,index:idx})">
                修改
              </div>
          </div>
          <div class="limited" v-if="assuredLimited">已增加{{assuredLimited}}人<span>（人数已达上限）</span></div>
          <div class="weui-cell addAssured" v-if="addAssured" v-tap="{methods:addAnAssured}">
            <div class="btn-addAssured">增加受益人</div>
          </div>
        </div>
      </group>

      <div class="h2">
        <i class="icon icon-5"></i>投保确认书信息
      </div>
      <group>
        <cell title="投保确认书编号">
          <div slot="value" class="item">
             <!-- :btnarea='{type:"clear"}' -->
            <customInput ref='fields' placeholder='请输入投保确认书编号' :max-length='16' type='text'  v-model='proposalCodePaper' name='proposalCodePaper'>
            </customInput>
          </div>
        </cell>
      </group>

      <div class="h2">
        <i class="icon icon-4"></i>支付银行卡
        <span class="submark">
          保单提交后，由保险公司进行审核扣款
        </span>
      </div>
      <group>
        <cell title="开户银行">
          <div slot="value" class="item">
            <popup-picker ref="pickerBank" :columns="1" :show-name="true" placeholder="请选择开户银行" :data="bankList" v-model="bank"></popup-picker>
          </div>
        </cell>
        <cell title="银行卡号">
          <div slot="value" class="item">
             <!-- :btnarea='{type:"clear"}' -->
            <!-- <customInput ref='fields' placeholder='请输入投保人的储蓄卡卡号' :max-length='20' type='tel'  v-model='bankcard' name='bankcard' @on-blur="getCardBin">
            </customInput> -->
            <customInput ref='fields' placeholder='请输入投保人的储蓄卡卡号' :max-length='20' type='tel'  v-model='bankcard' name='bankcard'>
            </customInput>
          </div>
        </cell>
        <cell title="开户行所在城市">
          <div slot="value" class="item">
            <popup-picker ref="pickerBankPlace" :columns="2" :show-name="true" placeholder="请选择开户银行所在城市" :data="cityList" v-model="bankPlace" @on-change=""></popup-picker>
          </div>
        </cell>
        <cell title="姓名">
          <div slot="value" class="item">
             <!-- :btnarea='{type:"clear"}' -->
            <customInput ref='fields' placeholder='请输入投保人的姓名' :maxLength='12' type='text'  v-model='bankcardname' name='bankcardname'>
            </customInput>
          </div>
        </cell>
      </group>

      <p class='agreement'>
        <c_checker  name="agreement" id="agreement" v-model="checkAT">
          我已阅读并同意<router-link :to="'/at'+this.pcode">《产品条款》</router-link><router-link :to="'/notice'+this.pcode" v-show="this.pcode=='ZA0002'?false:true">《投保须知》</router-link><router-link :to="'/transfer'+this.pcode">《代扣协议》</router-link>
        </c_checker>
      </p>
      <c_buynav btntext="下一步 上传证件" :price="price" @buy="gotoPay"></c_buynav>
    </div>

    <!-- 投保人收入来源 -->
    <div v-transfer-dom>
      <popup v-model="insurerincomesourcePopShow" position="bottom">
        <div class="ui-pop" data-vv-scope="form-addAssured">
          <div class="ui-pop-tit">
            选择收入来源
            <span class="ui-pop-rbtn" @click="insurerincomesourcePopShow=false">确定</span>
            <span class="ui-pop-lbtn" @click="cancelIncomesource">取消</span>
          </div>
          <div class="slot" style="padding:10px">
            <checker v-model="insurerincomesource" type="checkbox" default-item-class="checker" selected-item-class="active">
              <checker-item :value="item" v-for="(item, index) in incomesourceList" :key="index">{{item.key}}</checker-item>
            </checker>
          </div>
        </div>
     </popup>
   </div>

    <!-- 被保人收入来源 -->
    <div v-transfer-dom>
      <popup v-model="recognizeeincomesourcePopShow" position="bottom">
        <div class="ui-pop" data-vv-scope="form-addAssured">
          <div class="ui-pop-tit">
            选择收入来源
            <span class="ui-pop-rbtn" @click="recognizeeincomesourcePopShow=false">确定</span>
            <span class="ui-pop-lbtn" @click="cancelIncomesource2">取消</span>
          </div>
          <div class="slot" style="padding:10px">
            <checker v-model="recognizeeincomesource" type="checkbox" default-item-class="checker" selected-item-class="active">
              <checker-item :value="item" v-for="(item, index) in incomesourceList" :key="index">{{item.key}}</checker-item>
            </checker>
          </div>
        </div>
     </popup>
   </div>
    <!-- 新增受益人 -->
    <div v-transfer-dom>
      <popup v-model="addAssuredPopShow" position="bottom" :hide-on-blur="false">
        <div class="ui-pop" data-vv-scope="form-addAssured">
          <div class="ui-pop-tit">
            填写受益人
            <span class="ui-pop-rbtn" @click="addAssuredPopShow=false;assuredRelation=[]">取消</span>
            <!-- <span class="ui-pop-rbtn">确认</span> -->
          </div>
          <div class="slot">
            <cell title="是被保人的">
              <div slot="value" class="item">
              <popup-picker :show-mask="true" ref="assuredRelationRef" :columns="1" :show-name="true" placeholder="受益人是被保人的" :data="relationList2" v-model="assuredRelation" @on-show="onShow" @on-hide="onHide" @on-change="onChange" ></popup-picker>
              </div>
            </cell>
            <cell title="姓名">
              <div slot="value" class="item">
                 <!-- :btnarea='{type:"clear"}' -->

                <div class="ui-scaner fr" style="" @click="callCamera($event, 'photocb')" id="camera_assured"><i></i>扫描证件</div>
                <customInput width="" ref='fields' placeholder='请输入姓名' :maxLength='12' type='text'  v-model='assuredname' name='assuredname'>
                </customInput>
              </div>
            </cell>
            <cell title="身份证">
              <div slot="value" class="item">
                 <!-- :btnarea='{type:"clear"}' -->
                <customInput ref='fields' placeholder='请输入证件号码' :maxLength='18' type='text'  v-model='assuredidcard' name='assuredidcard'>
                </customInput>
              </div>
            </cell>
            <cell title="证件开始日期">
              <div slot="value" class="item">
                <datetime :start-date="idcardStartDate" :end-date="today" confirm-text="完成" cancel-text="取消" v-model="addInsuredidcardStart" format="YYYY-MM-DD" title="" placeholder="有效开始日期" :max-year="new Date().getFullYear()" :min-year="new Date().getFullYear()-20" @on-change=""></datetime>
              </div>
            </cell>
            <cell title="证件截止日期">
              <div slot="value" class="item">
                <div class="s_checker">
                  <c_checker name="addInsuredidcard_checker" id="addInsuredidcard_checker" v-model="addInsuredidcard_checker" @toggleChecker="toggleBeneficiaryIdcardChecker">
                    长期有效
                  </c_checker>
                </div>
                <datetime :start-date="today" :end-date="idcardEndDate" confirm-text="完成" cancel-text="取消" class="w60per fr" v-model="addInsuredidcardEnd" format="YYYY-MM-DD" title="" placeholder="有效截止日期" :max-year="new Date().getFullYear()+20" :min-year="new Date().getFullYear()" @on-change=""></datetime>
              </div>
            </cell>
            <cell title="收益比例">
              <div slot="value" class="item">
                <customInput ref='fields' placeholder='输入收益比例' :maxLength='3' type='tel' v-model='assuredincome' name='assuredincome'>
                </customInput> %
                <!-- <customInput ref='fields' placeholder='输入收益比例' :maxLength='3' type='text' :disabled='true' v-model='assuredincome' name='assuredincome'>
                </customInput> % -->
              </div>
            </cell>
            <cell title="手机号" v-if="pcode=='ZA0003'?true:false">
              <div slot="value" class="item">
                 <!-- :btnarea='{type:"clear"}' -->
                <customInput ref='fields' placeholder='请输入手机号码' :maxLength='11' type='tel' v-model='assuredmobile' name='assuredmobile'>
                </customInput>
              </div>
            </cell>
          </div>
          <div class="ui-pop-btm">
            <div class="ui-pop-del" v-tap="{methods:delAssured}" v-if="assuredEditFlag">删除</div>
            <div class="ui-pop-ensure" v-tap="{methods:validateAssuredForm}">确定</div>
          </div>
        </div>
      </popup>
    </div>
    <!-- <popup-picker value-text-align="left" :columns="1" :show-name="true" placeholder="请选择被保人性别" :data="sexList" v-model="sex" @on-show="onShow" @on-hide="onHide"></popup-picker> -->
    <!-- <cell title="获取值对应的文字" :value="$refs.picker3&&$refs.picker3.getNameValues()"></cell>
      <popup-picker :title="title3" :data="list3" :columns="3" v-model="value3" ref="picker3"></popup-picker> -->
    <!-- <cell is-link title="">
      <div slot="value" class="item">
        <popup-picker value-text-align="left" :columns="1" :show-name="true" placeholder="请选择与被保人关系" :data="relationlist" v-model.trim="relation" @on-change="onchangerelation" @on-hide="onselectrelation"></popup-picker>
      </div>
    </cell> -->
    <!-- <c_button class='next' val='下一步' @Click="nextStep"></c_button> -->
  </div>
</template>
<script>
  import cookie from 'src/widget/plugin/cookie'
  import * as tool from 'src/widget/validate/extends'
  // console.log(tool)
  import * as store from 'src/widget/plugin/store'
  import * as types from 'src/store/mutation-types'
  import { TransferDom, Popup, PopupPicker, Datetime, Checker, CheckerItem, Group, Cell, Cellbox, XSwitch } from "vux"
  import { trialApi, getIdcardInfo, orderInitialApi, getRegionApi, getDebitCardListApi, getCardBinApi, checkOrder, savePolicyApi, policyDetailApi, wechatSignApi} from "src/api"
  let userid = cookie.get('http_userID') ? cookie.get('http_userID') : ''
  let canPostOrder = true
  let source
  let xform = {
    "bankCard": "",
    "bankName": "",
    "bankCode": "",
    "cardHolder": "",
    "beInsured": {
      "annualIncome": "",
      "birthday": "",
      "caddress": "",
      "cname": "",
      "customerType": "",
      "gender": "",
      "height": "",
      "idType": 1,
      "idno": "",
      "idperiod": "",
      "incomeSource": "",
      "mailbox": "",
      "phone": "",
      "pinyin": "",
      "profession": "",
      "relation": "",
      "telephone": "",
      "weight": "",
      "zipcode": ""
    },
    "beneficiarys": [
    ],
    // "guaranteePeriod": "",
    "insured": {
      "annualIncome": "",
      "birthday": "",
      "caddress": "",
      "cname": "",
      "customerType": "",
      "gender": "",
      "height": "",
      "idType": 1,
      "idno": "",
      "idperiod": "",
      "incomeSource": "",
      "mailbox": "",
      "phone": "",
      "pinyin": "",
      "profession": "",
      "relation": "",
      "telephone": "",
      "weight": "",
      "zipcode": ""
    },
    "insuredIdCard": "",
    "insuredName": "",
    // "payPeriod": 0,
    // "payWay": "",
    // "producNum": "",
    "proposalId": "",
    "proposalCodePaper": "",
    "tenantId": 1,
    // "totalPremium": 0,
    "userId": ""
  }
  let data1 = {
    // selectpageShow: false,
    // selectpageShow2: false,
    prodname: null,
    //投保人信息
    insurername: '',
    insureridcard: null,
    insureridcardStart: null,
    insureridcardEnd: null,
    insurer_idcard_checker: false,
    insurermobile: null,
    insurertel: null,
    insureremail: null,
    insurerjob: null,
    insurerdistrict: [],
    // protectionDateList: null,
    districtList: [],
    cityList: [],
    insureraddress: '',
    insurerzipcode: '',
    insurerincomesource: [],
    insurerincomesourcePopShow: false,
    insurerannualincome: '',
    insurerweight: '',
    insurerheight: '',
    //被保人信息
    recognizeeage: null,
    recognizeegender: null,

    recognizeename: '',
    recognizeeidcard: null,
    recognizeeidcardStart: null,
    recognizeeidcardEnd: null,
    recognizee_idcard_checker: false,
    recognizeemobile: null,
    recognizeetel: null,
    recognizeeemail: null,
    recognizeejob: null,
    recognizeedistrict: [],
    // protectionDateList: null,
    recognizeedistrictList: [],
    recognizeeaddress: '',
    recognizeezipcode: '',
    recognizeeincomesource: [],
    recognizeeincomesourcePopShow: false,
    recognizeeannualincome: '',
    recognizeeheight: null,
    recognizeeweight: null,

    incomesource_temp_data: null,
    incomesource_temp_data2: null,

    //投保被保关系
    insurerrelation: ['0'],
    // protectionDateList: null,
    legalAssured: false,
    // [
      // {name:'工商银行',value:'1',parent:0},
      // {name:'招商银行',value:'2',parent:0},
      // {name:'中国银行',value:'3',parent:0},
      // {name:'浦发银行',value:'4',parent:0}
    // ],
    insuredBirthday: null,
    assureds: [
      // {
      //   name:'name1',
      //   idcard: '310102198702204575',
      //   relation: '女儿',
      //   per: '55',
      //   idcardEnd: ''
      // }
    ],
    assuredLimited: false,
    addAssured: true,
    addAssuredPopShow: false,
    addInsuredidcardStart: null,
    addInsuredidcardEnd: null,
    assuredRelationList: [],
    assuredRelation: [],
    assuredname: null,
    assuredidcard: null,
    assuredmobile: null,
    assuredincome: '',
    assuredEditFlag: false,
    assuredEditIndex : null,
    addInsuredidcard_checker: false,
    //银行卡信息
    bankList: [],
    bank: [],
    bankPlace: [],
    bankcard: null,
    bankcardname: '',
    isCreditCard: true,
    bankcardBin: {},
    //纸质投保单号
    proposalCodePaper: null,
    //条款协议
    checkAT: true,

    clearSession: false,
    insurercompany: null,
    insurermarry: [],
    insureredu: [],
    recognizeecompany: null,
    recognizeemarry: [],
    recognizeeedu: []
  }
  // console.log(initialData)
  export default {
    name: 'order',
    directives: {
      TransferDom
    },
    data () {
      return {
        // ...Object.assign({},data1),
        ...data1,
        id:this.$route.query.id,
        proposalId:this.$route.query.proposalId,
        version:this.$route.query.version,
        additionalRisk:this.$route.query.additionalRisk,
        imgsrc: '',
        incomesourceList: [{
          key: '工资',
          value: '1'
        }, {
          key: '房屋出租',
          value: '2'
        }, {
          key: '投资收益',
          value: '3'
        }, {
          key: '个体经营',
          value: '4'
        }, {
          key: '其他',
          value: '5'
        }],
        relationList: [
          {name:'本人',value:'0',parent:0},
          {name:'父母',value:'1',parent:0},
          {name:'配偶',value:'2',parent:0},
          {name:'子女',value:'3',parent:0}
        ],
        //受益人
        relationList2: [
          {name:'父母',value:'1',parent:0},
          {name:'配偶',value:'2',parent:0},
          {name:'子女',value:'3',parent:0}
        ],
        marryList: [
          {name:"未婚",value:"10",parent:0},
          {name: "已婚", value: "20", parent:0},
          {name: "初婚", value: "21", parent:0},
          {name: "再婚", value: "22", parent:0},
          {name: "复婚", value: "23", parent:0},
          {name: "丧偶", value: "30", parent:0},
          {name: "离婚", value: "40", parent:0},
          {name: "未说明婚姻状况", value: "90", parent:0}
        ],
        eduList: [
          {name: "博士后", value: "10", parent:0},
          {name: "大专", value: "100", parent:0},
          {name: "博士", value: "20", parent:0},
          {name: "硕士", value: "30", parent:0},
          {name: "本科", value: "40", parent:0},
          {name: "专科", value: "50", parent:0},
          {name: "中专", value: "60", parent:0},
          {name: "高中", value: "70", parent:0},
          {name: "初中", value: "80", parent:0},
          {name: "小学", value: "90", parent:0},
          {name: "其他", value: "99", parent:0}
        ],
        pcode: this.$route.params.productcode || '',
        price: this.$route.query.price || '0.00'
        // idcardStartDay: '',
        // idcardEndDay: '',
      }
    },
    computed: {
      today(){
        let now = new Date()
        let cmonth = now.getMonth() + 1
        let day = now.getDate()
        if (cmonth < 10) cmonth = '0' + cmonth
        if (day < 10) day = '0' + day
        return now.getFullYear() + '-' + cmonth + '-' + day
      },
      insurerjobText(){
        return this.insurerjob? this.insurerjob[0] : ''
      },
      recognizeejobText(){
        return this.recognizeejob? this.recognizeejob[0] : ''
      },
      showRecognizeeForm(){
        return this.relationValue != 0
      },
      idcardStartDate(){
        console.log(this.today)
        let y1 = this.today.split('-')[0]
        // console.log(this.today.replace(y1,y1-100))
        return this.today.replace(y1,y1-20)
      },
      idcardEndDate(){
        let y1 = this.today.split('-')[0]
        // console.log(this.today.replace(y1,y1-100))
        return this.today.replace(y1,y1+20)
      },
      relationValue(){
        return this.insurerrelation[0];
      },
      recognizeeincomesourceVal(){
        let str = ''
        this.recognizeeincomesource.forEach((item,idx)=>{
          str+=item.value+','
        })
        return str.substring(0,str.length-1)
      },
      insurerincomesourceVal(){
        let str = ''
        this.insurerincomesource.forEach((item,idx)=>{
          str+=item.value+','
        })
        return str.substring(0,str.length-1)
      },
      recognizeeincomesourceText(){
        let str = ''
        this.recognizeeincomesource.forEach((item,idx)=>{
          str+=item.key+' '
        })
        return str
      },
      insurerincomesourceText(){
        let str = ''
        this.insurerincomesource.forEach((item,idx)=>{
          str+=item.key+' '
        })
        return str
      },
      bankValue(){
        return this.bank[0];
      },
      bankPlaceValue(){
        return this.bankPlace[0];
      }
    },
    created () {
      let CancelToken = this.axios.CancelToken
      source = CancelToken.source()
      //处理form
      // console.log(form)
      window.savePolicy = () => {
        this.composeForm()
        let policyJson = {...this.$data}
        // delete policyJson.districtList
        policyJson.districtList = []
        policyJson.cityList = []
        let form = {...xform,policyJson:JSON.stringify(policyJson)}
        // console.log(form)
        this.axios.post(savePolicyApi,form,{
          cancelToken:source.token
        }).then((res)=> {
          let value = res.data
          let toastConf = {
           type: 'text',
           width: '80%',
           isShowMask: true,
           text: '保单暂存成功',
          //  time: 150000
          }
          this.$vux.toast.show(toastConf)
          // console.log(value)
        })
        .catch((errorResponse) => {
          // alert(errorResponse)
          let toastConf = {
           type: 'text',
           width: '80%',
           isShowMask: true,
           text: '保单暂存失败，稍后再试',
          //  time: 150000
          }
          this.$vux.toast.show(toastConf)
        })
      }
      if(this.uaDetector && this.uaDetector.inWechat) {
        this.axios.post(wechatSignApi,{
          url:window.location.href.split('#')[0].replace('/?','?'),
        },{cancelToken:source.token}).then((res)=> {
          let value = res.data.data
          // let wx = this.$wechat
          if(!!value){
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: value.appId, // 必填，公众号的唯一标识
              timestamp: value.timestamp, // 必填，生成签名的时间戳
              nonceStr: value.nonceStr, // 必填，生成签名的随机串
              signature: value.signature,// 必填，签名，见附录1
              jsApiList: ["showMenuItems","hideMenuItems",'chooseImage','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            wx.ready(()=> {
              // wx.hideOptionMenu();
              // alert('ready')
            })
          }
        })
        .catch((errorResponse) => {
          // alert(errorResponse)
          let toastConf = {
           type: 'text',
           width: '80%',
           isShowMask: true,
           text: '授权失败，稍后再试',
          //  time: 150000
          }
          this.$vux.toast.show(toastConf)
        })
      }
      // console.log(this.relationValue)
      // this.init()
      // store.set('foo', 'bar')
      // var engine = require('../store-engine')
      // var storages = require('store/storages/sessionStorage')
      // var plugins = []
      // var session = store.createStore('sessionStorage')
      // session.set('foo', 'bar')
      // console.log(this.relationValue)
      // this.getData()
      this.init()
    },
    mounted () {
      // this.setCareer()
      //
      if(this.$store.state.dictionary.selectjob.scroll) document.querySelectorAll('.full-page')[0].scrollTop = this.$store.state.dictionary.selectjob.scroll
      this.$refs.assuredRelationRef.$children[0].$el.style.height='405px'
    },
    beforeDestroy(){
      source.cancel('取消请求')
      this.store()
    },
    // activated () {
    // },
    // deactivated(){
    // },
    methods: {
      setCareer(){
        //读取字典信息
        if(this.$store.state.dictionary.selectjob.insurerjob) this.insurerjob = this.$store.state.dictionary.selectjob.insurerjob
        // console.log(this.insurerjob)
        if(this.$store.state.dictionary.selectjob.recognizeejob) this.recognizeejob = this.$store.state.dictionary.selectjob.recognizeejob
        // })
        //清空字典信息 同模版动态页面 不读取同一个vuex store
        this.$store.commit(types.CLEARJOBS)
        console.log(this.$router)
      },
      getCardBin(succb){
        this.axios.get(getCardBinApi+this.bankcard, {cancelToken:source.token}).then(res=>{
          if(res.data && res.data.status == 'SUCCESS') {
            //读取银行所在城市
            // xform.bankProvince = res.data.data.bankCardProvince
            // xform.bankCity = res.data.data.bankCardCity
            // this.$refs.pickerBankPlace.$el.getElementsByClassName('vux-popup-picker-value')[0].innerHTML = xform.bankProvince+' '+xform.bankCity

            // {"bankCardAttr":"借记卡","bankCardBrand":"62银联标准卡","bankCardCategory":"","bankCardCity":"北京市","bankCardClass":"","bankCardCountry":"境内","bankCardKind":"","bankCardName":"个人普卡","bankCardProduct":"","bankCardProvince":"北京市","bankHq":"中国银行","bankName":"中国银行","bankOrgNo":"01040000"}
            // this.bankcardBin = res.data.data
            // this.isCreditCard = res.data.data.bankCardAttr!='借记卡'

            // console.log(this.isCreditCard)
            if(res.data.data.bankCardAttr!='借记卡'){
              this.$vux.toast.show({
               text: '不支持信用卡，请填写储蓄卡卡号',
               type: 'text',
               width: '80%'
              //  time: 15000
              });
              return
            }

            //检测银行卡号所属行与选择开户行是否为同一银行
            let bank = this.$refs.pickerBank.$el.getElementsByClassName('vux-popup-picker-value')
            let bankName = bank.length && bank[0].innerHTML
            // console.log(bankName)
            if(!~(bankName.indexOf(res.data.data.bankName))){
              this.$vux.toast.show({
               text: '银行卡号所属行与选择开户行不匹配',
               type: 'text',
               width: '80%'
              //  time: 15000
              });
              return
            }

            succb && succb()

          } else {
            this.$vux.toast.show({
              //  text: '获取银行卡城市失败',
               text: res.data.message,
               type: 'text',
               width: '80%'
             });
          }
        }).catch(err=>{
            this.$vux.toast.show({
               text: '获取银行卡城市失败',
               type: 'text',
               width: '80%'
             });
        })
      },
      onChange (val) {
        // console.log('val change', val)
      },
      onShow () {
        // console.log('on show')
      },
      onHide (type) {
        // console.log('on hide', type)
      },
      customTrim (x) {
        return x.replace(/^\s+|\s+$/gm, '')
      },
      ageLimitValidate: function(birthday,limit){
        let days = (+new Date() - new Date(birthday))/86400000
        return days < limit ? 1:0
      },
      getBase64: function(src,cb,quality){
        let localData = ''
        wx.getLocalImgData({
          localId: src, // 图片的localID
          success: function (res) {
            localData = (res.localData+'').replace(/.*?base64,/,'') // localData是图片的base64数据，可以用img标签显示
            // alert(localData)
            cb && cb(localData)
          }
        });
        // if (localData.localData){cb && cb(localData.localData);return}
        // let img = this.$refs.hideimg
        // let canvas = document.createElement('canvas')
        // let ctx = canvas.getContext('2d')
        // img.onload = function() {
        //   alert('loaded')
        //   try {
        //     let w = this.width
        //     let h = this.height
        //     canvas.width = w
        //     canvas.height = h
        //     ctx.drawImage(this, 0, 0, w, h)
        //     alert('loaded')
        //     let dataUrl = canvas.toDataURL('image/jpeg')
        //     alert(dataUrl)
        //     cb && cb(dataUrl)
        //   } catch (e) {
        //     alert(e)
        //   } finally {
        //
        //   }
        // }
        // img.src = src
      },
      restore: function(){
        // data
        let sessionKey = 'order_input_'+this.$route.params.productcode
        if(window.sessionStorage){
          // console.log(sessionStorage.getItem(sessionKey))
          if(sessionStorage.getItem(sessionKey)){
            let data = JSON.parse(sessionStorage.getItem(sessionKey))
            for(let prop in data){
              this[prop] = data[prop]
            }
            // console.log(data)
          }
          // sessionStorage.setItem(sessionKey,JSON.stringify(this.data1))
        }
        this.pcode = this.$route.params.productcode || ''
        this.price = this.$route.query.price || '0.00'
      },
      store: function(){
        // if(this.pcode != this.$route.params.productcode){
        //   for(let prop in data1){
        //     this[prop] = data1[prop]
        //   }
        // }
        let sessionKey = 'order_input_'+this.pcode
        if(window.sessionStorage){
          // if(sessionStorage.getItem(sessionKey)){
          //   let data =  JSON.parse(sessionStorage.getItem(sessionKey))
          //   for(let prop in data)){
          //     this[prop] = data[prop]
          //   }
          // }
          // console.log(this.$data)
          !this.clearSession && sessionStorage.setItem(sessionKey,JSON.stringify(this.$data))
        }
        // this.pcode = this.$route.params.productcode || ''
        // this.price = this.$route.query.price || '0.00'
        // console.log(this.$data)
        // console.log(this.price)
      },
      clearStore: function(){
        this.clearSession = true
        let sessionKey = 'order_input_'+this.pcode
        if(window.sessionStorage){
          if(sessionStorage.getItem(sessionKey)){
            sessionStorage.removeItem(sessionKey)
          }
        }
      },
      callCamera: function (event, cbname) {
        let cb = (img) => {
          this.axios.post(getIdcardInfo, {
            "image": img,
          },{cancelToken:source.token}).then(res=>{
            if(res.data && res.data.status == 'SUCCESS') {
              // console.log(event.target.id.replace('camera_','')+'name')
              this[event.target.id.replace('camera_','')+'name'] = res.data.data.certiName
              this[event.target.id.replace('camera_','')+'idcard'] = res.data.data.certiNo
              //
              // console.log(event.target.id)
              // this.$router.push({name:'authsucc'})
            } else {
              this.$vux.toast.show({
                 text: res.data.message,
                 type: 'text',
                 width: '80%'
              });
            }
          }).catch(err=>{})
        }
        if(cookie.get('http_ostype')) {
          window.photocb = (img)=>{
            cb(img)
          }
          this.jsbridge.callCamera(cbname)
        }else if (this.uaDetector && this.uaDetector.inWechat) {
          //let wx = this.$wechat
          let self = this
          wx.ready(() => {
            //alert('com ready')
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                self.getBase64(res.localIds[0],cb)
              }
            })
          })
        }
      },
      getBirthday (idcard) {
        return tool.getBirthday(idcard)
      },
      getAge (idcard) {
        return tool.getAge(idcard)
      },
      getGender (idcard) {
        // console.log(idcard)
        if(!idcard){return}
        let gender = tool.getGender(idcard) == '男'?'M':'F'
        return gender
      },
      // closeSelectpage () {
      //    this.selectpageShow = false
      // },
      // closeSelectpage2 () {
      //    this.selectpageShow2 = false
      // },
      getSelectpageData (param) {
        // console.log(this.$router.history.current.name)
        let scrollH = document.querySelectorAll('.full-page')[0].scrollTop+''
        // console.log(this.$router)
        // console.log(this.$route)
        this.$router.push({name:'selectjob',query:{id:param.id,source:this.$router.history.current.path,scroll:scrollH,version:this.version}})
        //  console.log(val)
        //  this.insurerjob = val
        //  this.selectpageShow = false
      },
      // getSelectpageData2 (val) {
      //   //  console.log(val)
      //    this.recognizeejob = val
      //    this.selectpageShow2 = false
      // },
      init () {
        // let sessionKey = 'order_input_'+this.$route.params.productcode
        // if(window.sessionStorage){
        //   // console.log(sessionStorage.getItem(sessionKey))
        //   if(sessionStorage.getItem(sessionKey) != 'undefined'){
        //     let data = JSON.parse(sessionStorage.getItem(sessionKey))
        //     console.log(data.bankList)
        //   }
        // }
        // if(!this.bankList.length){
        let loadBankList = (proposalId)=>{
          this.axios.get(getDebitCardListApi+proposalId,{
            cancelToken:source.token
          }).then((response) => {
            if(response.data.status != 'SUCCESS'){
              let toastConf = {
               type: 'text',
               width: '80%',
               isShowMask: true,
               text: '获取银行信息失败，稍后再试',
              //  time: 150000
              }
              this.$vux.toast.show(toastConf)
              return
            }
            let datas = response.data && response.data.data
            let arr = []
            if(datas){
              datas.forEach((data)=>{
                arr.push({value:data.bankCode,name:data.bankName,parent:0})
              })
            }
            this.bankList = arr
            // console.log(this.bankList)
            // store.set('banklist', response.data.data)
          }, (response) => {
          }).catch((err) => console.log(err))
        }

        let loadDistrictList = ()=>{
          let checkLocalRegion = store.get('region')
          if(checkLocalRegion && checkLocalRegion.length){
            this.districtList = checkLocalRegion
            // console.log(checkLocalRegion)
            // console.log(this.districtList)
            this.cityList = checkLocalRegion.filter((item) => {
              return item.parent <= 31
            })
          }
          else{
            this.axios.get(getRegionApi,{
              cancelToken:source.token
            }).then((response) => {
              console.log(typeof response.data.data)

              this.districtList = response.data.data
              console.log(response.data.data)
              store.set('region', response.data.data)
              this.cityList = response.data.data.filter((item) => {
                return item.parent <= 31
              })
            }, (response) => {
            }).catch((err) => console.log(err))
          }
        }


        // 未承保保单 id 恢复保单暂存信息
        let policyRequestVO = this.$route.query.id

        if(!policyRequestVO) {
          this.restore()
          this.insurerincomesourcePopShow = false
          this.recognizeeincomesourcePopShow = false
          this.addAssuredPopShow = false
          loadBankList(this.proposalId)
          loadDistrictList()
          this.setCareer()
        }
        else {
          // console.log(this.$store.getters.getVisitedDictionary)
          //从字典路由进入 不重载暂存保单信息数据
          if(this.$store.getters.getVisitedDictionary){
            this.restore()
            this.setCareer()
            this.$store.commit(types.VISITEDDICTIONARY,{flag:false})
            return
          }
          this.axios.post(policyDetailApi,{id:policyRequestVO},{
            cancelToken:source.token
          }).then((response) => {
            if(response.data.status != 'SUCCESS'){
              let toastConf = {
               type: 'text',
               width: '80%',
               isShowMask: true,
               text: '获取暂存信息失败',
              //  time: 150000
              }
              this.$vux.toast.show(toastConf)
              return
            }
            let datas = response.data && response.data.data
            if(!!datas.policyJson){
              let data = JSON.parse(datas.policyJson)
              for(let prop in data){
                if(prop != 'districtList'){
                  //获取暂存数据，注意异步修改data的顺序
                  this[prop] = data[prop]
                }
              }
            }
            loadBankList(this.proposalId)
            loadDistrictList()
            this.setCareer()
            // let arr = []
            // if(datas){
            //   datas.forEach((data)=>{
            //     arr.push({value:data.bankCode,name:data.bankName,parent:0})
            //   })
            // }
            // this.bankList = arr
            // console.log(this.bankList)
            // store.set('banklist', response.data.data)
          }, (response) => {}).catch((err) => console.log(err))
        }
      // }


        // console.log(this.districtList)
        switch (this.pcode) {
          case 'ZA0003':
            this.prodname = '美泰人生重大疾病保险'
            break;
          case 'ZA0002':
            this.prodname = '长城康健人生两全保险'
            break;
          default:
        }
        // console.log(this.pcode)
      },
      // 获取产品初始化信息
      // getData () {
      //   this.axios.post(orderApi, {'productId': 'AA01201704272122550000000004'}).then((response) => {
      //     // this.applicant = response.data.value.content.applicant
      //   }, (response) => {
      //   }).catch((err) => console.log(err))
      // },
      // 关闭关系选择弹窗回调
      onHideRelationPopup () {
        // console.log(this.relationValue)
      },
      gotoPay () {
        this.validate()
      },
      postTrial (cb) {
        let form = {
          age: this.recognizeeage,  //年龄
          sex: this.recognizeegender,  //性别
          proposalId: this.proposalId,
          // insuranceDuration: this.protectionDate?this.protectionDateValue:null,  //保障期限
          // paymentPeriod: this.paymentDate,  //缴费年限
          // wishBirthday: this.expenseDate,  //领取祝寿金
          // insuredAmount: this.coverage,  //保额
          productId: this.$route.params.productcode  //产品代码
        }
        // if(form.productId == 'ZA0002'){
          let insurerbirthday = tool.getBirthday(this.insureridcard)
          form.insuredAge = tool.getAge(insurerbirthday)
          form.insuredSex = tool.getGender(insurerbirthday)=='男'?'M':'F'
        // }
        if(form.productId == 'ZA0003'){
          form.ageLimit = this.ageLimitValidate(tool.getBirthday(this.recognizeeidcard),28)
        }else{
          delete form.ageLimit
        }
        // console.log(JSON.stringify(xform))
        this.axios.post(trialApi, form, {cancelToken:source.token}).then((response) => {
          let data = response.data
          var st = data && data.status
          if(st != 'SUCCESS'){
            this.$vux.toast.show({
             text: data.message,
             type: 'text',
             width: '80%'
            //  time: 15000
            });
            return
          }
          this.price = data.data.rate
          cb && cb()
          // this.items = response.data.resultContent.items
          // for (var i = 0; i < t.length; i++) {
          //   this.m = t[i].title
          // }
        }, (response) => {
        }).catch((err) => console.log(err))
      },
      mathPre(){
        if(!this.insuredBirthday){
          return
        }
        // this.axios.post(trialInitialApi,
        //   {'productCode':this.productCode,'birthday':this.insuredBirthday},
        // )
      //  .then((response) => {
      //    if(response.data.resultFlag){
      //       this.price = response.data.resultContent
      //       // this.loadStatus = !this.loadStatus
      //    }else{
      //      this.$vux.toast.show({
      //       text: response.data.resultMsg || '请输入正确的投保信息',
      //       type: 'text',
      //       width: '80%'
      //      //  time: 15000
      //      });
      //     //  this.loadStatus = !this.loadStatus
      //    }
      //  },(response)=>{
      //     // this.loadStatus = !this.loadStatus
      //  })
      },
      cancelIncomesource () {
        this.insurerincomesourcePopShow = false
        // console.log(this.incomesource_temp_data)
        this.insurerincomesource = this.incomesource_temp_data?[...this.incomesource_temp_data]:null
        // console.log(this.insurerincomesource)
      },
      cancelIncomesource2 () {
        this.recognizeeincomesourcePopShow = false
        // console.log(this.incomesource_temp_data)
        this.recognizeeincomesource = this.incomesource_temp_data2?[...this.incomesource_temp_data2]:null
        // console.log(this.insurerincomesource)
      },
      toggleIdcardChecker () {
        // console.log(arguments)
        if(arguments[0]){
          this.insureridcardEnd = '长期有效'
        }
        else{
          this.insureridcardEnd = this.insureridcardEnd && this.insureridcardEnd !='长期有效'?this.insureridcardEnd:null
        }
      },
      toggleIdcardChecker2 () {
        // console.log(recognizee)
        if(arguments[0]){
          this.recognizeeidcardEnd = '长期有效'
        }
        else{
          this.recognizeeidcardEnd = this.recognizeeidcardEnd && this.recognizeeidcardEnd !='长期有效' ?this.recognizeeidcardEnd:null
          // this.recognizeeidcardEnd = null
        }
      },
      toggleBeneficiaryIdcardChecker () {
        if(arguments[0]){
          this.addInsuredidcardEnd = '长期有效'
        }
        else{
          this.addInsuredidcardEnd = null
        }
      },
      editAssured (params) {
        // console.log(this.assureds)
        this.assuredEditIndex = params.index
        this.assuredEditFlag = true
        this.relationList2.forEach((item,index)=>{
          if(item.name == params.relation){
            // console.log([...this.relationList2[index].value])
            this.assuredRelation = [...this.relationList2[index].value]
          }
          // console.log(this.assuredRelation)
        })
        this.assuredname = params.name
        this.assuredidcard = params.idcard
        this.assuredincome = params.income
        this.addInsuredidcardStart = params.idcardStart
        this.addInsuredidcardEnd = params.idcardEnd
        if(this.addInsuredidcardEnd == '长期有效') {
          this.addInsuredidcard_checker = true
        }
        // console.log(this.assureds)
        this.addAssuredPopShow = true
      },
      addAnAssured () {
        this.addAssuredPopShow = true
      },
      delAssured (){
        this.assureds.splice(this.assuredEditIndex,1)
        // console.log(this.assureds)
        this.addAssuredPopShow = false
      },
      validateAssuredForm (params) {
        // console.log(params.index)
        this.$validator.getErrors().errors = []
        let showMsg = ()=>{
          const msg = this.$validator.getErrors().errors[0].msg
          // console.log(msg)
          // console.log(this.$validator)
          this.$vux.toast.show({
           text: msg,
           type: 'text',
           width: '80%'
          //  time: 15000
          });
        }
        this.$validator.attach('assuredRelation', 'required',{ prettyName: '选择受益人和被保人关系' })
        if(!this.$validator.validate('assuredRelation', this.assuredRelation[0])){
          showMsg()
          return
        }
        this.$validator.attach('assuredname', 'required|cnname',{ prettyName: '填写受益人姓名' })
        if(!this.$validator.validate('assuredname', this.assuredname)){
          showMsg()
          return
        }
        this.$validator.attach('assuredidcard', 'required|idcard',{ prettyName: '填写受益人身份证' })
        if(!this.$validator.validate('assuredidcard', this.assuredidcard)){
          showMsg()
          return
        }
        this.$validator.attach('addInsuredidcardStart', 'required',{ prettyName: '选择证件有效开始日期' })
        if(!this.$validator.validate('addInsuredidcardStart', this.addInsuredidcardStart)){
          showMsg()
          return
        }
        this.$validator.attach('addInsuredidcardEnd', 'required',{ prettyName: '选择证件有效截止日期' })
        if(!this.$validator.validate('addInsuredidcardEnd', this.addInsuredidcardEnd)){
          showMsg()
          return
        }
        this.$validator.attach('assuredincome', 'required|between:1,100',{ prettyName: '填写受益比例' })
        if(!this.$validator.validate('assuredincome', this.assuredincome)){
          showMsg()
          return
        }
        if(this.pcode=='ZA0003'){
          this.$validator.attach('assuredmobile', 'required|mobile',{ prettyName: '填写受益人手机号' })
          if(!this.$validator.validate('assuredmobile', this.assuredmobile)){
            showMsg()
            return
          }
        }

        //编辑受益人确认按钮
        //验证：限制配偶和父母数量
        let relationLimited1 = 0
        let relationLimited2 = 0
        this.assureds.forEach((item)=>{
          //父母
          if(item.relationVal == 1){
            relationLimited1++
          }
          //配偶
          if(item.relationVal == 2){
            relationLimited2++
          }
        })

        let assuredObj = {
          name: this.assuredname,
          idcard: this.assuredidcard,
          per: this.assuredincome,
          idcardStart: this.addInsuredidcardStart,
          idcardEnd: this.addInsuredidcardEnd,
          relationVal: this.assuredRelation[0]
        }
        if(this.pcode == 'ZA0003'){
          assuredObj.mobile = this.assuredmobile
        }

        this.relationList2.find((item, index, arr)=>{
          // console.log(item.value)
          // console.log(this.assuredRelation)
          if(item.value == this.assuredRelation[0]){
            assuredObj.relation = item.name
            return index
          }
        })

        if(this.assuredEditFlag){

          if(this.assureds[this.assuredEditIndex].relationVal != 1 && this.assuredRelation[0] == 1 && relationLimited1 > 1){
            this.$vux.toast.show({
             text: '请勿添加2个以上父母关系受益人',
             type: 'text',
             width: '80%'
            //  time: 15000
            })
            return
          }
          if(this.assureds[this.assuredEditIndex].relationVal != 2 && this.assuredRelation[0] == 2 && relationLimited2 > 0){
            this.$vux.toast.show({
             text: '请勿添加1个以上配偶关系受益人',
             type: 'text',
             width: '80%'
            //  time: 15000
            })
            return
          }

          this.assureds[this.assuredEditIndex] = assuredObj
          this.addAssuredPopShow = false
          this.addInsuredidcard_checker = false
          // console.log(this.assureds)
        }
        //新增受益人确认按钮
        else{
          if(this.assureds.length){
            let validate = true
            this.assureds.forEach((item,idx)=>{
              if(assuredObj.idcard == item.idcard){
                this.$vux.toast.show({
                 text: '请勿重复添加同一个受益人',
                 type: 'text',
                 width: '80%'
                //  time: 15000
                })
                validate = false
                return
              }
            })

            if(this.assuredRelation[0] == 1 && relationLimited1 > 1){
              this.$vux.toast.show({
               text: '请勿添加2个以上父母关系受益人',
               type: 'text',
               width: '80%'
              //  time: 15000
              })
              return
            }
            if(this.assuredRelation[0] == 2 && relationLimited2 > 0){
              this.$vux.toast.show({
               text: '请勿添加1个以上配偶关系受益人',
               type: 'text',
               width: '80%'
              //  time: 15000
              })
              return
            }
            if(validate){
              this.assureds = [...this.assureds,assuredObj]
            }
            this.addAssuredPopShow = false
            this.addInsuredidcard_checker = false
          }else{
            this.assureds =  [...this.assureds,assuredObj]
            this.addAssuredPopShow = false
            this.addInsuredidcard_checker = false
          }
        }
      },
      validate () {
        const self = this
        let showMsg = ()=>{
          const msg = this.$validator.getErrors().errors[0].msg
          // console.log(msg)
          // console.log(this.$validator)
          this.$vux.toast.show({
           text: msg,
           type: 'text',
           width: '80%'
          //  time: 15000
          });
        }
        this.$validator.validateAll().then(success => {
          // console.log(this.$validator)
            if (! success) {
              showMsg()
                // handle error
                // console.log(this.errors)
                // console.log(this.errors.all())
                // const msg = this.errors.all()[0];
                // // this.$vux.confirm.show({
                // //   // 组件除show外的属性
                // //   title:msg,
                // //   onCancel () {},
                // //   onConfirm () {}
                // // })
                // this.$vux.toast.show({
                //  text: msg,
                //  type: 'text',
                //  width: '80%'
                // //  time: 15000
                // });
                // console.log(this.errors.all())
                // this.$validator.fieldBag().errors = []
                return;
            }

            this.$validator.getErrors().errors = []

            if(this.legalAssured && !this.assureds.length){
              this.$vux.toast.show({
               text: '请填写指定受益人信息',
               type: 'text',
               width: '80%'
              //  time: 15000
              });
              return
            }

            if(!this.proposalCodePaper){
              this.$vux.toast.show({
               text: '请填写投保确认书编号',
               type: 'text',
               width: '80%'
              //  time: 15000
              });
              return
            }

            this.$validator.attach('bankValue', 'required',{ prettyName: '选择开户银行' })
            if(!this.$validator.validate('bankValue', this.bankValue)){
              showMsg()
              return
            }

            this.$validator.attach('bankcard', 'required',{ prettyName: '填写银行卡号' })
            if(!this.$validator.validate('bankcard', this.bankcard)){
              showMsg()
              return
            }

            this.$validator.attach('bankPlaceValue', 'required',{ prettyName: '选择开户行所在城市' })
            if(!this.$validator.validate('bankPlaceValue', this.bankPlaceValue)){
              showMsg()
              return
            }

            this.$validator.attach('bankcardname', 'required|cnname',{ prettyName: '填写持卡人姓名' })
            if(!this.$validator.validate('bankcardname', this.bankcardname)){
              showMsg()
              return
            }

            if(this.customTrim(this.bankcardname) != this.customTrim(this.insurername)){
              this.$vux.toast.show({
               text: '持卡人非投保人本人',
               type: 'text',
               width: '80%'
              //  time: 15000
              });
              return
            }

            // console.log(this.checkAT)
            if(!this.checkAT){
              this.$vux.toast.show({
               text: '请勾选产品条款和投保须知',
               type: 'text',
               width: '80%'
              //  time: 15000
              });
              return
            }

            this.getCardBin(()=>{this.postOrder()})

        })
      },
      composeForm() {
        xform.id = this.$route.query.id
        xform.productCode = this.$route.params.productcode
        //投保人
        xform.proposalId = this.$route.query.proposalId
        xform.insured.annualIncome = this.insurerannualincome
        xform.insured.birthday = tool.getBirthday(this.insureridcard)
        xform.insured.caddress = this.insureraddress
        xform.insured.cname = this.customTrim(this.insurername)
        xform.insured.gender = this.getGender(this.insureridcard)
        xform.insured.height = this.insurerheight
        xform.insured.idno = this.insureridcard
        xform.insured.idperiod = this.insureridcardEnd=='长期有效'?'2999-12-31':this.insureridcardEnd
        xform.insured.incomeSource = this.insurerincomesourceVal
        // console.log(this.insurerincomesourceVal)
        xform.insured.mailbox = this.insureremail
        xform.insured.phone = this.insurermobile
        xform.insured.jobTitle = this.insurerjob && this.insurerjob[0]
        xform.insured.profession = this.insurerjob && this.insurerjob[1]
        xform.insured.professionLv = this.insurerjob && this.insurerjob[2]
        // xform.insured.relation = this.insurerrelation
        xform.insured.telephone = this.insurertel
        xform.insured.weight = this.insurerweight
        xform.insured.zipcode = this.insurerzipcode
        xform.insured.maritalStatus = this.insurermarry && this.insurermarry[0]
        xform.insured.education = this.insureredu[0]

        // let arrInsuredDistrictVal = this.$refs.pickerDistrict1 && this.$refs.pickerDistrict1.getNameValues().split(' ')
        let arrInsuredDistrict = this.$refs.pickerDistrict1.$el.getElementsByClassName('vux-popup-picker-value')
        let arrInsuredDistrictVal = arrInsuredDistrict.length && arrInsuredDistrict[0].innerHTML.split(' ')
        // console.log(arrInsuredDistrictVal)
        // let arrInsuredDistrictName = this.$refs.pickerDistrict1 && this.$refs.pickerDistrict1.getNameNames()

        xform.insured.province = arrInsuredDistrictVal && arrInsuredDistrictVal[0]
        xform.insured.city = arrInsuredDistrictVal && arrInsuredDistrictVal[1]
        xform.insured.town = arrInsuredDistrictVal && arrInsuredDistrictVal[2]
        xform.insured.provinceCode = this.insurerdistrict[0]
        xform.insured.cityCode = this.insurerdistrict[1]
        xform.insured.townCode = this.insurerdistrict[2]
        xform.insured.company = this.insurercompany

        //被保人
        xform.beInsured.relation = this.insurerrelation[0]
        if(this.insurerrelation != 0){
          xform.beInsured.height = this.recognizeeheight
          xform.beInsured.weight = this.recognizeeweight
          xform.beInsured.annualIncome = this.recognizeeannualincome
          xform.beInsured.birthday = tool.getBirthday(this.recognizeeidcard)
          xform.beInsured.caddress = this.recognizeeaddress
          xform.beInsured.cname = this.customTrim(this.recognizeename)
          xform.beInsured.gender = this.getGender(this.recognizeeidcard)
          xform.beInsured.idno = this.recognizeeidcard
          xform.beInsured.idperiod = this.recognizeeidcardEnd=='长期有效'?'2999-12-31':this.recognizeeidcardEnd
          xform.beInsured.incomeSource = this.recognizeeincomesourceVal
          xform.beInsured.mailbox = this.recognizeeemail
          xform.beInsured.phone = this.recognizeemobile
          xform.beInsured.jobTitle = this.recognizeejob && this.recognizeejob[0]
          xform.beInsured.profession = this.recognizeejob && this.recognizeejob[1]
          xform.beInsured.professionLv = this.recognizeejob && this.recognizeejob[2]
          xform.beInsured.telephone = this.recognizeetel
          xform.beInsured.zipcode = this.recognizeezipcode
          xform.beInsured.maritalStatus = this.recognizeemarry && this.recognizeemarry[0]
          xform.beInsured.education = this.recognizeeedu[0]
          // let arrBeinsuredDistrictVal = this.$refs.pickerDistrict2 && this.$refs.pickerDistrict2.getNameValues().split(' ')
          let arrBeinsuredDistrict = this.$refs.pickerDistrict2.$el.getElementsByClassName('vux-popup-picker-value')
          let arrBeinsuredDistrictVal = arrBeinsuredDistrict.length && arrBeinsuredDistrict[0].innerHTML.split(' ')
          // let arrInsuredDistrictName = this.$refs.pickerDistrict1 && this.$refs.pickerDistrict1.getNameNames()

          xform.beInsured.province = arrBeinsuredDistrictVal && arrBeinsuredDistrictVal[0]
          xform.beInsured.city = arrBeinsuredDistrictVal && arrBeinsuredDistrictVal[1]
          xform.beInsured.town = arrBeinsuredDistrictVal && arrBeinsuredDistrictVal[2]
          xform.beInsured.provinceCode = this.recognizeedistrict[0]
          xform.beInsured.cityCode = this.recognizeedistrict[1]
          xform.beInsured.townCode = this.recognizeedistrict[2]
          xform.beInsured.company = this.recognizeecompany
        }

        //银行卡
        xform.bankCode = this.bankValue// 银行code
        xform.bankCard = this.bankcard// 卡号
        xform.bankProvinceCode = this.bankPlace[0]
        xform.bankCityCode = this.bankPlace[1]
        let arrBankDistrict = this.$refs.pickerBankPlace.$el.getElementsByClassName('vux-popup-picker-value')
        let arrBankDistrictVal = arrBankDistrict.length && arrBankDistrict[0].innerHTML.split(' ')
        xform.bankProvince = arrBankDistrictVal[0]
        xform.bankCity = arrBankDistrictVal[1]
        // console.log(xform.bankProvince)
        // console.log(xform.bankCity)
        xform.cardHolder = this.customTrim(this.bankcardname)
        //建议书id
        xform.proposalId = this.$route.query.proposalId
        // xform.tenantId = this.$route.query.tenantId
        xform.userId = userid

        //受益人
        xform.beneficiarys = []
        // console.log(this.legalAssured)
        if(this.legalAssured){
          this.assureds.forEach((item)=>{
            // console.log(item)
            // console.log({beneficiaryName:item.name,idno:item.idcard,benefitsRate:item.per,endPeriod:item.idcardEnd=='长期有效'?'2999-12-31':item.idcardEnd,relationship:item.relationVal})
            xform.beneficiarys.push({beneficiaryName:item.name,idno:item.idcard,benefitsRate:item.per,endPeriod:item.idcardEnd=='长期有效'?'2999-12-31':item.idcardEnd,relationship:item.relationVal,benefitsPhone:item.mobile})
          })
        }else{
          xform.beneficiarys = []
        }
        // console.log(xform.beneficiarys)
        xform.prem = this.price
        xform.proposalCodePaper = this.proposalCodePaper
      },
      postOrder () {
        //提交表单
        if(!canPostOrder){
          return
        }
        if(canPostOrder){
          canPostOrder = false
        }
        this.axios.defaults.timeout = 60000
        //处理form
        this.composeForm()
        let policyJson = {...this.$data}
        // delete policyJson.districtList
        policyJson.districtList = []
        // delete policyJson.bankList
        let form = {...xform,policyJson:JSON.stringify(policyJson)}
        // console.log(checkOrder)
        this.axios.post(checkOrder, form, {cancelToken:source.token}).then((response) => {
          // console.log(response)
           canPostOrder = true
           this.axios.defaults.timeout = 6000
           let t = response.data && response.data.status == "SUCCESS"
           if(t){
            //  this.clearStore()
             let r = {
               path:'/uploadIdentity',
               query:{
                //  productcode:this.pcode,
                 policyId:response.data.data.proposalCode,
                 insurerName:this.insurername,
                 bankcard:this.bankcard.slice(-4),
                 proposalCode:response.data.data.proposalCode
               }
             }
            //  console.log(this.recognizeename)
             if(!!this.recognizeename){
               r.query.recognizeeName = this.recognizeename
             }
             this.$router.push(r)
           }
           else{
             this.$vux.toast.show({
               text: response.data.message || '',
               type: 'text',
               width: '80%'
              //  time: 15000
             })
           }
        }, (response) => {
           canPostOrder = true
        }).catch(
          (err) => {
           canPostOrder = true
           console.log(err)
          }
        )
      }
      // nextStep () {
        // this.postData()
      // },
    },
    watch: {
      insurername(val){
        this.bankcardname = val
      },
      insureridcard(val){
        if(this.relationValue == 0){
          this.$validator.attach('insidcard', 'required|idcard')
          if(!this.$validator.validate('insidcard', val)){
            return
          }
          this.recognizeeageidcard = val
          this.recognizeeage = this.getAge(this.getBirthday(val))
          // console.log(this.recognizeeage)
          this.recognizeegender = this.getGender(val)
          this.postTrial()
        }
      },
      recognizeeidcard(val){
        this.$validator.attach('recidcard', 'required|idcard')
        if(!this.$validator.validate('recidcard', val)){
          return
        }
        this.recognizeeage = this.getAge(this.getBirthday(val))
        // console.log(this.recognizeeage)
        this.recognizeegender = this.getGender(val)
        this.postTrial()
      },
      bank(){
        xform.bankName = this.$refs.pickerBank.getNameValues()
        // xform.bankCode = this.bankValue
        // console.log(this.bankValue)
      },
      insuredBirthday(){
        this.mathPre()
      },
      insureridcardEnd(val){
        if(val!='长期有效'){
          // console.log(val)
          this.insurer_idcard_checker = false
          this.insureridcardEnd = val
        }
      },
      addAssuredPopShow(val){
        if(!val){
          //reset pop vmodel
          this.assuredRelation = []
          this.assuredname = ''
          this.assuredidcard = ''
          this.assuredincome = ''
          this.addInsuredidcardStart = null
          this.addInsuredidcardEnd = null
          this.addInsuredidcard_checker = false
          this.assuredEditFlag = false
          //reset relation pop style
          this.relationList2 = [
            {name:'父母',value:'1',parent:0},
            {name:'配偶',value:'2',parent:0},
            {name:'子女',value:'3',parent:0}
          ]
        }
        // console.log(this.assuredRelation)
      },
      recognizeeidcardEnd(val){
        if(val!='长期有效'){
          this.recognizee_idcard_checker = false
          this.recognizeeidcardEnd = val
        }
      },
      insurerincomesourcePopShow(val){
        if(val) this.incomesource_temp_data = [...this.insurerincomesource]
        // console.log(this.incomesource_temp_data)
      },
      recognizeeincomesourcePopShow(val){
        if(val) this.incomesource_temp_data2 = [...this.recognizeeincomesource]
        // console.log(this.incomesource_temp_data)
      },
      legalAssured(val){
        if(!val){
          // this.assureds = []
          xform.beneficiarys = []
        }
      },
      relationValue(val){
        // console.log(val)
        if(val == 0){
          this.recognizeeage = null
          this.recognizeegender = null
          this.recognizeename = ''
          this.recognizeeidcard = null
          this.recognizeeidcardStart = null
          this.recognizeeidcardEnd = null
          this.recognizee_idcard_checker = false
          this.recognizeemobile = null
          this.recognizeetel = null
          this.recognizeeemail = null
          this.recognizeejob = null
          this.recognizeedistrict = []
          this.recognizeedistrictList = []
          this.recognizeeaddress = ''
          this.recognizeezipcode = ''
          this.recognizeeincomesource = []
          this.recognizeeincomesourcePopShow = false
          this.recognizeeannualincome = ''
          this.recognizeeheight = null
          this.recognizeeweight = null
        }
      }
    },
    components: {
      Popup, PopupPicker, Datetime, Checker, CheckerItem, Group, Cell, Cellbox, XSwitch
    }

  }
</script>

<style lang='scss' rel="stylesheet/scss">
  @import '~assets/scss/function';
  .page-order{
    background-color: #f6f6f6;
    min-height: 100%;
    padding-bottom: 50px;
    .tit{
      background-color: #f6f6f6;
      padding-left: 15px;
      line-height: 38px;
      font-size: rem-calc(14px);
    }
    .weui-cells{
       .weui-cell_access .weui-cell__ft:after {
        content: " ";
        display: inline-block;
        height: rem-calc(8px);
        width: rem-calc(8px);
        border-width: 1px 1px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        top: rem-calc(-2px);
        position: absolute;
        top: 50%;
        margin-top: rem-calc(-5px);
        right: rem-calc(2px);
      }
      &:first-of-type{
        margin-top: 0;
      }
      &:last-of-type:after{
        display: none;
      }
      &:after{
        left: 15px;
      }
    }
    .weui-cell{
      .vux-datetime:before{
        display: none;
      }
      .vux-cell-box:before{
        display: none;
      }
      .weui-cell{
        padding: 0;
      }
    }
    .h2{
      color: #999;
      font-size: rem-calc(15px);
      padding-left: 15px;
      line-height: 42px;
      background-color: #fff;
      margin-top: 10px;
      position: relative;
      &.mt0{
        margin-top: 0;
      }
      .submark{
        position: absolute;
        right: 15px;
        font-size: rem-calc(12px);
        text-align: right;
        color: #999;
      }
    }
    .agreement {
        color: #666;
        font-size: 0.92857rem;
        margin-top:10px;
    }
    .item{
      // width: 18rem;
      line-height: 22px;
    }
    .icon{
      width: 17px;
      height: 17px;
      background-repeat: no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      background-position: center center;
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      margin-top: -2px;
    }
    @for $i from 1 through 5{
      .icon-#{$i}{
        background-image: url(~assets/image/insure/icon#{$i}.png);
      }
    }
    .ui-input{
      // width: 80%;
    }
    .ui-input input{
      padding: 10px 0 14px;
      text-align: right;
      margin: -12px 0 -12px;
    }
    .ui-scaner{
      // width: 40%;
      box-sizing: border-box;
      &:before{
        content: '|';
        // margin-left: -1rem;
        margin: 0 rem-calc(10px);
        color: #ddd;
      }
    }
    .addAssured{
      &:before{
        left: 0;
      }
    }
    .btn-addAssured{
      color: #00bd96;
      text-align: center;
      font-size: rem-calc(14px);
      width: 100%;
      &:before{
        content: '+';
        display: inline-block;
        vertical-align: middle;
        margin-top: -4px;
        margin-right: 4px;
      }
    }
    .limited{
      line-height: 46px;
      position: relative;
      text-align: center;
      color: #999;
      span{
        font-size: rem-calc(12px);
      }
      &:before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #eee;
        color: #eee;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        }
    }
  }
  .w60per{
      // width: 60%;
  }
  .s_checker{
    // width: 40%;
    .c-checker{
      line-height: normal;
    }
    .ui-checkbox{
      width: auto;
      height: auto;
      line-height: normal;
      .ui-checkbox-widget{
        width: 1rem;
        height: 1rem;
        background-size: 1rem;
        &:before{
          border-color: #00bd96;
        }
      }
    }
    &:before {
        content: '|';
        margin: 0 rem-calc(10px);
        color: #ddd;
    }
    float: right;
    color: #00bd96;
    font-size: rem-calc(14px);
  }
  .ui-pop{
    background-color: #fff;
    .checker{
      width: 22%;
      display: inline-block;
      vertical-align: middle;
      margin: rem-calc(8px) 4% rem-calc(7px) 0;
      text-align: center;
      line-height: rem-calc(25px);
      height: rem-calc(25px);
      color: #666;
      background-color: #f5f5f5;
      font-size: rem-calc(12px);
      border-radius: 2px;
      box-sizing: border-box;
      &.active{
        color: #06c49c;
        border: 1px solid #06c49c;
        background: none;
      }
      &:nth-of-type(4n){
        margin-right: 0;
      }
    }
    .weui-cells{
      &:first-of-type{
        margin-top: 0;
      }
      &:last-of-type:after{
        display: none;
      }
      &:after{
        left: 15px;
      }
    }
    .weui-cell{
      .vux-cell-box:before{
        display: none;
      }
      .weui-cell{
        padding: 0;
      }
    }
    .item{
      line-height: 22px;
      // width: 18rem;
      input{
        padding: 10px 0 14px;
        text-align: right;
        margin: -12px 0 -12px;
        &[type='checkbox']{
          margin: 0;
          padding: 0;
          transform: scale(2);
        }
      }
     .ui-scaner:before {
        content: '|';
        margin: 0 rem-calc(10px);
        color: #ddd;
      }
    }
    &-tit{
      height: 45px;
      line-height: 45px;
      background-color: #f5f5f5;
      text-align: center;
      font-size: rem-calc(17px);
      color: #333;
      position: relative;
    }
    &-lbtn,&-rbtn{
      color: #00bd96;
      font-size: rem-calc(15px);
      padding: 0 15px;
      position: absolute;
      top: 0;
      height: 100%;
    }
    &-lbtn{
      left: 0;
    }
    &-rbtn{
      right: 0;
    }
    &-btm{
      @include display-flex(horizontal);
      height: 45px;
      line-height: 45px;
      text-align: center;
    }
    &-del{
      width: 100px;
      color: #00bd96;
      font-size: rem-calc(12px);
      border-top: 1px solid #ddd;
      &:before{
        content: '';
        display: inline-block;
        vertical-align: middle;
        margin-right: 4px;
        width: 15px;
        height: 15px;
        margin-top: -2px;
        background: url(~assets/image/trash.png) 0 0 no-repeat;
        background-size: contain;
      }
    }
    &-ensure{
      flex: 1;
      background-image: linear-gradient( 90deg, rgb(108,217,182) 0%, rgb(54,210,159) 45%, rgb(0,203,135) 100%);
      height: 44px;
      font-size: rem-calc(17px);
      color: #fff;
    }
  }
  .weui-cell{
    .vux-datetime:before{
      display: none;
    }
  }
  .vux-popup-picker.vux-popup-bottom.vux-popup-dialog{
    // padding: 30px 0;
    background-color: #fff;
  }
  .fz12{
    font-size: rem-calc(12px)!important;
  }
  .fz14{
    font-size: rem-calc(14px)!important;
  }
  .fz16{
    font-size: rem-calc(16px)!important;
  }
  .assuredPer{
    margin: 0 rem-calc(6px) 0 rem-calc(18px);
    width: rem-calc(72px);
    display: inline-block;
  }

</style>
