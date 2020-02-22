<template>
    <div>
        <br>
        <div class="title">{{ quest }} Quest</div>
        <!-- <br> -->

        <div class="title">Solved:</div>
        <!-- {{ solvedPuzzles }} -->
        <div class="in-card solved" 
             v-for="puzzle in solvedPuzzles" 
            :id="'m-'+puzzle.note">
            <p>
                {{ puzzle.id }}:
                {{ puzzle.name }}
            </p>
        </div>

        <div class="title">Active:</div>
        <!-- {{ activePuzzles }} -->
        <div class="in-card active" 
             v-for="puzzle in activePuzzles" 
            :id="'m-'+puzzle.note">
            <p>
                {{ puzzle.id }}:
                {{ puzzle.name }},
            </p>
            <p>Solution: {{ puzzle.solution.buttons }}</p>
        </div>

        <div class="title">Inactive:</div>
        <!-- {{ inactivePuzzles }} -->
        <div class="in-card inactive" 
             v-for="puzzle in inactivePuzzles" 
            :id="'m-'+puzzle.note">
            <p>
                {{ puzzle.id }}:
                {{ puzzle.name }},
            </p>
            <p>Dependencies: {{ puzzle.dependencies }}</p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState, mapGetters } from 'vuex'
    export default Vue.extend({
        name: 'PuzzlesMonitor',
        computed: {
            ...mapState(['puzzles', 'quest']),
            ...mapGetters(['solvedPuzzles', 'activePuzzles', 'inactivePuzzles'])
        }
    })
</script>

<style lang="scss" scoped>

    .in-card {
        height: auto;
        padding: 10px; 
        padding-left: 10%;
        margin-bottom: 10px;
    }

</style>

<style lang="scss">

    .solved { background-color: green }
    .active { background-color: blue }
    .inactive { background-color: black }

</style>