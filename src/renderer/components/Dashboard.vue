<template>
    <div id="wrapper">
        <h1>Tapestry Dashboard</h1>
        <br>
        <!-- <p>{{this.$store.state.puzzles}}</p> -->
        <main>
            <div class="left-side">
                <div class="doc">
                    <div class="title">Last Inputs</div>
                    <button @click="clearMessages">Clear Messages</button><br><br>
                </div>
                <InputsMonitor></InputsMonitor>
            </div>

            <div class="right-side">
                <div class="doc">
                    <div class="title">Game State</div>
                    <!-- <button @click="clearPuzzles">Clear Puzzles</button> -->
                    <button @click="resetPuzzles">Reload Puzzles</button>
                    <br><br>
                </div>
                <PuzzlesMonitor></PuzzlesMonitor>
                <!-- TODO: List of puzzles (solved, active, all) -->
            </div>
        </main>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState, mapActions } from "vuex"
    import InputsMonitor from './Dashboard/InputsMonitor'
    import PuzzlesMonitor from './Dashboard/PuzzlesMonitor'

    export default Vue.extend({
        name: 'dashboard',
        components: { InputsMonitor, PuzzlesMonitor },
        methods: {
            ...mapActions(['clearMessages', 'resetPuzzles'])
        }
    })
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body { font-family: 'Source Sans Pro', sans-serif; }

    #wrapper {
        background:
        radial-gradient(
            ellipse at top left,
            rgba(255, 255, 255, 1) 40%,
            rgba(229, 229, 229, .9) 100%
        );
        height: 100%;
        min-height: 100vh;
        padding: 60px 80px;
        width: 100vw;
    }

    #logo {
        height: auto;
        margin-bottom: 20px;
        width: 420px;
    }

    main {
        display: flex;
        justify-content: space-between;
    }

    main > div { flex-basis: 50%; }

    .left-side {
        display: flex;
        flex-direction: column;
    }

    .welcome {
        color: #555;
        font-size: 23px;
        margin-bottom: 10px;
    }

    .title {
        color: #2c3e50;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 6px;
    }

    .title.alt {
        font-size: 18px;
        margin-bottom: 10px;
    }

    .doc p {
        color: black;
        margin-bottom: 10px;
    }

    .doc button {
        font-size: .8em;
        cursor: pointer;
        outline: none;
        padding: 0.75em 2em;
        border-radius: 20em;
        display: inline-block;
        color: #fff;
        background-color: #4fc08d;
        transition: all 0.15s ease;
        box-sizing: border-box;
        border: 1px solid #4fc08d;
    }

    .doc button.alt {
        color: #42b983;
        background-color: transparent;
    }
</style>