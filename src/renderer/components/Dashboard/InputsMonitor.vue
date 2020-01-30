<template>
    <div>
        <div class="in-card" v-for="message in recentMessages" :id="'m-'+message.note">
            <h2>{{ buttonMapping[`${message.note}`]}}</h2>
            <h3>
                Chan: {{ message.channel }}, 
                Note: {{ message.note }}, 
                Vel: {{ message.velocity }}
            </h3>
            <!-- {{ message }} -->
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from "vuex"
const mapping = require('../../button-mapping.json')
export default Vue.extend({
    name: 'InputsMonitor',
    data() {
        return {
            buttonMapping: mapping
        }
    },
    methods: {
        ...mapActions(['increment','decrement','reset'])
    },
    computed: {
        ...mapState(['messages']),
        ...mapGetters(['recentMessages'])
        // recentMessages() {
        //     console.log(this.$store.getters.recentMessages)
        //     return this.$store.getters.recentMessages
        // }
    },
})
</script>


<style lang="scss">

    $msg-colors: 
        #f44336, #FF5722, #4CAF50, #03A9F4,
        #0097A7, #673AB7, #E91E63, #90A4AE;
    $colls: 8;

    @for $i from 0 through 7 {
        @for $j from 0 through 7 {
            $index: #{$i*$colls+$j};
            #m-#{$index} {
                background-color: nth($msg-colors, $i+1);
            }
        }
    }    

    .in-card {
        width: 90%;
        height: 10vh;

        padding-top: 5%; 
        padding-left: 10%;
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