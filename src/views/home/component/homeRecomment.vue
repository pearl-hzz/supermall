<template>
    <div class='recomment'>
        <div v-for='item in recomments' :key='item.acm' class="rcontain">
            <a :href="item.link">
                <img :src="item.image" alt="" width="100%">
                <div class="rtitle">{{item.title}}</div>
            </a>
        </div> 
    </div>
</template>

<script>
export default {
    name:  'recomment',
    props: {
        recomments:{
            type: Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {

        };
    },
    created() {

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
.recomment{
    display: flex;
    padding: 20px 0;
    border-bottom: 8px solid #eee;
}
.fixedH{
    position: fixed;
    top: 44px;
    left: 0;
}
.rcontain{
    flex: 1;
    margin: 0 10px;
}
a{
    text-align: center;
    color: #333;
    line-height: 25px;
}

</style>
