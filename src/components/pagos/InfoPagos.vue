<template>
    <v-card flat>
        <v-flex xs6>
            <v-layout column class="lightgrey">
                <v-flex xs12><h4>Inquilino</h4></v-flex>
                <v-flex xs12>
                    <h5>Esteban Bisocoli</h5>
                </v-flex>
            </v-layout>
            <v-layout column>
                <v-flex xs12><h4>Monto</h4></v-flex>
                <v-flex xs12>
                    <h5>1000$</h5>
                </v-flex>
            </v-layout>
            <v-layout column class="lightgrey">
                <v-flex xs12><h4>Restante</h4></v-flex>
                <v-flex xs12>
                    <h5>500$</h5>
                </v-flex>
            </v-layout>
            <v-layout column >
                <v-flex xs12><h4>Vencimiento</h4></v-flex>
                <v-flex xs12>
                    <h5>10 de enero del 2018</h5>
                </v-flex>
            </v-layout>
            <v-layout column class="lightgrey">
                <v-flex xs12><h4>Este Mes</h4></v-flex>
                <v-flex xs12>
                    <h5>100$</h5>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-card>
</template>
<script>
export default {
    name: 'info',
    props: [info]
}
</script>

