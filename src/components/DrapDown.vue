<template>
    <div id="drap-down" @click="clearBubble($event)" :style="{
        'top':   top ? top + 'px' :'39px',
        'width': width ? width + 'px'  : '294px',
        'left': left + 'px'
    }">
        <div class="drap-down-body">
           <slot></slot>
        </div>
        <div class="drap-down-footer clearfix">
            <button class="btn btn-light fr" @click.prevent="hide(true)">
                确认
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'drap-down',
    mounted () {
       let parentEl = this.$el.parentElement || this.$el.parentNode;
       parentEl.style.position = 'relative';
    },
    data () {
        return {
            
        }
    },
    methods: {
        clearBubble(ev) {
            // // console.log(ev);
            ev.stopPropagation();
            // ev.preventDefault();
            // return false;
        },
        hide (value) {
            this.$emit('hide', { data: value })
        },
    },
    destroyed () {
       
    },
    props: ['top', 'width', 'left']
}
</script>
<style scoped>
    #drap-down {
        width: 294px;
        position: absolute;
        margin-top: 10px;
        top: 39px;
        left: 0;
        z-index: 100;
        background-color: #fff;
        border: 1px solid #ccc;
        text-align: left;
    }
    .drap-down-footer {
        padding-top: 20px;
        padding-right: 30px;
        overflow: hidden;
    }
    .drap-down-footer .btn {
        width: 75px;
        height: 32px;
        font-size: 14px;
    }
</style>