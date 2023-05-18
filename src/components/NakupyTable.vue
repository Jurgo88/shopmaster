<template>
  <div class="table-container">
  <table class="modern-table">
    <thead>
      <tr>
        <th @click="sortNakupy('idNakupu')">ID</th>
        <th>Obchod</th>
        <th @click="sortNakupy('suma')">Suma</th>
        <th @click="sortNakupy('datum')" :class="{ active: sortColumn === 'datum' }">Dátum</th>
        <th>Akcie</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(nakup) in sortedNakupy" :key="nakup.id" @click="selectNakup(nakup.id)">
        <td>{{ nakup.idNakupu }}</td>
        <td>{{ nakup.obchod }}</td>
        <td>{{ nakup.suma }}</td>
        <td>{{ nakup.datum }}</td>
        <td>
          <button class="edit-button" @click="editNakup(nakup)">Upraviť</button>
          <button class="delete-button" @click="deleteNakup(nakup.id)">Odstrániť</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  props: {
    nakupy: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sortColumn: 'datum',
      sortDirection: 'asc'
    };
  },
  computed: {
    sortedNakupy() {
      const sortedNakupy = this.nakupy.slice().sort((a, b) => {
        const valueA = this.getValueForSorting(a[this.sortColumn]);
        const valueB = this.getValueForSorting(b[this.sortColumn]);
        if (valueA < valueB) return 1;
        if (valueA > valueB) return -1;
        return 0;
      });
      if (this.sortDirection === 'desc') {
        sortedNakupy.reverse();
      }
      return sortedNakupy;
    }
  },
  methods: {
    sortNakupy(column) {
      if (this.sortColumn === column) {
        // Ak je rovnaký stĺpec, prepneme zoradenie
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // Ak je iný stĺpec, nastavíme nový stĺpec a zoradenie na vzostupné
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    },
    getValueForSorting(value) {
      if (typeof value === 'number') {
        return value;
      } else if (typeof value === 'string') {
        return value.toLowerCase();
      } else if (value instanceof Date) {
        return value.getTime();
      } else {
        return 0;
      }
    },
    editNakup(nakup) {
      // zavolajte editNakup s parametrom nakup pre úpravu vybranej položky
      this.$emit('editNakup', nakup);
    },
    deleteNakup(id) {
      // zavolajte deleteNakup s parametrom id pre odstránenie vybranej položky
      this.$emit('deleteNakup', id);
    },
    selectNakup(id) {
      this.$emit('selectNakup', id);
    }
  }
};
</script>




<style scoped>
.table-container {
  max-height: 800px; /* Set the maximum height of the container */
  overflow-y: scroll;
}

/* Hide the scrollbar */
.table-container::-webkit-scrollbar {
  display: none;
}
.modern-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

.modern-table th,
.modern-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.modern-table th {
  background-color: #f5f5f5;
  color: #333;
}

.modern-table tbody tr:hover {
  background-color: #f9f9f9;
}

.modern-table .edit-button,
.modern-table .delete-button {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modern-table .edit-button {
  background-color: #4caf50;
  color: white;
}

.modern-table .delete-button {
  background-color: #f44336;
  color: white;
}

.modern-table .edit-button:hover,
.modern-table .delete-button:hover {
  background-color: #45a049;
}

.modern-table .edit-button:active,
.modern-table .delete-button:active {
  background-color: #3e8e41;
}

</style>
