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
                <H1>Personne</H1>
                <p>Ici, vous pouvez consultez et gérer le portefeuille utilisateurs </p>
                <v-form ref="formAdd" lazy-validation v-model="valid">
                    <v-text-field
                        v-model="firstname"
                        :rules="firstnameRules"
                        label="Prénom"
                        required />
                    <v-text-field
                        v-model="lastname"
                        :rules="lastnameRules"
                        label="Nom"
                        required/>
                    <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4"
                            @click="add"
                    >
                        Valider
                    </v-btn>
                </v-form>
                <v-dialog v-model="dialog" max-width="290">
                    <v-card>
                        <v-card-title class="headline">Confirmation</v-card-title>
                        <v-card-text>L'utilisateur a été ajouté</v-card-text>
                        <v-card-actions>
                            <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Ok</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- Table containing all user -->
                <v-simple-table style="margin-top: 10px">
                    <thead>
                        <tr>
                            <th class="text-left">Nom</th>
                            <th class="text-left">Prénom</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in posts" :key="item.nom">
                            <td>{{item.nom}}</td>
                            <td>{{item.prenom}}</td>
                            <td style="text-align: center">
                                <v-btn v-on:click="destroy(item.id)"><v-icon>mdi-close</v-icon></v-btn>
                                <v-btn style="margin-left: 10px" v-on:click="updatePopUp(item.prenom, item.nom, item.id)" ><v-icon>mdi-pen</v-icon></v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
                <v-dialog v-model="dialogUpdate" max-width="290">
                    <v-card>
                        <v-card-title class="headline">
                            Modification
                        </v-card-title>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                        v-model="firstnameUpdate"
                                        label="Prénom"
                                        required />
                                <v-text-field
                                        v-model="lastnameUpdate"
                                        label="Nom"
                                        required/>
                                <v-card-actions>
                                    <v-btn color="green darken-1" v-on:click="update()">Ok</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
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
    import axios from 'axios';

    export default {
        data() {
            return {
                drawer: null,
                dialogUpdate: false,
                dialog: false,
                valid: true,
                firstname: null,
                lastname: null,
                firstnameUpdate: null,
                lastnameUpdate: null,
                idUpdate: null,
                posts: [],
                firstnameRules: [v => !!v || 'Ce champs est requis'],
                lastnameRules: [v => !!v || 'Ce champs est requis']
            }
        },

        // Fetches posts when the component is created.
        created() {
            axios.get('http://127.0.0.1:3000/personnes')
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.posts = response.data.data
                    console.log(response.data)
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        methods: {
            add() {
                if (this.$refs.formAdd.validate()) {
                    axios.post('http://127.0.0.1:3000/personnes', {
                        nom: this.lastname,
                        prenom: this.firstname
                    }).then(res=> this.reloadData(),
                    this.firstname = null,
                    this.lastname = null,
                    this.dialog = true,)
                }
            },
            destroy(id) {
                axios.delete('http://127.0.0.1:3000/personnes/' + id).then(
                    res=>this.reloadData()
                )

            },
            update(){
                axios.put('http://127.0.0.1:3000/personnes/'+this.idUpdate,{
                    nom: this.lastnameUpdate,
                    prenom: this.firstnameUpdate
                }).then(res => {
                    this.reloadData()
                    this.dialogUpdate =false
                })
            },
            reloadData(){
                axios.get('http://127.0.0.1:3000/personnes')
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.posts = response.data.data
                        console.log(response.data)
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            updatePopUp(param1, param2, param3){
                this.firstnameUpdate = param1;
                this.lastnameUpdate = param2;
                this.idUpdate = param3
                this.dialogUpdate = true;
            }
        }
    }
</script>

