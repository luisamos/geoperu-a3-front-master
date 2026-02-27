<template>
    <table :class="$options.cssName">
        <tr class="stack_bar__block">
           
            <td class="horizontal-stack-bar__square horizontal-stack-bar__square--red1">0 - 17 <br> años</td>
            
            
            <td class="horizontal-stack-bar__square horizontal-stack-bar__square--red2">18 - 35 <br> años</td>
            
            <td class="horizontal-stack-bar__square horizontal-stack-bar__square--red3">36 - 59 <br> años</td>

            
            <td class="horizontal-stack-bar__square horizontal-stack-bar__square--red4">60 años <br>a más</td>
        </tr>
        <tr>
             <td class="horizontal-stack-bar__text" v-text="r1"></td>
             <td class="horizontal-stack-bar__text" v-text="r2"></td>
             <td class="horizontal-stack-bar__text" v-text="r3"></td>
             <td class="horizontal-stack-bar__text" v-text="r4"></td>

        </tr>
    </table>
</template>

<script>
export default {
    name: 'HorizontalStackBar',
    cssName: 'horizontal-stack-bar',
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
    .horizontal-stack-bar {
        margin: auto;
    }

    .stack_bar__block {
        width: 100%;
        min-height: 33.33%;
        text-align: center;
    }

    .horizontal-stack-bar__square {
        text-align: center;
        width: calc(100% / 4);
        color: white;
        padding: 8px;
        font-weight: 700;  
        min-width: 100px; 
        border: 1px solid white;
    }

    .horizontal-stack-bar__text {
        text-align: center;
        font-weight: 700;  
        font-size: 22px;  
        min-height: 100%; 
    }

    .stack_bar__block:hover {
        background-color: rgb(160, 46, 46);
    }

    .horizontal-stack-bar__square--red4{
        background-color: rgb(194, 22, 22);
    }

    .horizontal-stack-bar__square--red3{
        background-color: rgb(196, 54, 54);
    }

    .horizontal-stack-bar__square--red2{
        background-color: rgb(146, 70, 70);
    }

    .horizontal-stack-bar__square--red1{
        background-color: rgb(190, 97, 97)
    }
    
</style>