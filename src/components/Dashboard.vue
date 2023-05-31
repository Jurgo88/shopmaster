<template>
  <div>
    <DashboardInfobar :sumaLastMonth="sumaLastMonth" :sumaThisMonth="sumaThisMonth" :favoritAll="favoritAll"
      :nakupy="nakupy" />

    <v-row class="three-column">
      <v-col class="column">
        <v-btn @click="showAddNakupModal">Pridať nákup</v-btn>
        <NakupyTable :nakupy="nakupy" @editNakup="editNakup" @deleteNakup="deleteNakup" @selectNakup="selectNakup" />
      </v-col>
      <v-col class="column">
        <v-btn v-if="showAddPolozkaButton" @click="showAddPolozkaModal">Pridať položku</v-btn>
        <v-btn @click="showAllPurchases">Zobraziť všetky položky</v-btn>
        <PolozkyTable v-if="showPolozky" :polozky="filteredNakupy" @editPolozka="editPolozka"
          @deletePolozka="deletePolozka" />
      </v-col>
      <v-col class="column">
        <DashboardChart :data="filteredNakupy" />
      </v-col>
    </v-row>

    <NakupModal v-if="showNakupModal" @close="closeNakupModal" :editNakupData="editNakupData"
      @submitNakup="submitNakup" />

    <PolozkaModal v-if="showPolozkaModal" @close="closePolozkaModal" :editPolozkaData="editPolozkaData"
      @submitPolozka="submitPolozka" />
  </div>
</template>

  
<script>
import { db } from '../firebase.js';
import NakupyTable from './NakupyTable.vue';
import NakupModal from './NakupModal.vue';
import PolozkyTable from './PolozkyTable.vue';
import PolozkaModal from './PolozkaModal.vue';
import DashboardInfobar from './DashboardInfobar.vue';
import DashboardChart from './DashboardChart.vue';
import { VBtn } from 'vuetify/lib/components';

const getMaxIdByItem = async (collection, item) => {
  const snapshot = await db.collection(collection).orderBy(item, 'desc').limit(1).get();
  const maxId = snapshot.docs[0].data()[item];
  return maxId;
};

export default {
  components: {
    NakupyTable,
    NakupModal,
    PolozkyTable,
    PolozkaModal,
    DashboardInfobar,
    DashboardChart,
    VBtn,
  },
  data() {
    return {
      nakupy: [],
      polozky: [],
      showNakupModal: false,
      showPolozkaModal: false,
      showPolozky: false,
      showAddPolozkaButton: false,
      editNakupData: {},
      editPolozkaData: {},
      filterIdNakupu: null,
      selectedNakup: null,
      sumaLastMonth: 0,
      sumaThisMonth: 0,
      favoritAll: '',
    };
  },
  computed: {
    filteredNakupy() {

      if (this.filterIdNakupu) {
        //console.log("Filter id nakupu "+ filterIdNakupu);
        this.showPolozky = true;
        return this.polozky.filter(polozka => polozka.idNakupu === this.filterIdNakupu);
      } else {
        return this.polozky;
      }
    }
  },
  methods: {
    // methods for editing, deleting, and adding nakupy and polozky
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
          const maxNakupId = await getMaxIdByItem('nakupy', 'idNakupu');
          const newNakupId = maxNakupId ? maxNakupId + 1 : 1;
          this.filterIdNakupu = newNakupId;
          this.showAddPolozkaButton = true;
          await db.collection('nakupy').add({ idNakupu: newNakupId, ...nakupData });
          // Add new item
          //await db.collection('nakupy').add(nakupData);
          this.updateSumaLastMonth();
          this.updateSumaThisMonth();
        }
        this.showNakupModal = false;
        this.editNakupData = {};
      } catch (error) {
        console.error(error);
      }
    },
    editNakup(nakup) {
      console.log("Edit nakup");
      this.editNakupData = { ...nakup };
      this.showNakupModal = true;
      this.updateSumaLastMonth();
      this.updateSumaThisMonth();
    },
    selectNakup(id) {
      this.selectedNakup = this.nakupy.find(nakup => nakup.id === id);
      this.filterIdNakupu = this.selectedNakup.idNakupu;
      this.showPolozky = true;
      this.showAddPolozkaButton = true;
      // console.log("Selected nakup: "+ this.polozky);
      // this.dataChart = this.selectedNakup;
    },
    async deleteNakup(id) {
      try {
        await db.collection('nakupy').doc(id).delete();
        this.updateSumaLastMonth();
        this.updateSumaThisMonth();
      } catch (error) {
        console.error(error);
      }
    },
    showAddPolozkaModal() {
      console.log("Pridaj paolozku");
      console.log("Selected ID is: " + this.filterIdNakupu);
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
          const maxPolozkaId = await getMaxIdByItem('polozky', 'idPolozky');
          const newPolozkaId = maxPolozkaId ? maxPolozkaId + 1 : 1;
          const datum = this.selectedNakup.datum;
          await db.collection('polozky').add({
            idPolozky: newPolozkaId,
            idNakupu: this.filterIdNakupu,
            datum: datum, // Přidání vlastnosti datum
            ...polozkaData
          });
          this.updateFavoritAll();
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
    updateSumaLastMonth() {
      console.log('pod sem');
      // Príslušný kód pre výpočet sumy za posledný mesiac
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const sum = this.nakupy.reduce((total, nakup) => {
        const nakupDate = new Date(nakup.datum);
        if (nakupDate > lastMonth) {
          console.log("totoal : " + total + " + suma : " + nakup.suma)
          return total + nakup.suma;
        }
        return total;
      }, 0);
      this.sumaLastMonth = sum;
      console.log("Suma za posledny mesiac je : " + this.sumaLastMonth);
    },
    updateSumaThisMonth() {
      const currentMonth = new Date().getMonth() + 1;

      const sum = this.nakupy.reduce((total, nakup) => {
        const nakupMonth = new Date(nakup.datum).getMonth() + 1;
        if (nakupMonth === currentMonth) {
          return total + nakup.suma;
        }
        return total;
      }, 0);

      this.sumaThisMonth = sum;
      console.log("Suma za aktuálny mesiac je: " + this.sumaThisMonth);
    },
    updateFavoritAll() {
      const itemCounts = {};
      let maxCount = 0;
      let favoriteItem = '';

      for (let polozka of this.polozky) {
        const nazov = polozka.nazov;
        if (itemCounts[nazov]) {
          itemCounts[nazov]++;
        } else {
          itemCounts[nazov] = 1;
        }

        if (itemCounts[nazov] > maxCount) {
          maxCount = itemCounts[nazov];
          favoriteItem = nazov;
        }
      }



      console.log(`Najobľúbenejšia položka je ${favoriteItem} (${maxCount}x)`);
      this.favoritAll = `Najobľúbenejšia položka je ${favoriteItem} (${maxCount}x)`;
    },
    showAllPurchases() {
      // Logic to display all purchases
      this.filterIdNakupu = null;
      this.showPolozky = true;
      this.showAddPolozkaButton = false;
    },
  },
  watch: {
    nakupy: {
      handler: function (newNakupy, oldNakupy) {
        this.updateSumaLastMonth();
        this.updateSumaThisMonth();
        this.updateFavoritAll();
      },
      deep: true,
    },
    // Pridaj ďalšie watchery pre relevantné dáta, napr. filterIdNakupu, polozky, atď.
  },
  async mounted() {
    // fetch data from firebase and assign it to this.nakupy and this.polozky
    // Fetch items collection and set up real-time listeners
    db.collection('polozky').onSnapshot((snapshot) => {
      this.polozky = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      this.dataChart = this.polozky;
    });

    // Fetch shopping list collection and set up real-time listeners
    db.collection('nakupy').onSnapshot((snapshot) => {
      this.nakupy = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
    //Update sum for last month
    this.updateSumaLastMonth();
    this.updateSumaThisMonth();
    this.updateFavoritAll();
  }
};
</script>
<style>
.three-column {
  display: flex;
}

.column {
  flex: 3;
  padding: 5px;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.column:first-child,
.column:last-child {
  flex: 2;
  border: none;
}
</style>