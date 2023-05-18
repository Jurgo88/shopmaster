<template>
  <div class="table-container">
  <table class="modern-table">
    <thead>
      <tr>
        <th>Názov</th>
        <th>Kategória</th>
        <th>Cena</th>
        <th>Dátum</th>
        <th>Akcie</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="polozka in polozky" :key="polozka.id">
        <td>{{ polozka.nazov }}</td>
        <td>{{ polozka.kategoria }}</td>
        <td>{{ polozka.cena }}</td>
        <td>{{ polozka.datum }}</td>
        <td>
          <button class="edit-button" @click="editPolozka(polozka)">Upraviť</button>
          <button class="delete-button" @click="deletePolozka(polozka.id)">Zmazať</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  props: ['polozky'],
  methods: {
    editPolozka(polozka) {
      this.$emit('editPolozka', polozka);
    },
    deletePolozka(id) {
      this.$emit('deletePolozka', id);
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
