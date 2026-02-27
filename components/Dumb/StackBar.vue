    <template>
        <table :class="$options.cssName">
            <tr class="stack_bar__block">
                <td class="stack-bar__square stack-bar__square--red3">60 años a más</td>
                <td class="stack-bar__text" v-text="r4"></td>
            </tr>
            <tr class="stack_bar__block">
                <td class="stack-bar__square stack-bar__square--red3">36 - 59 años</td>
                <td class="stack-bar__text" v-text="r3"></td>
            </tr>
            <tr class="stack_bar__block">
                <td class="stack-bar__square stack-bar__square--red2">18 - 35 años</td>
                <td class="stack-bar__text" v-text="r2"></td>
            </tr>
            <tr class="stack_bar__block">
                <td class="stack-bar__square stack-bar__square--red1">0 - 17 años</td>
                <td class="stack-bar__text" v-text="r1"></td>
            </tr>
        </table>
    </template>

    <script>
    export default {
        name: 'StackBar',
        cssName: 'stack-bar',
        props: {
            r1: {
                default: '0',
                type: String
            },
            r2: {
                default: '0',
                type: String
            },
            r3: {
                default: '0',
                type: String
            },
            r4: {
                default: '0',
                type: String
            }
        }
    }
    </script>

    <style scoped>
        .stack-bar {
            margin: 0 auto;
            width: 100%;
            max-width: 200px;
            height: 100%;
        }

        .stack_bar__block {
            width: 100%;
            text-align: center;
            border: 1px solid white;
            
        }

        .stack-bar__square {
            text-align: center;
            width: 50%;
            color: white;
            background-color: red;
            font-weight: 700;  
        }

        .stack-bar__square--red3 {
            background-color: rgb(255, 25, 25);
        }
        .stack-bar__square--red2 {
            background-color: rgb(233, 66, 66);
        }
        .stack-bar__square--red1 {
            background-color: rgb(253, 139, 139);
        }

        .stack-bar__text {
            text-align: center;
            font-weight: 700;  
            font-size: 22px;  
        }

        .stack_bar__block:hover {
            background-color: rgb(214, 214, 214);
        }
        
    </style>