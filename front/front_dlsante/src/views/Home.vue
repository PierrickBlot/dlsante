<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
                right
        >
            <v-list dense>
                <router-link to='/'>
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Home
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>

                <router-link to="/Personne">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Personne</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>

                <router-link to="/Garage">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-garage</v-icon>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>Garage</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link to="/Vehicule">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-taxi</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Vehicule</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="cyan"
                dark
        >
            <v-spacer></v-spacer>

            <v-toolbar-title>Gestion de garage virtuel</v-toolbar-title>

            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-main>
            <v-container
                    style="align-content: center"
                    class="col-6"
                    fluid
            >
                <h1>Bienvenue sur la gestion de garage virtuel</h1>
                <li style="margin-top: 10px">
                    La page "Personne" permet d'ajouter des utilisateurs et de consulter le portefeuille utilisateurs
                <li style="margin-top: 10px">
                    La page "Garage" permet de consulter  les garages des différents clients et d'ajouter des véhicules aux garages
                </li>
                <li style="margin-top: 10px">
                    La page "Véhicule" permet d'agrémenter la liste des véhicules et de la consulter
                </li>
            </v-container>
        </v-main>

        <v-footer
                color="cyan"
                app
        >
            <v-spacer></v-spacer>

            <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

    @Component({
        components: {
            HelloWorld,
        },
    })
    export default class Home extends Vue {
        data(){
            return{
                drawer: null
            }
        }
    }
</script>
