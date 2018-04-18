<template>
     <drap-down left="100" width="488" class="drap-down" @hide="hideDrapDown($event)" v-if="isShow">
        <div class="areas-wrap">
            <div class="areas-divider" @click.prevent="resetCity($event)">
               <span class="divider-title">地址</span>
               <span class="divider-option" v-for="(name, index) in names">
                {{name.name}}
                <i class="divider-remove" 
                    :data-remove-index="index"
                    :data-remove-id="name.id"
                    >X</i>
               </span>
            </div>
            <div class="areas-item">
                <div @click.prevent="findCitys($event)">
                    <span 
                        class="areas-ceil"
                        :data-area-id="area.id"
                        :data-area-name="area.name"
                        v-for="area in areas">{{area.name}}</span>
                </div>
            </div>
        </div>
    </drap-down>
</template>
<script>
import DrapDown from './DrapDown';
import { mapGetters } from 'Vuex';

export default {
    name: 'areas',
    created () {
        
    },
    updated () {
        
    },
    mounted () {
        
    },
    data () {
        return {
            isShow: this.open,
            names: []
        }
    },
    methods: {
        hideDrapDown () {
            this.isShow = false;
            this.emitEvent(this.names);
            this.$store.dispatch('resetCity');
        },
        findCitys (ev) {

            let datas = this.getDatase(ev),
            id = datas.areaId,
            name = datas.areaName,
            names = [].concat(this.names);

            if(!id) return;
            
            if(this.areaSate.isNull) {
                names[this.names.length - 1] = {name, id};
            }else {
                names.push({name, id});
                this.$store.dispatch('findArea', { id });
            }

            this.names = names;
        },
        resetCity (ev) {
            let datas = this.getDatase(ev),
            index = datas.removeIndex,
            id = datas.removeId,
            names = [].concat(this.names);

            if(!id) return;
            
            if(+index){
                this.$store.dispatch('findArea', { id: names[index - 1].id });
            }else {
                this.$store.dispatch('initArea');
            }

            names =  names.slice(0, index);

            this.names = names;

            this.$store.dispatch('resetCity');
        },  
        getDatase (ev) {
            return ev.target.dataset;
        },
        emitEvent (data) {
            this.$emit('selectDone', data)
        }
    },
    watch: {
        open (n, o) {
            this.isShow = true;
            this.$store.dispatch('initArea');
            this.names = [];
        }
    },
    computed: {
         ...mapGetters(['areas', 'areaSate']),
         fullName () {
             return this.names.join(' ');
         }
    },
    props: ['open'],
    components: {
        DrapDown
    }
}
</script>
<style>
    .areas-wrap {
        padding: 20px;
        overflow: hidden;
    }
    .areas-divider {
        border-left: 3px solid #379bf8;
        padding-left: 10px;
        margin-bottom: 10px;
    }
    .areas-item {
        background: #fff;
        overflow: hidden;
        margin-bottom: 10px;
    }
    .areas-item div {
        background-color: #f0f0f0;
        padding: 10px 7px;
        overflow: auto;
        font-size: 0;
        margin-right: -16px;
    }
    .areas-ceil {
        line-height: 1.5;
        border: 1px solid #ddd;
        background-color: #fff;
        padding: 4px;
        display: inline-block;
        font-size: 18px;
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        user-select: none;
    }
     .areas-ceil:hover {
        background: #f0f0f0;
     }
     .divider-title {
         padding-right: 20px;
     }
     .divider-option {
         padding: 0 10px 0 10px;
         user-select: none;
         line-height: 1.5;
         text-decoration: underline;
     }
     .divider-remove {
         color: #999;
        font-family: Arial;
        font-size: 12px;
        cursor: pointer;
        user-select: none;
        opacity: .6;
        vertical-align: middle;
        line-height: 1;
        padding-left: 5px;
     }
     .divider-remove:hover {
         opacity: 1;
     }
</style>