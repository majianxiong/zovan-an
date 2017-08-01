<template>
    <!--
        长城健康告知
    -->
    <div id="health">
        <div class="content">
            <p>1.{{a}}是否未停止吸烟？</p>
            <p>2.{{a}}是否未停止饮酒？</p>
            <p>3.{{a}}最近6个月内是否有下列情形：持续一周以上身体不适？</p>
            <div class="option">如乏力、消瘦（体重下降超过5公斤）、淋巴结肿大、便血。</div>
            <p>4.{{a}}最近6个月内是否有下列情形：接受过医师的诊察、治疗、用药、住院或手术建议？</p>
            <p>5.{{a}}是否有吸烟习惯？</p>
            <p>6.{{a}}是否有饮白酒习惯？</p>
            <p>7.{{a}}过去是否曾住院诊疗？</p>
            <p>8.{{a}}在过去两年内是否做过血压、血液化验、心电图、X光、B超、超声心动图、CT、核磁共振、内窥镜及活体组织检查？</p>
            <p>9.{{a}}是否曾经患有或因下列疾病而接受治疗？</p>
            <div class="option">哮喘、慢性支气管炎、支气管扩张、肺气肿、肺结核、肺动脉高压。</div>
            <p>10.{{a}}是否曾经患有或因下列疾病而接受治疗？</p>
            <div class="option">脑中风、短暂性脑缺血、癫痫、精神病、抑郁症、帕金森症、脑动静脉畸形、脑血管瘤。高血压、高胆固醇、高甘油三酯、冠心病、风湿性心脏病、主动脉瘤、心肌肥厚、心律失常、心脏杂音。
                肝炎、乙肝病毒携带、脂肪肝、肝硬化、消化道溃疡、结肠炎、慢性胃炎。血尿、蛋白尿、浮肿、肾炎、肾盂肾炎、肾病综合症、肾功能异常、肾衰竭、肾囊肿、泌尿系统结石、膀胱疾病、前列腺疾病或其他泌尿生殖系统疾病。
                肿瘤、癌症、囊肿、息肉或其他包块与肿物。糖尿病、甲状腺疾病、脑垂体疾病、肾上腺疾病。红斑狼疮、免疫缺陷病（艾滋病或艾滋病毒携带）、性传播疾病。眼、耳、鼻、喉部的疾病。贫血、白血病、血友病、淋巴瘤。关节炎、痛风、坐骨神经痛、瘫痪。
            </div>
            <p>11.{{a}}有无智能障碍?是否失明、聋哑、跛行、小儿麻痹后遗症？有无脊柱、胸廓、四肢、五官、手指、足趾畸形或功能障碍？</p>
            <p>12.{{a}}是否使用过任何成瘾药物,如镇静安眠剂、迷幻药、吸食有机溶剂或毒品？</p>
            <p>13.{{a}}家族史：父母、子女、兄弟姐妹中，是否有人患有脑中风、高血压、多囊肾、血友病、精神疾病及其他遗传性疾病？</p>
            <p>14.{{a}}家族史：直系亲属中，是否有60岁以前去世的？</p>
            <p>15.女性告知（未满14周岁免告知）：{{a}}现在是否怀孕？</p>
            <p>16.女性告知（未满14周岁免告知）：{{a}}是否患有或曾经患有子宫肌瘤、子宫内膜异位症、月经不调、异位妊娠、乳腺包块或肿块、不孕症等女性疾病？</p>
            <p>17.两周岁以下儿童（含两周岁）告知：{{a}}是否早产、难产？有无先天性疾病、遗传性疾病或畸形？有无体重不增或增长缓慢？</p>
            <p>18.{{a}}是否已购买或正在向其他保险公司申请购买（指提交投保申请但保险公司还未正式签单）人身保险合同？</p>
            <p>19.{{a}}在过去投保人身保险时，或在申请保全复效时，曾否被拒保、延期、加费、或对条款做特别约定，或申请过理赔？</p>
            <p>20.{{a}}是否曾向本公司或其他保险公司提出索赔申请？</p>
            <p>21.{{a}}是否有参加飞行、潜水、跳伞、武术、拳击、赛车等危险运动或有以上爱好？</p>
            <p>22.{{a}}在过去5年是否曾在其他国家或地区居住超过3个月？</p>
            <p>23.{{a}}您是否计划半年以内前往其他国家或地区？</p>
            <p>24.{{a}}是否持有有效机动车驾驶执照？</p>
            <p>25.{{a}}是否拥有公费医疗、社会医疗保险或其他费用补偿型医疗保险？</p>
            <p>26.{{a}}是否持有驾照？</p>
            <p>27.{{a}}本人或配偶名下有无车辆？</p>
            <p>28.{{a}}平时是否亲自驾驶车辆？</p>
            <p>29.{{a}}驾驶的车辆是否用于载人以外的其他用途？</p>
            <p>30.{{a}}驾驶的车辆是否属于载货汽车、越野汽车、自卸汽车、牵引车、专用汽车、客车（中型以上）、半挂车？</p>
            <p>31.{{a}}是否在其他保险公司购买过自驾车险？</p>
            <p>32.{{a}}名下是否借款？</p>
        </div>
        <c_footergroup btlname="至少有一项是" btrname="全部为否" @leftclick="lBtnCallback" @rightclick="rBtnCallback"></c_footergroup>
    </div>
</template>
<script>
  export default {
    name: 'healthZA0002',
    data () {
      return {
          a:'被保险人',   //  投保人、被保险人之一
      }
    },
    created () {
        console.log(this.$route.query.additionalRisk )
        if(this.$route.query.additionalRisk && this.$route.query.additionalRisk == true ){
            this.a = '投保人、被保险人之一'
        }else{
            this.a = '被保险人'
        }
    },
    methods: {
      lBtnCallback () {
        let toastConf = {
         type: 'text',
         width: '80%',
         isShowMask: true,
         text: '根据健康告知，您的情况不适合投保本保险',
        //  time: 150000
        }
        this.$vux.toast.show(toastConf)
      },
      rBtnCallback () {
        this.$router.push({path:'/order/'+this.$route.path.split('/')[2], query:{
          proposalId:this.$route.query.proposalId,
          price:this.$route.query.price,
          version:this.$route.query.version
        }})
      }
    },
    watch: {
    },
    components: {
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~src/assets/scss/function';
  #health{
      box-sizing:border-box;
      -webkit-box-sizing: border-box;
      width:100%;
      background:#f6f6f6;
      min-height:100%;
      &>.content{
          padding:rem-calc(15px);
          margin-bottom:rem-calc(50px);
          &>p{
              line-height:rem-calc(20px);
              margin-top:rem-calc(10px);
              font-size:rem-calc(16px);
              color:#999;
          }
          &>.option{
              line-height:rem-calc(20px);
              text-indent:2em;
              font-size:rem-calc(16px);
              color:#999;
          }
      }
  }

</style>
