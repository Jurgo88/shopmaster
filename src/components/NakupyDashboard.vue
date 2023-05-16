<template>
    <div>
      <DashboardInfobar :sumaLastMonth="sumaLastMonth" :sumaThisMonth="sumaThisMonth"  />
      <button @click="showAddNakupModal">Pridať nákup</button>
      <NakupyTable :nakupy="nakupy" @editNakup="editNakup" @deleteNakup="deleteNakup"  @selectNakup="selectNakup" />
      
      <NakupModal v-if="showNakupModal" @close="closeNakupModal" :editNakupData="editNakupData" @submitNakup="submitNakup" />
      <button v-if="showAddPolozkaButton" @click="showAddPolozkaModal">Pridať položku</button>
      <PolozkyTable v-if="showPolozky" :polozky="filteredNakupy" @editPolozka="editPolozka" @deletePolozka="deletePolozka" />
      
      <PolozkaModal v-if="showPolozkaModal" @close="closePolozkaModal" :editPolozkaData="editPolozkaData" @submitPolozka="submitPolozka" />
    </div>
  </template>
  
  <script>
  import { db } from '../firebase.js';
  import NakupyTable from './NakupyTable.vue';
  import NakupModal from './NakupModal.vue';
  import PolozkyTable from './PolozkyTable.vue';
  import PolozkaModal from './PolozkaModal.vue';
  import DashboardInfobar from './DashboardInfobar.vue';

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
      };
    },
    computed: {
      filteredNakupy() {
        
        if (this.filterIdNakupu) {
            //console.log("Filter id nakupu "+ filterIdNakupu);
            this.showPolozky = true;
            console.log(this.showPolozky);
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
    selectNakup(id){
        this.selectedNakup = this.nakupy.find(nakup => nakup.id === id);
        this.filterIdNakupu = this.selectedNakup.idNakupu;
        this.showPolozky = true;
        this.showAddPolozkaButton = true;
    },
    async deleteNakup(id) {
      try {
        await db.collection('nakupy').doc(id).delete();
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
                //console.log("Selected Id for nakup: "+this.selectedNakup.datum);
                await db.collection('polozky').add({ 
                    idPolozky: newPolozkaId,
                    idNakupu: this.filterIdNakupu,
                    datum: datum,
                     ...polozkaData });
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
        // Príslušný kód pre výpočet sumy za posledný mesiac
        // Napríklad:
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const sum = this.nakupy.reduce((total, nakup) => {
          const nakupDate = new Date(nakup.datum);
          if (nakupDate > lastMonth) {
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
    },
    watch: {
      nakupy: {
        handler: function(newNakupy, oldNakupy) {
          this.updateSumaLastMonth();
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
    });

    // Fetch shopping list collection and set up real-time listeners
    db.collection('nakupy').onSnapshot((snapshot) => {
      this.nakupy = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
    //Update sum for last month
    this.updateSumaLastMonth();
    }
  };
  </script>