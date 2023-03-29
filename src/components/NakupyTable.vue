<!-- <template>
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Obchod</th>
            <th>Suma</th>
            <th>Akcie</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nakup in nakupy" :key="nakup.id">
            <td>{{ nakup.id }}</td>
            <td>{{ nakup.obchod }}</td>
            <td>{{ nakup.suma }}</td>
            <td>
              <button @click="editNakup(nakup)">Upraviť</button>
              <button @click="deleteNakup(nakup.id)">Vymazať</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="showAddNakupModal">Pridať nákup</button>
      <modal v-if="showNakupModal" @close="closeNakupModal">
        <form @submit.prevent="submitNakup">
          <label for="obchod">Obchod:</label>
          <input type="text" id="obchod" v-model="editNakupData.obchod">
          <label for="suma">Suma:</label>
          <input type="number" step="0.01" id="suma" v-model="editNakupData.suma">
          <button type="submit">{{ editNakupData.id ? 'Upraviť' : 'Pridať' }}</button>
        </form>
      </modal>
    </div>
  </template>
  
  <script>
  import { db, auth } from '@/firebase.js'
  
  export default {
    data() {
      return {
        nakupy: [],
        showNakupModal: false,
        editNakupData: {}
      }
    },
    created() {
      console.log("created");
      const nakupyCollection = db.ref('nakupy');
    },
    methods: {
      editNakup(nakup) {
        this.editNakupData = { ...nakup };
        this.showNakupModal = true;
      },
      deleteNakup(id) {
        // code to delete the purchase with the given id
      },
      showAddNakupModal() {
        this.editNakupData = {};
        this.showNakupModal = true;
      },
      closeNakupModal() {
        this.showNakupModal = false;
      },
      submitNakup() {
        // code to add or update the purchase data
      }
    }
  }
  </script> -->

  <template>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Obchod</th>
          <th>Suma</th>
          <th>Datum</th>
          <th>Akcie</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nakup) in nakupy" :key="nakup.id" @click="selectNakup(nakup.id)">
          <td>{{ nakup.idNakupu }}</td>
          <td>{{ nakup.obchod }}</td>
          <td>{{ nakup.suma }}</td>
          <td>{{ nakup.datum }}</td>
          <td>
            <button @click="editNakup(nakup)">Upraviť</button>
            <button @click="deleteNakup(nakup.id)">Odstrániť</button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      nakupy: {
        type: Array,
        required: true
      }
    },
    methods: {
      editNakup(nakup) {
        // zavolajte editNakup s parametrom nakup pre úpravu vybranej položky
        this.$emit('editNakup', nakup);
      },
      deleteNakup(id) {
        // zavolajte deleteNakup s parametrom id pre odstránenie vybranej položky
        this.$emit('deleteNakup', id);
      },
      selectNakup(id){
        this.$emit('selectNakup', id);
      }
    }
  };
  </script>


  