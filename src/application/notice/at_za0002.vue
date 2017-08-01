<template>
    <div id="ccat">
        <group>
            <cell-box is-link link="mainatZA0002">
                长城健康人生两全保险条款
            </cell-box>
            <cell-box is-link link="fjatZA0002">
                长城附加健康人生提前给付重大...
            </cell-box>
            <cell-box is-link link="hmatZA0002">
                长城附加投保人豁免保险费重大...
            </cell-box>
        </group>
    </div>
</template>
<script>
import { CellBox ,Group} from 'vux'
export default {
    name:'atZA0002',
    data(){
        return{
           
        }
    },
    components:{
        CellBox,Group
    }
}
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
@import '~src/assets/scss/function';
    #ccat{
        margin-top:rem-calc(-12px);
        width:100%;
        height:100%;
        background:#f6f6f6;
    }
</style>


