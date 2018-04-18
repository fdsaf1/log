<template>
    <div id="modal"  v-show="modalState">
        <transition name="fade">
            <div v-show="modalState" class="modal-background"></div>
        </transition>
        <div class="modal-dialog-wrap" @click="closeModal">
            <transition name="slider-top">
                 <div  v-show="modalState" class="modal-dialog" @click="$event.stopPropagation();">
                    <div class="modal-head" v-if="title">
                        <h1 class="modal-title">
                            {{title}}
                        </h1>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    name: 'modal',
    data () {
        return {
            modalState: false
        }
    },
    mounted(){
       this.initialModal();
    },
    methods : {
        initialModal () {

            let el = this.$el;
            let w = el.clientWidth, h = el.clientHeight;

            this.dialogStyle = {
                'line-height': h + 'px',
            }
        },
        setBodyHidden () {
            document.body.style.overflow = "hidden";
        },
        setBodyinitial () {
            document.body.style.overflow = "initial";
        },
        openModal () {
             this.modalState = true;
             this.setBodyHidden();
        },
        closeModal () {
             this.modalState = false;
             this.setBodyinitial();
        }
    },
    watch: {
        state (v, o) {
            this.openModal();
        }
    },
    computed: {
       
    },
    props: ['title', 'state']
}
</script>
<style scoped>
    #modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        bottom: 0;
        z-index: 500;
    }
    .modal-background {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: .5;
        z-index: 1;
    }
    .modal-dialog-wrap {
        overflow-y: scroll;
        position: relative;
        height: 100%;
        width: 100%;
        z-index: 2;
        text-align: center;
        font-size: 0;
    }
    .modal-dialog-wrap:after {
        display: inline-block;
        content: '&nbsp;';
    }
    .modal-dialog {
         text-align: left;
        display: inline-block;
        min-width: 400px;
        min-height: 250px;
        background-color: #fff; 
        vertical-align: middle;
    }
    .modal-head {
        border-bottom: 2px solid #ddd;
    }   
    .modal-title {
        text-align: center;
        font-size: 32px;
    }
    .modal-body {
        
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    .slider-top-enter {
        transition: transform 1s ease-in-out;
        transform: translate3d(0,-100%, 0);
    }
    .slider-top-enter-active {
         transform: translate3d(0, 0, 0);
    }
    .slider-top-leave {

    }
    .slider-top-leave-active {

    }
</style>