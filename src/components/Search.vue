<template>
<div>
    <div>
        <span class="pull-left" style="width:200px">
            <vue-bootstrap-typeahead
                ref="searchPatient"
                v-model="query"
                :data="patients"
                :serializer="item => item.name"
                @hit="selectedPatient = $event"
                placeholder="Enter Patient Name"/>
        </span>
        <span class="pull-left" style="width:50px">
            <button @click="clear" class="btn btn-primary">Clear</button>    
        </span>
    </div>
    <br /><br />
    <div class="pull-left"> {{selectedPatient  | stringify }}</div>
</div>
</template>

<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
const axios = require('axios');

export default {
    name: 'search',
      components: {
        VueBootstrapTypeahead
    },
    data () {
        return {
            query: '',
            selectedPatient: null,
            patients: []
        };
    },
    methods: {
        clear() {
            this.$refs.searchPatient.inputValue = '';
        }
    },    
    watch: {
        query(newQuery) {
        let self = this;
        axios.get(`https://jsonplaceholder.typicode.com/users/?q=${newQuery}`)
                .then((res) => {
                    self.patients = res.data.map(person => (
                            {
                                id: person.id, 
                                name: person.name, 
                                email:person.email, 
                                city: person.address.city,
                                zip: person.address.zipcode
                            }
                        )
                    );
                })
        }
    },
  filters: {
    stringify(person) {
      return  person ?  person.id       + " - " + 
                        person.name     + " - " + 
                        person.email    + " - " + 
                        person.city     + " - " + 
                        person.zip
                    : null;
    }
  }    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wrapper {
  margin: 25px;
}
</style>