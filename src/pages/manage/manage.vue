<template>
    <div>
        <header-bar></header-bar>
        <router-view></router-view>
    </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar';
export default {
    components: {
        HeaderBar
    }
}
</script>
<style scoped>
    
</style>