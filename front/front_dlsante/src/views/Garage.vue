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
                    class="col-7"
                    fluid
            >
                <h1>Garage</h1>
                <!-- Form to add a car to a garage -->
                <p>Ajouter un véhicule au garage de :</p>
                <v-form ref="formAdd">
                    <v-select
                            :items="personnes"
                            v-model="idPersonnes"
                            item-text=nom
                            item-value="id"
                            label="Nom personne"
                    >
                        <template slot='selection' slot-scope='{ item }'>
                            {{ item.nom }} {{ item.prenom }}
                        </template>
                        <template slot='item' slot-scope='{ item }'>
                            {{ item.nom }} {{ item.prenom }}
                        </template>
                    </v-select>
                    <v-select
                            :items="vehicules"
                            v-model="idVehicule"
                            item-text="nom_marque"
                            item-value="id"
                            label="Véhicule"
                    >
                        <template slot='selection' slot-scope='{ item }'>
                            {{ item.nom_marque }} {{ item.num_modele }}
                        </template>
                        <template slot='item' slot-scope='{ item }'>
                            {{ item.nom_marque }} {{ item.num_modele }}
                        </template>
                    </v-select>
                    <v-btn
                            @click="add"
                            color="success">
                        Valider
                    </v-btn>
                </v-form>
                <p style="margin-top: 10px">Consulter les garages :</p>
                <v-form ref="form">
                    <v-select
                            :items="posts"
                            v-model="nom"
                            item-text="nom"
                            item-value="id"
                            required
                    >
                        <template slot='item' slot-scope='{ item }'>
                            {{ item.nom }} {{ item.prenom }}
                        </template>
                        <template slot='item' slot-scope='{ item }'>
                            {{ item.nom }} {{ item.prenom }}
                        </template>
                    </v-select>
                    <v-btn
                            @click="validate"
                            color="success">
                        Visualiser
                    </v-btn>
                </v-form>
                <!-- Dialog to confirm the creation of the user -->
                <v-dialog v-model="dialog" max-width="290">
                    <v-card>
                        <v-card-title class="headline">Confirmation</v-card-title>
                        <v-card-text>Le véhicule a été ajouté au garage</v-card-text>
                        <v-card-actions>
                            <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Ok</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- Table that contains car -->
                <div v-if="vehiculeGarage.length != 0">
                    <v-simple-table style="margin-top: 10px">
                        <thead>
                        <tr>
                            <th class="text-left">Marque</th>
                            <th class="text-left">Numéro de modèle</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="car in vehiculeGarage">
                            <td>
                                {{car.vehicule.nom_marque}}
                            </td>
                            <td>
                                {{car.vehicule.num_modele}}
                            </td>
                            <td style="text-align: center">
                                <v-btn v-on:click="destroy(car.id)">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </v-simple-table>
                </div>
            </v-container>
        </v-main>

        <v-footer
                color="cyan"
                app
        >
            <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>
<script>
    import axios from "axios";

    export default {
        data() {
            return {
                drawer: null,
                nom: null,
                dialog: false,
                posts: [],
                personnes: [],
                idPersonnes: null,
                idVehicule: null,
                vehiculeGarage: [],
                vehicules: [],
                errors: []
            }
        },
        created() {
            axios.get('http://127.0.0.1:3000/personnes')
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.posts = response.data.data
                    this.personnes = response.data.data
                    console.log(this.personnes)
                })
                .catch(e => {
                    this.errors.push(e)
                })
            axios.get('http://127.0.0.1:3000/vehicules')
                .then(response => {
                    this.vehicules = response.data.data
                })
        },
        methods: {
            validate() {
                axios.get('http://127.0.0.1:3000/garage/' + this.nom)
                    .then(response => {
                            this.vehiculeGarage = response.data.data
                            console.log(response.data.data)
                        }
                    )
            },
            add() {
                axios.post('http://127.0.0.1:3000/garage', {
                    id_personnes: this.idPersonnes,
                    id_vehicules: this.idVehicule
                }).then(res => {
                        this.reloadData()
                        this.dialog = true
                    }
                )
            },
            reloadData() {
                axios.get('http://127.0.0.1:3000/garage/' + this.nom)
                    .then(response => {
                            this.vehiculeGarage = response.data.data
                            console.log(this.vehiculeGarage)
                        }
                    )
            },
            destroy(id) {
                axios.delete('http://127.0.0.1:3000/garage/' + id).then(
                    res => this.reloadData()
                )

            },
        }
    }
</script>
<style>
    table, th, td {
        border: 1px solid black;
    }

    table {
        width: 100%;
    }
</style>
