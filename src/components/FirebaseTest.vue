<!-- <template>
    <div>
      <h1>{{ message }}</h1>
    </div>
  </template>
  
  <script>
  import { db, auth } from '@/firebase.js'

  console.log('ckkk');
  
  export default {
    data() {
      return {
        message: 'Hello from Firebase!'
      }
    },
    created() {
        console.log("created");
        const nakupyCollection = db.ref('nakupy');
      
    }
  }
  </script>
   -->

   <template>
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Názov</th>
            <th>Cena</th>
            <th>Akcie</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="polozka in polozky" :key="polozka.id">
            <td>{{ polozka.idPolozky }}</td>
            <td>{{ polozka.nazov }}</td>
            <td>{{ polozka.cena }}</td>
            <td>
              <button @click="editPolozka(polozka)">Upraviť</button>
              <button @click="deletePolozka(polozka.id)">Vymazať</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="showAddPolozkaModal">Pridať položku</button>
      <modal v-if="showPolozkaModal" @close="closePolozkaModal">
        <form @submit.prevent="submitPolozka">
          <label for="nazov">Názov:</label>
          <input type="text" id="nazov" v-model="editPolozkaData.nazov">
          <label for="cena">Cena:</label>
          <input type="number" step="0.01" id="cena" v-model="editPolozkaData.cena">
          <button type="submit">{{ editPolozkaData.id ? 'Upraviť' : 'Pridať' }}</button>
        </form>
      </modal>
    </div>
  </template>

<style>
/* CSS styles here */
table {
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
  color: #555;
}
button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
label {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-dialog {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.4);
  padding: 16px;
  width: 400px;
  max-width: 100%;
}
</style>
  
<script>
import { db } from '../firebase.js';

const getMaxPolozkaId = async () => {
  const polozkySnapshot = await db.collection('polozky').orderBy('idPolozky', 'desc').limit(1).get();
  const maxPolozkaId = polozkySnapshot.docs[0].data().idPolozky;
  return maxPolozkaId;
};

export default {
  data() {
    return {
      nakupy: [],
      polozky: [],
      editNakupData: {},
      editPolozkaData: {},
      showNakupModal: false,
      showPolozkaModal: false,
    };
  },
  created() {
    // Fetch items collection and set up real-time listeners
    db.collection('polozky').onSnapshot((snapshot) => {
      this.polozky = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    // Fetch shopping list collection and set up real-time listeners
    db.collection('nakupy').onSnapshot((snapshot) => {
      this.nakupy = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
  },
  methods: {
    showAddNakupModal() {
      this.showNakupModal = true;
      this.editNakupData = {};
    },
    closeNakupModal() {
      this.showNakupModal = false;
    },
    async submitNakup() {
      const { id, ...nakupData } = this.editNakupData;
      try {
        if (id) {
          // Edit existing item
          await db.collection('nakupy').doc(id).update(nakupData);
        } else {
          // Add new item
          await db.collection('nakupy').add(nakupData);
        }
        this.showNakupModal = false;
        this.editNakupData = {};
      } catch (error) {
        console.error(error);
      }
    },
    editNakup(nakup) {
      this.editNakupData = { ...nakup };
      this.showNakupModal = true;
    },
    async deleteNakup(id) {
      try {
        await db.collection('nakupy').doc(id).delete();
      } catch (error) {
        console.error(error);
      }
    },
    showAddPolozkaModal() {
      this.showPolozkaModal = true;
      this.editPolozkaData = {};
    },
    closePolozkaModal() {
      this.showPolozkaModal = false;
    },
    async submitPolozka() {
      const { id, ...polozkaData } = this.editPolozkaData;
      try {
        if (id) {
          // Edit existing item
          await db.collection('polozky').doc(id).update(polozkaData);
        } else {
            // Add new item with an automatically generated ID
                const maxPolozkaId = await getMaxPolozkaId();
                const newPolozkaId = maxPolozkaId ? maxPolozkaId + 1 : 1;
                await db.collection('polozky').add({ idPolozky: newPolozkaId, ...polozkaData });
                }
                this.showPolozkaModal = false;
                this.editPolozkaData = {};
                } catch (error) {
                    console.error(error);
                }
            },
            editPolozka(polozka) {
                this.editPolozkaData = { ...polozka };
                this.showPolozkaModal = true;
            },
                async deletePolozka(id) {
                    try {
                        await db.collection('polozky').doc(id).delete();
                    } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
