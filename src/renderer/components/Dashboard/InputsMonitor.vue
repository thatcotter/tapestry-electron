<template>
    <div>
        <div 
            class="in-card" 
            v-for="message in lastNMessages(10)" 
            v-bind:key="message.id"
            :id="'m-'+message.note"
        >
            <h2>{{ buttonMapping[`${message.note}`].id }}:
                {{ buttonMapping[`${message.note}`].name }}
            </h2>
            <h3>
                Chan: {{ message.channel }}, 
                Note: {{ message.note }}, 
                Vel: {{ message.velocity }}
            </h3>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue'
    import { mapGetters, mapActions } from "vuex"
    const mapping = require('../../data/button-mapping.json')
    export default Vue.extend({
        name: 'InputsMonitor',
        data() {
            return {
                buttonMapping: mapping
            }
        },
        methods: {
            ...mapActions(['clearConnections'])
        },
        computed: {
            ...mapGetters(['recentMessages', 'lastNMessages']),
        },
        beforeMount(){
            this.clearConnections()
        }
    })
</script>


<style lang="scss">

    $msg-colors: 
        #f44336, #FF5722, #4CAF50, #03A9F4,
        #0097A7, #673AB7, #E91E63, #90A4AE;

    @for $i from 0 through 63 {
        #m-#{$i} {
            background-color: nth($msg-colors, ($i / 8) + 1 )
        }
    }

    .in-card {
        width: 90%;
        height: auto;

        padding: 5% 10%;
        margin-bottom: 10px;

        border-radius: 2em;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        color: white;

        h1 {
            padding: 10px 0 0 100px;
            margin: 50%;
        }
    }

</style>