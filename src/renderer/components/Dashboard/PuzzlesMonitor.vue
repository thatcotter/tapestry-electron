<template>
    <div>
        <!-- {{ puzzles }} -->
        <div class="title">Solved:</div>
        <!-- {{ solvedPuzzles }} -->
        <div class="in-card" 
             v-for="puzzle in solvedPuzzles" 
            :id="'m-'+puzzle.note">
            <p>
                {{ puzzle.id }}:
                {{ puzzle.name }}
            </p>
            <h3>
                <!-- Chan: {{ puzzle.channel }}, 
                Note: {{ puzzle.note }}, 
                Vel: {{ puzzle.velocity }} -->
            </h3>
        </div>

        <div class="title">Active:</div>
        <!-- {{ activePuzzles }} -->
        <div class="in-card active" 
             v-for="puzzle in activePuzzles" 
            :id="'m-'+puzzle.note">
            <p>
                {{ puzzle.id }}:
                {{ puzzle.name }}
            </p>
            <h3>
                <!-- Chan: {{ puzzle.channel }}, 
                Note: {{ puzzle.note }}, 
                Vel: {{ puzzle.velocity }} -->
            </h3>
        </div>

        <div class="title">Inactive:</div>
        <!-- {{ inactivePuzzles }} -->
        <div class="in-card inactive" 
             v-for="puzzle in inactivePuzzles" 
            :id="'m-'+puzzle.note">
            <p>
                {{ puzzle.id }}:
                {{ puzzle.name }}
            </p>
            <h3>
                <!-- Chan: {{ puzzle.channel }}, 
                Note: {{ puzzle.note }}, 
                Vel: {{ puzzle.velocity }} -->
            </h3>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
export default Vue.extend({
    name: 'PuzzlesMonitor',
    computed: {
        ...mapState(['puzzles']),
        ...mapGetters(['solvedPuzzles', 'activePuzzles', 'inactivePuzzles'])
    }
})
</script>

<style lang="scss" scoped>

    .in-card {
        height: 3vh;
        padding-top: 2.5%; 
        padding-left: 10%;
        margin-bottom: 10px;
    }

</style>

<style lang="scss">

    .solved { background-color: green }
    .active { background-color: blue }
    .inactive { background-color: black }

</style>