<template>
    <div class='detail'>
        <detail-nav-bar></detail-nav-bar>
        <detail-swiper :topImages="topImages" />
    </div>
</template>

<script>
import detailNavBar from '../detail/detailCom/detailNavBar'
import detailSwiper from "./detailCom/detailSwiper";
import {getDetail} from 'network/detail'
export default {
    name:  'detail',
    data() {
        return {
            iid : null,
            topImages: null
        };
    },
    components:{
        detailNavBar,
        detailSwiper
    },
    created() {
        this.iid = this.$route.params.iid;
        getDetail(this.iid).then( res => {
            console.log(res)
            this.topImages = res.result.itemInfo.topImages
            console.log(this.topImages)
        })
    },
    watch: {

    },
    computed: {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped>

</style>
