<template>
    <div>
        <div 
            class="in-card" 
            v-for="connection in midiConnections" 
            v-bind:key="connection.id"
            :id="'m-'+connection.note"
        >
            <b>
                {{ connection.address }}
            </b>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapGetters } from "vuex"
    export default Vue.extend({
        name: 'ConnectionsMonitor',
        data() {
            return {}
        },
        computed: {
            ...mapGetters(['midiConnections']),
        },
    })
</script>

<style lang="scss" scoped>

    .in-card {
        background: grey;
    }

</style>